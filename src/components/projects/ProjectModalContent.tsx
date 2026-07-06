import { useLanguage } from '../../context/LanguageContext';
import { Gallery } from './Gallery';
import type { ProjectYaml } from '../../data';

const GITHUB_LINK_CLASSES =
  'inline-flex items-center gap-2 px-7 py-3 rounded-lg ' +
  'font-display font-semibold text-sm no-underline tracking-wide ' +
  'border-2 border-white/10 bg-white/[0.04] text-white transition-all duration-300 ' +
  'hover:bg-cyan-400/10 hover:border-cyan-300/50 hover:text-white ' +
  'hover:shadow-[0_0_0_2px_rgba(34,211,238,0.14)]';

const SECTION_TITLE_CLASSES = 'text-cyan-400 font-display font-semibold text-lg mb-3 mt-6 first:mt-0';

interface ProjectModalContentProps {
  project: ProjectYaml;
  getImage: (path: string) => string;
}

export function ProjectModalContent({ project, getImage }: ProjectModalContentProps) {
  const { t } = useLanguage();

  const hasPrologue = Boolean(project.prologue);
  const hasOverview = Boolean(project.overview && project.overview.length > 0);
  const hasDescription = Boolean(project.description);

  return (
    <>
      <Gallery photos={project.photos.map(getImage)} title={project.title} />

      {/* GitHub link */}
      {project.link && (
        <div className="mb-5 mt-4">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={GITHUB_LINK_CLASSES}
          >
            {t('modal.github')}
          </a>
        </div>
      )}

      {/* Project Overview */}
      {hasOverview && (
        <>
          <h3 className={SECTION_TITLE_CLASSES}>
            {t('modal.sectionOverview')}
          </h3>
          <ul className="list-disc list-inside text-slate-300 leading-relaxed mb-4 space-y-1.5">
            {project.overview!.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </>
      )}

      {/* Engineering Challenges */}
      {hasPrologue && (
        <>
          <h3 className={SECTION_TITLE_CLASSES}>
            {t('modal.sectionChallenges')}
          </h3>
          <p className="text-white italic font-medium leading-relaxed mb-4 pb-4 border-b border-white/10 whitespace-pre-line">
            {project.prologue}
          </p>
        </>
      )}

      {/* Project Description */}
      {hasDescription && (
        <>
          <h3 className={SECTION_TITLE_CLASSES}>
            {t('modal.sectionDescription')}
          </h3>
          <div className="text-slate-300 leading-relaxed mb-6 whitespace-pre-line">
            {project.description}
          </div>
        </>
      )}

      {/* Techs */}
      <div className="flex flex-wrap gap-1.5">
        {project.techs.map((tech) => (
          <span key={tech} className="font-mono text-xs text-slate-300 bg-white/[0.04] border border-white/10 rounded px-1.5 py-0.5">
            {tech}
          </span>
        ))}
      </div>
    </>
  );
}