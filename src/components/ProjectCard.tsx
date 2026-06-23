import { motion } from 'framer-motion';
import { Project } from '../types';
import { useLanguage } from '../context/LanguageContext';

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
    <motion.div
      className="bg-bg-card-light dark:bg-bg-card-dark border border-border-light dark:border-border-dark rounded-xl overflow-hidden flex flex-col cursor-pointer transition-shadow duration-300 hover:border-blue"
      onClick={handleClick}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
    >
      <div className="px-6 pt-5 flex items-center justify-between">
        <span className={`font-mono text-xs font-semibold px-2 py-0.5 rounded ${project.tagClass === 'tag-py' ? 'bg-blue-100 text-blue-800' : project.tagClass === 'tag-sys' ? 'bg-green-100 text-green-800' : project.tagClass === 'tag-web' ? 'bg-purple-100 text-purple-800' : project.tagClass === 'tag-audit' ? 'bg-amber-100 text-amber-800' : project.tagClass === 'tag-data' ? 'bg-indigo-100 text-indigo-800' : project.tagClass === 'tag-mobile' ? 'bg-cyan-100 text-cyan-800' : project.tagClass === 'tag-ai' ? 'bg-pink-100 text-pink-800' : ''}`}>
          {project.tag}
        </span>
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="w-8 h-8 border border-border-light dark:border-border-dark rounded-lg flex items-center justify-center no-underline text-muted-light dark:text-muted-dark text-sm hover:border-blue hover:text-text-light dark:hover:text-text-dark transition-colors"
          title="Voir le projet"
          onClick={(e) => e.stopPropagation()}
        >
          ↗
        </a>
      </div>
      <div className="px-6 pb-6 pt-5 flex-1 flex flex-col">
        <div className="font-display font-semibold text-base text-text-light dark:text-text-dark mb-2">
          {lang === 'en' && project.titleEn ? project.titleEn : project.title}
        </div>
        <div className="text-sm text-muted-light dark:text-muted-dark leading-relaxed flex-1 mb-4 whitespace-pre-line">
          {lang === 'en' && project.prologueEn ? project.prologueEn : project.prologue}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {project.techs.map((tech) => (
            <span key={tech} className="font-mono text-xs text-muted-light dark:text-muted-dark bg-bg-dark-light dark:bg-bg-dark-dark border border-border-light dark:border-border-dark rounded px-1.5 py-0.5">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}