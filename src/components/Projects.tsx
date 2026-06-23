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
    <section id="projets" className="py-14 px-8 bg-bg-dark-light dark:bg-bg-dark-dark">
      <div className="max-w-[1100px] mx-auto">
        <p className="font-mono text-xs font-semibold text-amber uppercase tracking-widest mb-2.5">{t('projects.label')}</p>
        <h2 className="font-display font-bold text-text-light dark:text-text-dark tracking-tight leading-tight mb-7" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.75rem)' }}>
          {t('projects.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto">
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
          <div className="text-text-light dark:text-text-dark italic font-medium leading-relaxed mb-4 pb-4 border-b border-border-light dark:border-border-dark whitespace-pre-line">
            {lang === 'en' && modalProject.prologueEn ? modalProject.prologueEn : modalProject.prologue}
          </div>
          <div className="text-muted-light dark:text-muted-dark leading-relaxed mb-6 whitespace-pre-line">
            {lang === 'en' && modalProject.descEn ? modalProject.descEn : modalProject.description}
          </div>
          <div className="flex flex-wrap gap-1.5" style={{ marginTop: '1rem' }}>
            {modalProject.techs.map((tech) => (
              <span key={tech} className="font-mono text-xs text-muted-light dark:text-muted-dark bg-bg-dark-light dark:bg-bg-dark-dark border border-border-light dark:border-border-dark rounded px-1.5 py-0.5">{tech}</span>
            ))}
          </div>
          {modalProject.link && (
            <a
              href={modalProject.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 px-7 py-3 rounded-lg font-display font-semibold text-sm no-underline tracking-wide border-2 border-border-light dark:border-border-dark bg-transparent text-text-light dark:text-text-dark transition-all duration-300 hover:bg-[#24292e] hover:border-[#24292e] hover:text-white hover:shadow-[0_0_0_2px_rgba(36,41,46,0.2)]"
            >
              {t('modal.github')}
            </a>
          )}
        </Modal>
      )}
    </section>
  );
}