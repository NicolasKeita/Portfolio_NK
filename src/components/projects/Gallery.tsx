import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useFocusTrap } from '../../hooks/useFocusTrap';

interface GalleryProps {
  photos: string[];
  title: string;
}

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
      className={[
        'rounded-lg overflow-hidden',
        'border border-border-light dark:border-border-dark',
        'bg-bg-dark-light dark:bg-bg-dark-dark',
        'aspect-[16/10] relative',
      ].join(' ')}
    >
      {!shouldLoad ? (
        <div className="absolute inset-0 bg-slate-800/70 animate-pulse" />
      ) : (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover block cursor-pointer transition-transform duration-300 hover:scale-105 hover:opacity-90"
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
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3 mb-6">
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
            className="fixed inset-0 z-[60] bg-black/92 cursor-pointer flex items-center justify-center"
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
              className={`
                absolute top-4 right-6 bg-black/50 border-none text-white text-2xl
                w-10 h-10 rounded-full cursor-pointer z-[61] flex items-center justify-center
                opacity-70 hover:opacity-100 transition-opacity leading-none
              `}
              onClick={closeLightbox}
              aria-label="Fermer"
            >
              ✕
            </button>
            <motion.img
              src={selectedImg}
              alt={`${title} – image agrandie`}
              className="max-w-[90vw] max-h-[90vh] w-auto h-auto object-contain rounded-lg cursor-default"
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
