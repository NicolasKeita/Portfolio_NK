import { getProjects } from './index';
import { t } from '../i18n/translations';
import type { Lang } from '../i18n/translations';

export const portfolioAuthor = 'Nicolas Keita';

export function getExportProjects(lang: Lang) {
  return getProjects(lang).map((project) => ({
    id: project.id,
    title: project.title,
    tags: project.tags?.map((tag) => tag.name) ?? [project.tag],
    status: project.status ?? null,
    description: project.description,
    prologue: project.prologue ?? null,
    overview: project.overview ?? [],
    technologies: project.techs,
    url: `/?${new URLSearchParams({ projet: project.id, lang })}`,
    links: [
      ...(project.link ? [{ label: t(lang, 'modal.github'), url: project.link }] : []),
      ...(project.links ?? []),
      ...(project.demoUrl ? [{ label: t(lang, 'modal.demo'), url: `${project.demoUrl}?lang=${lang}` }] : []),
    ],
  }));
}

export function renderPortfolioMarkdown(lang: Lang) {
  const linksLabel = lang === 'fr' ? 'Liens' : 'Links';
  const projectLabel = lang === 'fr' ? 'Consulter le projet' : 'View project';
  const sections = getExportProjects(lang).map((project) => [
    `## ${project.title}`,
    project.tags.join(' · '),
    ...(project.status ? [project.status] : []),
    `### ${t(lang, 'modal.sectionOverview')}`,
    project.overview.map((item) => `- ${item}`).join('\n'),
    ...(project.prologue ? [`### ${t(lang, 'modal.sectionChallenges')}`, project.prologue] : []),
    `### ${t(lang, 'modal.sectionDescription')}`,
    project.description,
    '### Technologies',
    project.technologies.map((technology) => `- ${technology}`).join('\n'),
    `### ${linksLabel}`,
    [
      { label: projectLabel, url: project.url },
      ...project.links,
    ].map((link) => `- [${link.label}](<${link.url}>)`).join('\n'),
  ].join('\n\n'));

  return [`# Portfolio — ${portfolioAuthor}`, ...sections].join('\n\n') + '\n';
}
