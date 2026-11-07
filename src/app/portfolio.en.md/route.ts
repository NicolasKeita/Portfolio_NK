import { renderPortfolioMarkdown } from '../../data/portfolio-export';

export const dynamic = 'force-static';

export function GET() {
  return new Response(renderPortfolioMarkdown('en'), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
