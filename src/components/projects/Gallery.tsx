import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { css } from '../../../styled-system/css';

interface GalleryProps {
  photos: string[];
  title: string;
}

const styles = {
  thumb: css({
    rounded: 'lg',
    overflow: 'hidden',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(255,255,255,0.1)',
    bg: '#0b1220',
    aspectRatio: '16 / 10',
    position: 'relative',
  }),
  placeholder: css({
    position: 'absolute',
    inset: 0,
    bg: 'rgba(30,41,59,0.7)',
    animation: 'pulse 2s cubic-bezier(.4,0,.6,1) infinite',
  }),
  image: css({
    w: 'full',
    h: 'full',
    objectFit: 'cover',
    display: 'block',
    cursor: 'pointer',
    transition: 'transform 300ms ease, opacity 300ms ease',
    _hover: {
      transform: 'scale(1.05)',
      opacity: 0.9,
    },
  }),
  grid: css({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '3',
    mb: '6',
  }),
  lightbox: css({
    position: 'fixed',
    inset: 0,
    zIndex: 60,
    bg: 'rgba(0,0,0,0.92)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  closeButton: css({
    position: 'absolute',
    top: '4',
    right: '6',
    bg: 'rgba(0,0,0,0.5)',
    borderWidth: 0,
    color: 'white',
    fontSize: '2xl',
    w: '10',
    h: '10',
    rounded: 'full',
    cursor: 'pointer',
    zIndex: 61,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.7,
    transition: 'opacity 150ms ease',
    lineHeight: 'none',
    _hover: {
      opacity: 1,
    },
  }),
  lightboxImage: css({
    maxW: '90vw',
    maxH: '90vh',
    w: 'auto',
    h: 'auto',
    objectFit: 'contain',
    rounded: 'lg',
    cursor: 'default',
  }),
};

function LazyGalleryImage({
  src,
  alt,
  onClick,
}: {
  src: string;
  alt: string;
  onClick: () => void;
}) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '120px 0px', threshold: 0.01 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={styles.thumb}
    >
      {!shouldLoad ? (
        <div className={styles.placeholder} />
      ) : (
        <img
          src={src}
          alt={alt}
          className={styles.image}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          onClick={onClick}
        />
      )}
    </div>
  );
}

export function Gallery({ photos, title }: GalleryProps) {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);

  useFocusTrap(lightboxRef, selectedImg !== null, () => setSelectedImg(null));

  if (!photos || photos.length === 0) return null;

  const openLightbox = (src: string) => {
    document.body.style.overflow = 'hidden';
    setSelectedImg(src);
  };

  const closeLightbox = () => {
    document.body.style.overflow = '';
    setSelectedImg(null);
  };

  return (
    <>
      <div className={styles.grid}>
        {photos.map((src, i) => (
          <LazyGalleryImage
            key={`${src}-${i}`}
            src={src}
            alt={`${title} – ${i + 1}`}
            onClick={() => openLightbox(src)}
          />
        ))}
      </div>

      {selectedImg && createPortal(
        <AnimatePresence>
          <motion.div
            key="lightbox"
            ref={lightboxRef}
            className={styles.lightbox}
            onClick={closeLightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${title} – image agrandie`}
            tabIndex={-1}
          >
            <button
              className={styles.closeButton}
              onClick={closeLightbox}
              aria-label="Fermer"
            >
              ✕
            </button>
            <motion.img
              src={selectedImg}
              alt={`${title} – image agrandie`}
              className={styles.lightboxImage}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
            />
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
