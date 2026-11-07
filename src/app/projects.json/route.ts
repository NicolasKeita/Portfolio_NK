import { getExportProjects, portfolioAuthor } from '../../data/portfolio-export';

export const dynamic = 'force-static';

export function GET() {
  return Response.json({
    author: portfolioAuthor,
    projects: {
      fr: getExportProjects('fr'),
      en: getExportProjects('en'),
    },
  });
}
