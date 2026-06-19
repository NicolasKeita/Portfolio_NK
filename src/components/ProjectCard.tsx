import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
}

export function ProjectCard({ project, onOpenModal }: ProjectCardProps) {
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
        <div className="proj-title">{project.title}</div>
        <div className="proj-desc">{project.description}</div>
        <div className="proj-techs">
          {project.techs.map((tech) => (
            <span key={tech} className="tech">{tech}</span>
          ))}
        </div>
      </div>
    </div>
  );
}