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
    <div
      className="proj-card"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="proj-header">
        <span className={`proj-tag ${project.tagClass}`}>{project.tag}</span>
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="proj-link"
          title="Voir le projet"
          onClick={(e) => e.stopPropagation()}
        >
          ↗
        </a>
      </div>
      <div className="proj-body">
        <div className="proj-title">{lang === 'en' && project.titleEn ? project.titleEn : project.title}</div>
        <div className="proj-desc">{lang === 'en' && project.descEn ? project.descEn : project.description}</div>
        <div className="proj-techs">
          {project.techs.map((tech) => (
            <span key={tech} className="tech">{tech}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
