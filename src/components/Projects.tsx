import { useState, useCallback, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Project } from '../types';
import { projects } from '../data/portfolio';
import { Modal } from './Modal';
import { ProjectCard } from './ProjectCardComponent';
import { ProjectModalContent } from './ProjectModalContent';
import { localizedText } from '../utils/localizedText';


function SectionHeader() {
  const { t } = useLanguage();

  return (
    <>
      <p className="font-mono text-xs font-semibold text-amber uppercase tracking-widest mb-2.5">
        {t('projects.label')}
      </p>
      <h2
        className="font-display font-bold text-white tracking-tight leading-tight mb-7 drop-shadow-[0_0_28px_rgba(34,211,238,0.12)]"
        style={{ fontSize: 'clamp(1.8rem, 4vw, 2.75rem)' }}
      >
        {t('projects.title')}
      </h2>
    </>
  );
}


export function Projects() {
  const { lang } = useLanguage();
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const [showContent, setShowContent] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const imageUrls = projects.flatMap((project) => project.photos ?? []);

    imageUrls.forEach((src) => {
      if (!src) return;
      const img = new window.Image();
      img.decoding = 'async';
      img.src = src;
    });
  }, []);

  useEffect(() => {
    if (!modalProject) {
      setShowContent(false);
      return;
    }

    rafRef.current = window.setTimeout(() => {
      setShowContent(true);
    }, 30);

    return () => {
      if (rafRef.current !== null) {
        window.clearTimeout(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [modalProject]);

  const handleOpen = useCallback((project: Project) => {
    setModalProject(project);
  }, []);

  const handleClose = useCallback(() => {
    setModalProject(null);
  }, []);

  return (
    <section id="projets" className="py-16 px-8">
      <div className="max-w-[1100px] mx-auto">
        <SectionHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              lang={lang}
              onOpen={() => handleOpen(project)}
            />
          ))}
        </div>
      </div>

      {modalProject && (
        <Modal
          title={localizedText(lang, modalProject.titleEn, modalProject.title)}
          onClose={handleClose}
        >
          {showContent && <ProjectModalContent project={modalProject} lang={lang} />}
        </Modal>
      )}
    </section>
  );
}