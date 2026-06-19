interface GalleryProps {
  photos: string[];
  title: string;
}

export function Gallery({ photos, title }: GalleryProps) {
  if (!photos || photos.length === 0) return null;

  return (
    <div className="gallery-grid">
      {photos.map((src, i) => (
        <div key={i} className="gallery-grid-cell">
          <img
            src={src}
            alt={`${title} – image ${i + 1}`}
            className="gallery-grid-img"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}
