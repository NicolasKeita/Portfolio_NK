import { Project } from '../../types';
import { MagicCard } from '../ui/MagicCard';
import { localizedText } from '../../utils/localizedText';

const TAG_COLORS: Record<string, string> = {
  'tag-py': 'bg-blue-100 text-blue-800',
  'tag-sys': 'bg-green-100 text-green-800',
  'tag-web': 'bg-purple-100 text-purple-800',
  'tag-audit': 'bg-amber-100 text-amber-800',
  'tag-data': 'bg-indigo-100 text-indigo-800',
  'tag-mobile': 'bg-cyan-100 text-cyan-800',
  'tag-ai': 'bg-pink-100 text-pink-800',
};

const LINK_BUTTON_CLASSES =
  'w-8 h-8 border border-white/10 rounded-lg flex items-center justify-center ' +
  'no-underline text-slate-400 text-sm ' +
  'hover:border-cyan-300/60 hover:text-white hover:bg-cyan-400/10 transition-colors';

const TECH_BADGE_CLASSES =
  'font-mono text-xs text-slate-300 bg-white/[0.04] border border-white/10 rounded px-1.5 py-0.5';

function ProjectTag({ tagClass, tag }: { tagClass: string; tag: string }) {
  return (
    <span
      className={`${TAG_COLORS[tagClass] ?? ''} font-mono text-xs font-semibold px-2 py-0.5 rounded`}
    >
      {tag}
    </span>
  );
}

function TechBadge({ tech }: { tech: string }) {
  return <span className={TECH_BADGE_CLASSES}>{tech}</span>;
}

interface ProjectCardProps {
  project: Project;
  lang: string;
  onOpen: () => void;
}

export function ProjectCard({ project, lang, onOpen }: ProjectCardProps) {
  return (
    <MagicCard onClick={onOpen}>
      <div className="px-6 pt-5 flex items-center justify-between">
        <ProjectTag tagClass={project.tagClass} tag={project.tag} />

        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className={LINK_BUTTON_CLASSES}
          title="Voir le projet"
          onClick={(e) => e.stopPropagation()}
        >
          ↗
        </a>
      </div>

      <div className="px-6 pb-6 pt-5 flex-1 flex flex-col">
        <h3 className="font-display font-semibold text-base text-white mb-2">
          {localizedText(lang, project.titleEn, project.title)}
        </h3>

        <p className="text-sm text-slate-400 leading-relaxed flex-1 mb-5 whitespace-pre-line">
          {localizedText(lang, project.prologueEn, project.prologue)}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.techs.map((tech) => (
            <TechBadge key={tech} tech={tech} />
          ))}
        </div>
      </div>
    </MagicCard>
  );
}