import { SkillsMapPreview } from './SkillsMap';
import { useLanguage } from '../context/LanguageContext';
import photoProfil from '../assets/photo-profil.jpg';

export function Hero() {
  const { t } = useLanguage();

  return (
    <section id="hero">
      <div className="hero">
        <div className="hero-layout">
          <div className="hero-content">
            <div className="hero-name-photo-row">
              <h1 className="hero-name">Nicolas<br />Keita</h1>
              <div className="hero-photo-col">
                <div className="photo-placeholder has-photo">
                  <img src={photoProfil} alt="Nicolas Keita" />
                </div>
              </div>
            </div>
            <span className="hero-role">{t('hero.role')}</span>
            <p className="hero-tagline">{t('hero.tagline')}</p>
            <p className="hero-desc">
              <a href="#formation" className="hero-text-link">
                {t('hero.line1')}
              </a>
              <a href="#projets" className="hero-text-link">
                {t('hero.line2')}
              </a>
            </p>
            <div className="hero-ctas">
              <a href="#projets" className="btn btn-primary">{t('hero.cta.work')}</a>
              <a href="#contact" className="btn btn-secondary">{t('hero.cta.contact')}</a>
            </div>
            <SkillsMapPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
