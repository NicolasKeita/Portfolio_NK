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
    <section id="projets" className="py-16 px-8">
      <div className="max-w-[1100px] mx-auto">
        <p className="font-mono text-xs font-semibold text-amber uppercase tracking-widest mb-2.5">{t('projects.label')}</p>
        <h2
          className={`
            font-display font-bold text-white tracking-tight leading-tight mb-7
            drop-shadow-[0_0_28px_rgba(34,211,238,0.12)]
          `}
          style={{ fontSize: 'clamp(1.8rem, 4vw, 2.75rem)' }}
        >
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
          <div className="text-white italic font-medium leading-relaxed mb-4 pb-4 border-b border-white/10 whitespace-pre-line">
            {lang === 'en' && modalProject.prologueEn ? modalProject.prologueEn : modalProject.prologue}
          </div>
          <div className="text-slate-300 leading-relaxed mb-6 whitespace-pre-line">
            {lang === 'en' && modalProject.descEn ? modalProject.descEn : modalProject.description}
          </div>
          <div className="flex flex-wrap gap-1.5" style={{ marginTop: '1rem' }}>
            {modalProject.techs.map((tech) => (
              <span key={tech} className="font-mono text-xs text-slate-300 bg-white/[0.04] border border-white/10 rounded px-1.5 py-0.5">{tech}</span>
            ))}
          </div>
          {modalProject.link && (
            <a
              href={modalProject.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                mt-6 inline-flex items-center gap-2 px-7 py-3 rounded-lg
                font-display font-semibold text-sm no-underline tracking-wide
                border-2 border-white/10 bg-white/[0.04] text-white transition-all duration-300
                hover:bg-cyan-400/10 hover:border-cyan-300/50 hover:text-white
                hover:shadow-[0_0_0_2px_rgba(34,211,238,0.14)]
              `}
            >
              {t('modal.github')}
            </a>
          )}
        </Modal>
      )}
    </section>
  );
}
