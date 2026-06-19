import { SvgIcon } from './SvgSprite';
import { useLanguage } from '../context/LanguageContext';

interface NavProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export function Nav({ theme, onToggleTheme }: NavProps) {
  const { lang, setLang, t } = useLanguage();

  const toggleLang = () => {
    setLang(lang === 'fr' ? 'en' : 'fr');
  };

  return (
    <nav>
      <div className="nav-inner">
        <a className="nav-logo" href="#hero">NK<span>.</span></a>
        <div className="nav-right">
          <ul className="nav-links">
            <li><a href="#formation">{t('nav.formation')}</a></li>
            <li><a href="#projets">{t('nav.projets')}</a></li>
            <li><a href="#contact">{t('nav.contact')}</a></li>
          </ul>
          <button className="lang-toggle" onClick={toggleLang} aria-label={t('nav.lang')} title={t('nav.lang')}>
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>
          <button className="theme-toggle" onClick={onToggleTheme} aria-label={t('nav.theme')} title={t('nav.theme')}>
            <SvgIcon id="#i-sun" className="theme-icon-sun" />
            <SvgIcon id="#i-moon" className="theme-icon-moon" />
          </button>
        </div>
      </div>
    </nav>
  );
}
