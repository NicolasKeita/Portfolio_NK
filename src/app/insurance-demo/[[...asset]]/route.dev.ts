import { readFile, realpath, stat } from 'node:fs/promises';
import path from 'node:path';

const exportDirectory = path.resolve('out', 'insurance-demo');
const contentTypes: Record<string, string> = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
};

export async function GET(_request: Request, { params }: { params: Promise<{ asset?: string[] }> }) {
  const { asset } = await params;
  const segments = asset ?? ['index.html'];
  if (segments.some((segment) => segment === '.' || segment === '..' || /[\\/:]/.test(segment) || segment.includes('\0'))) {
    return new Response('Not found', { status: 404 });
  }

  try {
    const root = await realpath(exportDirectory);
    const filename = await realpath(path.join(root, ...segments));
    const relative = path.relative(root, filename);
    if (relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative) || !(await stat(filename)).isFile()) {
      return new Response('Not found', { status: 404 });
    }

    return new Response(await readFile(filename), {
      headers: {
        'Cache-Control': 'no-store',
        'Content-Type': contentTypes[path.extname(filename).toLowerCase()] ?? 'application/octet-stream',
      },
    });
  } catch (error) {
    if (!(error instanceof Error && 'code' in error && (error.code === 'ENOENT' || error.code === 'ENOTDIR'))) throw error;
    if (asset) return new Response('Not found', { status: 404 });

    return new Response(
      'Démo locale indisponible. Depuis le portfolio, lancez npm run build:with-demo '
      + '-- --insurance-root ../insurance_claims_ai_triage, puis rechargez la page.',
      { status: 503 },
    );
  }
}
