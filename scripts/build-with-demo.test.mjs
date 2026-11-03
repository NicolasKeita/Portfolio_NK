import assert from 'node:assert/strict';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { assembleExport, validateExport } from './build-with-demo.mjs';

const revision = 'a'.repeat(40);

function fixture(t) {
  const temporary = mkdtempSync(path.join(os.tmpdir(), 'portfolio-demo-unit-'));
  t.after(() => {
    const resolved = path.resolve(temporary);
    assert.equal(path.dirname(resolved), path.resolve(os.tmpdir()));
    assert.ok(path.basename(resolved).startsWith('portfolio-demo-unit-'));
    rmSync(resolved, { recursive: true, force: true });
  });
  const source = path.join(temporary, 'insurance-export');
  const site = path.join(temporary, 'portfolio-export');
  function write(relative, content, directory = source) {
    const filename = path.join(directory, relative);
    mkdirSync(path.dirname(filename), { recursive: true });
    writeFileSync(filename, typeof content === 'string' ? content : JSON.stringify(content));
  }
  const build = { format: 'insurance-demo-export-v1', basePath: '/insurance-demo', runtime: 'static', applicationVersion: '0.1.66', sourceRevision: revision, sourceDirty: false };
  const review = {
    mode: 'demo', claim: { claim_id: 'SYNTHETIC-1' },
    documents: { data: { items: [{ document_url: 'demo/documents/case/policy.pdf' }] } },
    vision: { data: { images: [{ image_url: 'demo/images/case/car.png' }] } },
  };
  write('insurance-demo-build.json', build);
  write('index.html', '<html><script src="/insurance-demo/_next/static/app.js"></script></html>');
  write('_next/static/app.js', '// demo bundle');
  write('demo/manifest.json', { format: 'claims_static_demo_v1', claims: [{ claim_id: 'SYNTHETIC-1', review: 'reviews/case.json' }] });
  write('demo/catalog.json', [{ claim_id: 'SYNTHETIC-1', title: 'Prepared case' }]);
  write('demo/reviews/case.json', review);
  write('demo/documents/case/policy.pdf', '%PDF-unit-fixture');
  write('demo/images/case/car.png', 'unit-image-fixture');
  write('index.html', 'portfolio home', site);
  write('_next/static/portfolio.js', '// portfolio bundle', site);
  return { temporary, source, site, write, build, review };
}

test('assembles a complete isolated export without changing the portfolio or source', (t) => {
  const f = fixture(t);
  f.write('insurance-demo/stale.txt', 'old demo', f.site);
  const result = assembleExport(f.source, f.site, revision);
  assert.equal(result.applicationVersion, '0.1.66');
  assert.equal(readFileSync(path.join(f.site, 'index.html'), 'utf8'), 'portfolio home');
  assert.equal(readFileSync(path.join(f.site, '_next/static/portfolio.js'), 'utf8'), '// portfolio bundle');
  assert.equal(readFileSync(path.join(f.site, 'insurance-demo/demo/documents/case/policy.pdf'), 'utf8'), '%PDF-unit-fixture');
  assert.equal(existsSync(path.join(f.site, 'insurance-demo/stale.txt')), false);
  assert.equal(existsSync(path.join(f.source, 'demo/documents/case/policy.pdf')), true);
});

test('refuses an export with root Next assets before replacing an existing demo', (t) => {
  const f = fixture(t);
  f.write('index.html', '<script src="/_next/static/app.js"></script>');
  f.write('insurance-demo/keep.txt', 'previous working demo', f.site);
  assert.throws(() => assembleExport(f.source, f.site, revision), /not isolated/);
  assert.equal(readFileSync(path.join(f.site, 'insurance-demo/keep.txt'), 'utf8'), 'previous working demo');
});

test('refuses missing documents and paths escaping the demo export', (t) => {
  const f = fixture(t);
  rmSync(path.join(f.source, 'demo/documents/case/policy.pdf'));
  assert.throws(() => validateExport(f.source, revision), /ENOENT/);
  f.review.documents.data.items[0].document_url = '../private.pdf';
  f.write('demo/reviews/case.json', f.review);
  assert.throws(() => validateExport(f.source, revision), /escapes/);
});

test('checks the pinned revision and makes dirty-source previews explicit', (t) => {
  const f = fixture(t);
  assert.throws(() => validateExport(f.source, 'b'.repeat(40)), /revision differs/);
  f.build.sourceDirty = true;
  f.write('insurance-demo-build.json', f.build);
  assert.throws(() => validateExport(f.source, revision), /uncommitted changes/);
  assert.equal(validateExport(f.source, revision, true).sourceDirty, true);
});

test('refuses a differently mounted demo and an empty catalogue', (t) => {
  const f = fixture(t);
  f.build.basePath = '/';
  f.write('insurance-demo-build.json', f.build);
  assert.throws(() => validateExport(f.source, revision), /CLAIMS_REVIEW_BASE_PATH/);
  f.build.basePath = '/insurance-demo';
  f.write('insurance-demo-build.json', f.build);
  f.write('demo/catalog.json', []);
  assert.throws(() => validateExport(f.source, revision), /no prepared cases/);
});

test('refuses linked files from outside the export and overlapping output directories', (t) => {
  const f = fixture(t);
  assert.throws(() => assembleExport(f.source, f.source, revision), /separate output/);
  symlinkSync(f.site, path.join(f.source, 'external'), process.platform === 'win32' ? 'junction' : 'dir');
  assert.throws(() => validateExport(f.source, revision), /Symbolic links/);
});
