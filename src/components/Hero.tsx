import { SkillsMapPreview } from './SkillsMap';
import photoProfil from '../assets/photo-profil.jpg';

export function Hero() {
  return (
    <section id="hero">
      <div className="hero">
        <div className="hero-layout">
          <div className="hero-content">
            <div className="hero-code">
              <span className="ck">┌──(</span><span className="cv">nk</span><span className="ck">㉿</span><span className="cs">portfolio</span><span className="ck">)</span><br />
              <span className="ck">└─</span><span className="ck2">$ </span> whoami<span className="cursor" />
            </div>
            <h1 className="hero-name">Nicolas<br />Keita</h1>
            <span className="hero-role">Portfolio — Ingénieur Logiciel & Consultant IT</span>
            <p className="hero-desc">
              <a href="#formation" className="hero-text-link">
                Formé par les meilleures écoles, guidé par la rigueur et l'exigence de qualité.
              </a>
              <a href="#projets" className="hero-text-link">
                Talent démontré à travers des projets complexes, construits à partir de l'étude de publications scientifiques et de l'exploration de méthodes state of the art dans le domaine.
              </a>
            </p>
            <div className="hero-ctas">
              <a href="#projets" className="btn btn-primary">Voir mes réalisations</a>
              <a href="#contact" className="btn btn-secondary">Me contacter</a>
            </div>
            <SkillsMapPreview />
          </div>
          <div className="hero-photo-col">
            <div className="photo-placeholder has-photo">
              <img src={photoProfil} alt="Nicolas Keita" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}