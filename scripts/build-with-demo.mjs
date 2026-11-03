import { execFileSync, spawnSync } from 'node:child_process';
import { cpSync, existsSync, lstatSync, readFileSync, readdirSync, realpathSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const portfolioRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const basePath = '/insurance-demo';

function readJson(filename) {
  return JSON.parse(readFileSync(filename, 'utf8'));
}

function assertOrdinaryTree(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isSymbolicLink()) throw new Error(`Symbolic links are not allowed in the demo export: ${filename}`);
    if (entry.isDirectory()) assertOrdinaryTree(filename);
    else if (!entry.isFile()) throw new Error(`Unsupported export entry: ${filename}`);
  }
}

function ordinaryFile(root, relative) {
  if (typeof relative !== 'string' || !relative || relative.includes('\\')) throw new Error('Invalid demo asset path.');
  const filename = path.resolve(root, relative);
  const boundary = path.relative(root, filename);
  if (boundary === '..' || boundary.startsWith(`..${path.sep}`) || path.isAbsolute(boundary)) {
    throw new Error('Demo asset escapes the export directory.');
  }
  if (!lstatSync(filename).isFile() || lstatSync(filename).isSymbolicLink()) throw new Error(`Demo asset is not an ordinary file: ${relative}`);
  return filename;
}

/** Validate the published contract before touching the portfolio output. */
export function validateExport(exportRoot, expectedRevision, allowDirty = false) {
  if (lstatSync(exportRoot).isSymbolicLink()) throw new Error('The export root must be an ordinary directory.');
  assertOrdinaryTree(exportRoot);
  const build = readJson(ordinaryFile(exportRoot, 'insurance-demo-build.json'));
  if (build.format !== 'insurance-demo-export-v1' || build.basePath !== basePath || build.runtime !== 'static') {
    throw new Error('Build the Insurance AI static demo with CLAIMS_REVIEW_BASE_PATH=/insurance-demo.');
  }
  if (!/^[0-9a-f]{40}$/i.test(build.sourceRevision) || build.sourceRevision !== expectedRevision) {
    throw new Error('The exported demo revision differs from the pinned source revision.');
  }
  if (typeof build.sourceDirty !== 'boolean' || (build.sourceDirty && !allowDirty)) {
    throw new Error('The demo was built from uncommitted changes. Commit the source or use --allow-dirty for a local preview.');
  }
  if (typeof build.applicationVersion !== 'string' || !/^\d+\.\d+\.\d+$/.test(build.applicationVersion)) throw new Error('Missing demo application version.');
  const html = readFileSync(ordinaryFile(exportRoot, 'index.html'), 'utf8');
  const scripts = [...html.matchAll(/(?:src|href)=["']([^"']+)["']/g)].map((match) => match[1]);
  const nextAssets = scripts.filter((url) => url.startsWith(`${basePath}/_next/`));
  if (!nextAssets.length || scripts.some((url) => url.startsWith('/_next/'))) {
    throw new Error('The demo Next.js assets are not isolated under /insurance-demo/_next/.');
  }
  for (const url of nextAssets) ordinaryFile(exportRoot, decodeURIComponent(url.slice(basePath.length + 1).split('?')[0]));
  const manifest = readJson(ordinaryFile(exportRoot, 'demo/manifest.json'));
  const catalog = readJson(ordinaryFile(exportRoot, 'demo/catalog.json'));
  if (manifest.format !== 'claims_static_demo_v1' || !Array.isArray(manifest.claims) || !manifest.claims.length || !Array.isArray(catalog) || !catalog.length) {
    throw new Error('The exported demo has no prepared cases.');
  }
  for (const entry of manifest.claims) {
    if (typeof entry.review !== 'string' || !/^reviews\/[A-Za-z0-9_.-]+\.json$/.test(entry.review)) throw new Error('Invalid prepared review path.');
    const review = readJson(ordinaryFile(exportRoot, `demo/${entry.review}`));
    if (review.claim?.claim_id !== entry.claim_id || review.mode !== 'demo') throw new Error('Prepared case identity mismatch.');
    for (const document of review.documents?.data?.items ?? []) {
      if (document.document_url) ordinaryFile(exportRoot, document.document_url.replace(/^\/?insurance-demo\//, '').replace(/^\//, ''));
    }
    for (const image of review.vision?.data?.images ?? []) {
      if (image.image_url) ordinaryFile(exportRoot, image.image_url.replace(/^\/?insurance-demo\//, '').replace(/^\//, ''));
    }
  }
  return build;
}

/** Replace only out/insurance-demo after validation, preserving the portfolio export. */
export function assembleExport(exportRoot, siteRoot, expectedRevision, allowDirty = false) {
  if (lstatSync(siteRoot).isSymbolicLink()) throw new Error('The portfolio output must be an ordinary directory.');
  const source = realpathSync(exportRoot);
  const site = realpathSync(siteRoot);
  const destination = path.resolve(site, 'insurance-demo');
  if (path.relative(site, destination) !== 'insurance-demo' || source === site || source === destination || source.startsWith(`${site}${path.sep}`) || site.startsWith(`${source}${path.sep}`)) {
    throw new Error('Demo source and destination must be separate output directories.');
  }
  ordinaryFile(site, 'index.html');
  const build = validateExport(source, expectedRevision, allowDirty);
  if (existsSync(destination) && lstatSync(destination).isSymbolicLink()) throw new Error('The demo destination must not be a symbolic link.');
  rmSync(destination, { recursive: true, force: true });
  cpSync(source, destination, { recursive: true, dereference: false, errorOnExist: true, force: false });
  return build;
}

function npmRun(directory, script, env = {}) {
  const npmCli = process.env.npm_execpath;
  if (!npmCli) throw new Error('Run this command through npm run build:with-demo or npm run assemble:demo.');
  const result = spawnSync(process.execPath, [npmCli, 'run', script], {
    cwd: directory,
    env: { ...process.env, ...env },
    stdio: 'inherit',
    windowsHide: true,
    shell: false,
  });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${script} failed with exit code ${result.status}.`);
}

function parseOptions(args) {
  const options = { insuranceRoot: process.env.INSURANCE_AI_ROOT, expectedRevision: undefined, assembleOnly: false, allowDirty: false };
  for (let index = 0; index < args.length; index += 1) {
    const flag = args[index];
    if (flag === '--assemble-only') options.assembleOnly = true;
    else if (flag === '--allow-dirty') options.allowDirty = true;
    else if (flag === '--insurance-root' || flag === '--expected-ref') {
      const value = args[++index];
      if (!value || value.startsWith('--')) throw new Error(`A value is required after ${flag}.`);
      options[flag === '--insurance-root' ? 'insuranceRoot' : 'expectedRevision'] = value;
    } else throw new Error(`Unknown argument: ${flag}`);
  }
  if (!options.insuranceRoot) throw new Error('Provide --insurance-root <checkout> or set INSURANCE_AI_ROOT.');
  options.insuranceRoot = realpathSync(path.resolve(options.insuranceRoot));
  options.expectedRevision ??= readJson(path.join(portfolioRoot, 'insurance-demo.source.json')).revision;
  if (!/^[0-9a-f]{40}$/i.test(options.expectedRevision)) throw new Error('--expected-ref must be a complete Git commit SHA.');
  return options;
}

function main() {
  if (process.argv.slice(2).length === 1 && process.argv[2] === '--verify-only') {
    const revision = readJson(path.join(portfolioRoot, 'insurance-demo.source.json')).revision;
    ordinaryFile(path.join(portfolioRoot, 'out'), 'index.html');
    const build = validateExport(path.join(portfolioRoot, 'out', 'insurance-demo'), revision);
    console.log(`Verified Insurance AI ${build.applicationVersion} in the assembled portfolio export.`);
    return;
  }
  const options = parseOptions(process.argv.slice(2));
  const revision = execFileSync('git', ['-C', options.insuranceRoot, 'rev-parse', 'HEAD'], { encoding: 'utf8', windowsHide: true }).trim();
  if (revision !== options.expectedRevision) throw new Error(`Insurance AI checkout is ${revision}; expected ${options.expectedRevision}.`);
  const dirty = execFileSync('git', ['-C', options.insuranceRoot, 'status', '--porcelain', '--', 'frontend', 'pyproject.toml'], { encoding: 'utf8', windowsHide: true }).trim();
  if (dirty && !options.allowDirty) throw new Error('Insurance AI source has uncommitted changes. Use --allow-dirty only for a local preview.');
  const exportRoot = path.join(options.insuranceRoot, 'frontend', 'out');
  if (!options.assembleOnly) {
    npmRun(path.join(options.insuranceRoot, 'frontend'), 'build:demo', { CLAIMS_REVIEW_RUNTIME: 'static', CLAIMS_REVIEW_BASE_PATH: basePath });
    validateExport(exportRoot, revision, options.allowDirty);
    npmRun(portfolioRoot, 'build');
  }
  const build = assembleExport(exportRoot, path.join(portfolioRoot, 'out'), revision, options.allowDirty);
  console.log(`Portfolio + Insurance AI ${build.applicationVersion} assembled in out/ (source ${revision}).`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try { main(); } catch (error) { console.error(error.message); process.exitCode = 1; }
}
