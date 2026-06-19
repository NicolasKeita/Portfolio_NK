import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Project } from '../types';
import { projects } from '../data/portfolio';
import { ProjectCard } from './ProjectCard';
import { Modal } from './Modal';
import { Gallery } from './Gallery';

export function Projects() {
  const { lang, t } = useLanguage();
  const [modalProject, setModalProject] = useState<Project | null>(null);

  return (
    <section id="projets" className="sec projets-sec">
      <div className="sec-inner">
        <p className="sec-label">{t('projects.label')}</p>
        <h2 className="sec-title">{t('projects.title')}</h2>
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
          title={lang === 'en' && modalProject.titleEn ? modalProject.titleEn : modalProject.title}
          onClose={() => setModalProject(null)}
        >
          <Gallery photos={modalProject.photos} title={modalProject.title} />
          <p>{lang === 'en' && modalProject.descEn ? modalProject.descEn : modalProject.description}</p>
          <div className="proj-techs" style={{ marginTop: '1rem' }}>
            {modalProject.techs.map((tech) => (
              <span key={tech} className="tech">{tech}</span>
            ))}
          </div>
          {modalProject.link && (
            <a
              href={modalProject.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-github"
            >
              {t('modal.github')}
            </a>
          )}
        </Modal>
      )}
    </section>
  );
}
