import { useState } from 'react';
import { Project } from '../types';
import { projects } from '../data/portfolio';
import { ProjectCard } from './ProjectCard';
import { Modal } from './Modal';
import { Gallery } from './Gallery';

export function Projects() {
  const [modalProject, setModalProject] = useState<Project | null>(null);

  return (
    <section id="projets" className="sec projets-sec">
      <div className="sec-inner">
        <p className="sec-label">Projets</p>
        <h2 className="sec-title">Réalisations</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenModal={setModalProject}
            />
          ))}
        </div>
      </div>

      {modalProject && (
        <Modal
          title={modalProject.title}
          onClose={() => setModalProject(null)}
        >
          <Gallery photos={modalProject.photos} title={modalProject.title} />
          <p>{modalProject.description}</p>
          <div className="proj-techs" style={{ marginTop: '1rem' }}>
            {modalProject.techs.map((tech) => (
              <span key={tech} className="tech">{tech}</span>
            ))}
          </div>
        </Modal>
      )}
    </section>
  );
}
