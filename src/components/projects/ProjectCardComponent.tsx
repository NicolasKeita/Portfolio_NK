import { memo } from 'react';
import { MagicCard } from '../ui/MagicCard';
import type { ProjectYaml } from '../../data';

const TAG_COLORS: Record<string, string> = {
  'tag-py': 'bg-blue-100 text-blue-800',
  'tag-sys': 'bg-green-100 text-green-800',
  'tag-web': 'bg-purple-100 text-purple-800',
  'tag-audit': 'bg-amber-100 text-amber-800',
  'tag-data': 'bg-indigo-100 text-indigo-800',
  'tag-mobile': 'bg-cyan-100 text-cyan-800',
  'tag-ai': 'bg-pink-100 text-pink-800',
  'tag-architecture': 'bg-amber-100 text-amber-800',
  'tag-opensource': 'bg-emerald-100 text-emerald-800',
  'tag-cpp': 'bg-sky-100 text-sky-800',
};

const LINK_BUTTON_CLASSES =
  'w-8 h-8 border border-white/10 rounded-lg flex items-center justify-center ' +
  'no-underline text-slate-400 text-sm ' +
  'hover:border-cyan-300/60 hover:text-white hover:bg-cyan-400/10 transition-colors';

const TECH_BADGE_CLASSES =
  'font-mono text-xs text-white bg-slate-700/80 border border-white/20 rounded-sm px-1.5 py-0.5';

function ProjectTag({ tagClass, tag }: { tagClass: string; tag: string }) {
  return (
    <span
      className={`${TAG_COLORS[tagClass] ?? ''} font-mono text-xs font-semibold px-2 py-0.5 rounded-sm`}
    >
      {tag}
    </span>
  );
}

function ProjectTags({ tags }: { tags: { name: string; class: string }[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((t) => (
        <span
          key={t.name}
          className={`${TAG_COLORS[t.class] ?? ''} font-mono text-xs font-semibold px-2 py-0.5 rounded-sm`}
        >
          {t.name}
        </span>
      ))}
    </div>
  );
}

function TechBadge({ tech }: { tech: string }) {
  return <span className={TECH_BADGE_CLASSES}>{tech}</span>;
}

interface ProjectCardProps {
  project: ProjectYaml;
  getImage: (path: string) => string;
  onOpen: () => void;
}

function ProjectCardBase({ project, getImage, onOpen }: ProjectCardProps) {
  return (
    <MagicCard onClick={onOpen} aria-label={`Voir le projet : ${project.title}`}>
      {project.bgImage && (
        <div
          className="absolute inset-0 opacity-100 pointer-events-none"
          style={{
            backgroundImage: `url(${getImage(project.bgImage)})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      )}

      <div className="absolute inset-0 bg-slate-900/30 group-hover:bg-slate-900/55 transition-all duration-500 z-1" />

      <div className="px-6 pt-5 flex items-center justify-between relative z-10 transition-all duration-500">
        {project.tags ? (
          <ProjectTags tags={project.tags} />
        ) : (
          <ProjectTag tagClass={project.tagClass} tag={project.tag} />
        )}

        <div className="flex gap-1.5">
          {project.links ? (
            project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className={LINK_BUTTON_CLASSES}
                title={link.label}
                onClick={(e) => e.stopPropagation()}
              >
                ↗
              </a>
            ))
          ) : (
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
          )}
        </div>
      </div>

      <div className="px-6 pb-6 pt-5 flex-1 flex flex-col relative z-10">
        <h3 className="font-display font-semibold text-base text-white mb-2">
          {project.title}
        </h3>

        <div
          className={[
            'opacity-0 group-hover:opacity-100 transition-all duration-500',
            'flex-1 flex flex-col bg-slate-900/70 rounded-lg p-3 -mx-3',
          ].join(' ')}
        >
          {project.overview && project.overview.length > 0 ? (
            <ul className="text-sm text-slate-200 leading-relaxed flex-1 mb-5 list-disc list-inside space-y-1">
              {project.overview.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-200 leading-relaxed flex-1 mb-5 whitespace-pre-line">
              {project.prologue ?? project.description}
            </p>
          )}

          <div className="flex flex-wrap gap-1.5">
            {project.techs.map((tech) => (
              <TechBadge key={tech} tech={tech} />
            ))}
          </div>
        </div>
      </div>
    </MagicCard>
  );
}

export const ProjectCard = memo(ProjectCardBase);
