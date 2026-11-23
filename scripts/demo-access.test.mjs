import assert from 'node:assert/strict';
import { execFile, spawn } from 'node:child_process';
import { copyFile, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import { parse } from 'smol-toml';

const root = fileURLToPath(new URL('../', import.meta.url));
const require = createRequire(import.meta.url);
const nextCli = require.resolve('next/dist/bin/next');
const run = promisify(execFile);
const demoRoot = 'out/insurance-demo';
const demoHtml = '<!doctype html><h1>Insurance AI demo fixture</h1>';
const assets = [
  ['_next/static/demo.js', 'text/javascript', 'console.log("Demo fixture");'],
  ['_next/static/demo.css', 'text/css', 'h1 { color: navy; }'],
  ['demo/catalog.json', 'application/json', '[{"claim_id":"SYNTHETIC-1"}]'],
  ['demo/reviews/case.json', 'application/json', '{"claim":{"claim_id":"SYNTHETIC-1"}}'],
  ['demo/documents/policy.pdf', 'application/pdf', '%PDF-fixture'],
  ['demo/images/car.png', 'image/png', 'Image fixture'],
];

async function writeFixture(directory, relativePath, contents) {
  const filename = path.join(directory, relativePath);
  await mkdir(path.dirname(filename), { recursive: true });
  await writeFile(filename, contents);
}

function readServerAddress(server, getLogs) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('Next.js did not report a local address')), 25_000);
    server.once('error', (error) => {
      clearTimeout(timeout);
      reject(error);
    });
    server.once('close', (code) => {
      clearTimeout(timeout);
      reject(new Error(`Next.js exited during startup with code ${code}`));
    });
    server.stdout.on('data', () => {
      const match = getLogs().match(/Local:\s+(http:\/\/127\.0\.0\.1:\d+)/);
      if (match) {
        clearTimeout(timeout);
        resolve(match[1]);
      }
    });
  });
}

test('serves the assembled demo through the Next.js development router', { timeout: 75_000 }, async (t) => {
  const cache = path.join(root, '.npm-cache');
  await mkdir(cache, { recursive: true });
  const fixture = await mkdtemp(path.join(cache, 'demo-access-'));
  assert.equal(path.dirname(fixture), cache);
  assert.ok(path.basename(fixture).startsWith('demo-access-'));
  t.after(async () => rm(fixture, { recursive: true, force: true, maxRetries: 5 }));

  const route = 'src/app/insurance-demo/[[...asset]]/route.dev.ts';
  await mkdir(path.dirname(path.join(fixture, route)), { recursive: true });
  await Promise.all([
    copyFile(path.join(root, route), path.join(fixture, route)),
    copyFile(path.join(root, 'next.config.ts'), path.join(fixture, 'next.config.ts')),
    writeFixture(fixture, 'package.json', '{"name":"portfolio-demo-access-fixture","private":true}'),
    writeFixture(fixture, 'src/app/layout.jsx', 'export default function Layout({ children }) { return <html><body>{children}</body></html>; }'),
    writeFixture(fixture, 'src/app/page.jsx', 'export default function Home() { return <h1>Portfolio fixture</h1>; }'),
  ]);

  const cli = spawn(process.execPath, [nextCli, 'dev', '--webpack', '--hostname', '127.0.0.1', '--port', '0'], {
    cwd: fixture,
    env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1', FORCE_COLOR: '0' },
    stdio: ['ignore', 'pipe', 'pipe'],
    windowsHide: true,
  });
  let logs = '';
  for (const stream of [cli.stdout, cli.stderr]) stream.setEncoding('utf8').on('data', (chunk) => { logs += chunk; });
  const closed = new Promise((resolve) => cli.once('close', resolve));

  try {
    const address = await readServerAddress(cli, () => logs);
    const request = (url, options) => fetch(new URL(url, address), { signal: AbortSignal.timeout(30_000), ...options });

    await t.test('keeps the portfolio available before the demo is assembled', async () => {
      const response = await request('/');
      assert.equal(response.status, 200);
      assert.match(await response.text(), /Portfolio fixture/);
    });

    await t.test('explains how to assemble the missing demo and returns 404 for missing assets', async () => {
      const response = await request('/insurance-demo?lang=fr');
      assert.equal(response.status, 503);
      assert.match(await response.text(), /npm run build:with-demo/);
      assert.equal((await request('/insurance-demo/_next/static/demo.js')).status, 404);
    });

    await Promise.all([
      writeFixture(fixture, `${demoRoot}/index.html`, demoHtml),
      writeFixture(fixture, 'out/outside.txt', 'Outside the demo'),
      ...assets.map(([filename, , contents]) => writeFixture(fixture, `${demoRoot}/${filename}`, contents)),
    ]);

    const { demoUrl } = parse(await readFile(path.join(root, 'src/i18n/locales/projects/insurance-claims-ai.toml'), 'utf8'));
    for (const url of [`${demoUrl}?lang=fr`, '/insurance-demo?lang=en', '/insurance-demo/?lang=fr&claim=SYNTHETIC-1']) {
      await t.test(`opens ${url} without restarting Next.js`, async () => {
        const response = await request(url);
        assert.equal(response.status, 200);
        assert.equal(new URL(response.url).search, new URL(url, address).search);
        assert.match(response.headers.get('content-type'), /^text\/html\b/);
        assert.equal(await response.text(), demoHtml);
      });
    }

    for (const [filename, mime, contents] of assets) {
      await t.test(`serves ${filename} with ${mime}`, async () => {
        const response = await request(`/insurance-demo/${filename}`);
        assert.equal(response.status, 200);
        assert.equal(response.headers.get('content-type').split(';')[0], mime);
        assert.equal(await response.text(), contents);
      });
    }

    await t.test('supports HEAD requests for documents', async () => {
      const response = await request('/insurance-demo/demo/documents/policy.pdf', { method: 'HEAD' });
      assert.equal(response.status, 200);
      assert.equal(response.headers.get('content-type'), 'application/pdf');
      assert.equal(await response.text(), '');
    });

    await t.test('returns 404 for unknown assets and rejects paths outside the demo', async () => {
      for (const url of ['/insurance-demo/missing.js', '/insurance-demo/..%2Foutside.txt', '/insurance-demo/..%5Coutside.txt']) {
        assert.equal((await request(url)).status, 404, url);
      }
    });
  } catch (error) {
    t.diagnostic(logs.trim());
    throw error;
  } finally {
    if (cli.pid && cli.exitCode === null && cli.signalCode === null) {
      if (process.platform === 'win32') await run('taskkill.exe', ['/PID', String(cli.pid), '/T', '/F']);
      else cli.kill('SIGTERM');
    }
    await closed;
  }
});
