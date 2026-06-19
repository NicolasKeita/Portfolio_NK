import { useState, useRef } from 'react';
import { SvgIcon } from './SvgSprite';

export function PhotoUpload() {
  const [photo, setPhoto] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhoto(URL.createObjectURL(file));
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhoto(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleClick = () => {
    if (!photo) inputRef.current?.click();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && !photo) inputRef.current?.click();
  };

  return (
    <div className="hero-photo-col">
      <div
        className={`photo-placeholder${photo ? ' has-photo' : ''}`}
        role="button"
        tabIndex={0}
        title="Cliquez pour ajouter votre photo de profil"
        aria-label="Zone photo — cliquez pour importer une image"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          aria-hidden="true"
          onChange={handleFile}
        />
        {photo && <img src={photo} alt="Nicolas Keita" />}
        {!photo && (
          <div className="photo-empty">
            <SvgIcon id="#i-camera" className="photo-icon" />
            <div className="photo-hint">Cliquez pour<br />ajouter votre photo</div>
          </div>
        )}
      </div>
      {photo && (
        <button className="photo-remove" onClick={handleRemove}>
          ✕ Supprimer
        </button>
      )}
    </div>
  );
}