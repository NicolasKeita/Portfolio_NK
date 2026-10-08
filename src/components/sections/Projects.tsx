import { useState, useCallback, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getProjects, getImage } from '../../data';
import { Modal } from '../projects/Modal';
import { ProjectCard } from '../projects/ProjectCardComponent';
import { ProjectModalContent } from '../projects/ProjectModalContent';
import { sectionStyles } from './sectionStyles';
import { css } from '../../../styled-system/css';

const projectGrid = css({
  display: 'grid',
  gridTemplateColumns: { base: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
  gap: '6',
  maxW: '900px',
  mx: 'auto',
});

const projectQueryParam = 'projet';

function SectionHeader() {
  const { t } = useLanguage();

  return (
    <>
      <p className={sectionStyles.eyebrow}>
        {t('projects.label')}
      </p>
      <h2 className={sectionStyles.title}>
        {t('projects.title')}
      </h2>
    </>
  );
}

export function Projects() {
  const { lang } = useLanguage();
  const [modalProjectId, setModalProjectId] = useState<string | null>(null);
  const [showContent, setShowContent] = useState(false);
  const rafRef = useRef<number | null>(null);

  const projects = getProjects(lang as 'fr' | 'en');

  useEffect(() => {
    const syncProjectFromUrl = () => {
      const id = new URL(window.location.href).searchParams.get(projectQueryParam);
      setModalProjectId(id && projects.some((project) => project.id === id) ? id : null);
    };

    syncProjectFromUrl();
    window.addEventListener('popstate', syncProjectFromUrl);
    return () => window.removeEventListener('popstate', syncProjectFromUrl);
  }, [projects]);

  useEffect(() => {
    const imageUrls = projects.flatMap((project) => project.photos ?? []);
    imageUrls.forEach((src) => {
      if (!src) return;
      const img = new window.Image();
      img.decoding = 'async';
      img.src = getImage(src);
    });
  }, [projects]);

  useEffect(() => {
    if (!modalProjectId) {
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
  }, [modalProjectId]);

  const handleOpen = useCallback((id: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set(projectQueryParam, id);
    window.history.pushState(
      { ...window.history.state, portfolioProjectModal: id },
      '',
      url.toString()
    );
    setModalProjectId(id);
  }, []);

  const handleClose = useCallback(() => {
    setModalProjectId(null);
    if (window.history.state?.portfolioProjectModal) {
      window.history.back();
      return;
    }

    const url = new URL(window.location.href);
    url.searchParams.delete(projectQueryParam);
    window.history.replaceState(window.history.state, '', url.toString());
  }, []);

  const modalProject = modalProjectId ? projects.find((p) => p.id === modalProjectId) ?? null : null;

  return (
    <section id="projets" className={sectionStyles.section}>
      <div className={sectionStyles.inner}>
        <SectionHeader />

        <div className={projectGrid}>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              getImage={getImage}
              onOpen={() => handleOpen(project.id)}
            />
          ))}
        </div>
      </div>

      {modalProject && (
        <Modal
          title={modalProject.title}
          onClose={handleClose}
        >
          {showContent && <ProjectModalContent project={modalProject} getImage={getImage} />}
        </Modal>
      )}
    </section>
  );
}
