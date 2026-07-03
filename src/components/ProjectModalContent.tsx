import { useLanguage } from '../context/LanguageContext';
import { Project } from '../types';
import { Gallery } from './Gallery';
import { localizedText } from '../utils/localizedText';


const GITHUB_LINK_CLASSES =
  'mt-6 inline-flex items-center gap-2 px-7 py-3 rounded-lg ' +
  'font-display font-semibold text-sm no-underline tracking-wide ' +
  'border-2 border-white/10 bg-white/[0.04] text-white transition-all duration-300 ' +
  'hover:bg-cyan-400/10 hover:border-cyan-300/50 hover:text-white ' +
  'hover:shadow-[0_0_0_2px_rgba(34,211,238,0.14)]';



interface ProjectModalContentProps {
  project: Project;
  lang: string;
}

export function ProjectModalContent({ project, lang }: ProjectModalContentProps) {
  const { t } = useLanguage();

  return (
    <>
      <Gallery photos={project.photos} title={project.title} />

      <p className="text-white italic font-medium leading-relaxed mb-4 pb-4 border-b border-white/10 whitespace-pre-line">
        {localizedText(lang, project.prologueEn, project.prologue)}
      </p>

      <div className="text-slate-300 leading-relaxed mb-6 whitespace-pre-line">
        {localizedText(lang, project.descEn, project.description)}
      </div>

      <div className="flex flex-wrap gap-1.5" style={{ marginTop: '1rem' }}>
        {project.techs.map((tech) => (
          <span key={tech} className="font-mono text-xs text-slate-300 bg-white/[0.04] border border-white/10 rounded px-1.5 py-0.5">
            {tech}
          </span>
        ))}
      </div>

      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className={GITHUB_LINK_CLASSES}
        >
          {t('modal.github')}
        </a>
      )}
    </>
  );
}