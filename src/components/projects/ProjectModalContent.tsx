import { useLanguage } from '../../context/LanguageContext';
import { Project } from '../../types';
import { Gallery } from './Gallery';
import { localizedText } from '../../utils/localizedText';

const GITHUB_LINK_CLASSES =
  'inline-flex items-center gap-2 px-7 py-3 rounded-lg ' +
  'font-display font-semibold text-sm no-underline tracking-wide ' +
  'border-2 border-white/10 bg-white/[0.04] text-white transition-all duration-300 ' +
  'hover:bg-cyan-400/10 hover:border-cyan-300/50 hover:text-white ' +
  'hover:shadow-[0_0_0_2px_rgba(34,211,238,0.14)]';

const SECTION_TITLE_CLASSES = 'text-cyan-400 font-display font-semibold text-lg mb-3 mt-6 first:mt-0';

function localizedList(lang: string, enValues?: string[], frValues?: string[]): string[] {
  return lang === 'en' && enValues ? enValues : (frValues ?? []);
}

interface ProjectModalContentProps {
  project: Project;
  lang: string;
}

export function ProjectModalContent({ project, lang }: ProjectModalContentProps) {
  const { t } = useLanguage();
  const overviewItems = localizedList(lang, project.overviewEn, project.overview);
  const hasPrologue = Boolean(project.prologue || project.prologueEn);
  const hasOverview = overviewItems.length > 0;
  const hasDescription = Boolean(project.description || project.descEn);

  return (
    <>
      <Gallery photos={project.photos} title={project.title} />

      {/* Engineering Challenges */}
      {hasPrologue && (
        <>
          <h3 className={SECTION_TITLE_CLASSES}>
            {t('modal.sectionChallenges')}
          </h3>
          <p className="text-white italic font-medium leading-relaxed mb-4 pb-4 border-b border-white/10 whitespace-pre-line">
            {localizedText(lang, project.prologueEn, project.prologue)}
          </p>
        </>
      )}

      {/* Project Overview */}
      {hasOverview && (
        <>
          <h3 className={SECTION_TITLE_CLASSES}>
            {t('modal.sectionOverview')}
          </h3>
          <ul className="list-disc list-inside text-slate-300 leading-relaxed mb-4 space-y-1.5">
            {overviewItems.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </>
      )}

      {/* Project Description */}
      {hasDescription && (
        <>
          <h3 className={SECTION_TITLE_CLASSES}>
            {t('modal.sectionDescription')}
          </h3>
          <div className="text-slate-300 leading-relaxed mb-6 whitespace-pre-line">
            {localizedText(lang, project.descEn, project.description)}
          </div>
        </>
      )}

      {/* GitHub link — placed above techs so it's not at the very bottom */}
      {project.link && (
        <div className="mb-5">
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