import { useState } from 'react';
import { createPortal } from 'react-dom';

interface GalleryProps {
  photos: string[];
  title: string;
}

export function Gallery({ photos, title }: GalleryProps) {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

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
      <div className="gallery-grid">
        {photos.map((src, i) => (
          <div key={i} className="gallery-grid-cell">
            <img
              src={src}
              alt={`${title} – ${i + 1}`}
              className="gallery-grid-img"
              loading="lazy"
              onClick={() => openLightbox(src)}
            />
          </div>
        ))}
      </div>

      {selectedImg && createPortal(
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>
            ✕
          </button>
          <img
            src={selectedImg}
            alt=""
            className="lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>,
        document.body
      )}
    </>
  );
}
