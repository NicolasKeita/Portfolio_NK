import { Project } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { MagicCard } from './ui/MagicCard';

interface ProjectCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
}

export function ProjectCard({ project, onOpenModal }: ProjectCardProps) {
  const { lang } = useLanguage();

  const handleClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('a.proj-link')) return;
    onOpenModal(project);
  };

  return (
    <MagicCard
      onClick={handleClick}
    >
      <div className="px-6 pt-5 flex items-center justify-between">
        <span className={`font-mono text-xs font-semibold px-2 py-0.5 rounded ${project.tagClass === 'tag-py' ? 'bg-blue-100 text-blue-800' : project.tagClass === 'tag-sys' ? 'bg-green-100 text-green-800' : project.tagClass === 'tag-web' ? 'bg-purple-100 text-purple-800' : project.tagClass === 'tag-audit' ? 'bg-amber-100 text-amber-800' : project.tagClass === 'tag-data' ? 'bg-indigo-100 text-indigo-800' : project.tagClass === 'tag-mobile' ? 'bg-cyan-100 text-cyan-800' : project.tagClass === 'tag-ai' ? 'bg-pink-100 text-pink-800' : ''}`}>
          {project.tag}
        </span>
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="w-8 h-8 border border-white/10 rounded-lg flex items-center justify-center no-underline text-slate-400 text-sm hover:border-cyan-300/60 hover:text-white hover:bg-cyan-400/10 transition-colors"
          title="Voir le projet"
          onClick={(e) => e.stopPropagation()}
        >
          ↗
        </a>
      </div>
      <div className="px-6 pb-6 pt-5 flex-1 flex flex-col">
        <div className="font-display font-semibold text-base text-white mb-2">
          {lang === 'en' && project.titleEn ? project.titleEn : project.title}
        </div>
        <div className="text-sm text-slate-400 leading-relaxed flex-1 mb-4 whitespace-pre-line">
          {lang === 'en' && project.prologueEn ? project.prologueEn : project.prologue}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {project.techs.map((tech) => (
            <span key={tech} className="font-mono text-xs text-slate-300 bg-white/[0.04] border border-white/10 rounded px-1.5 py-0.5">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </MagicCard>
  );
}
