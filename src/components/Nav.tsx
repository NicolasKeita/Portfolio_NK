import { motion } from 'framer-motion';
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
    <motion.nav
      className="sticky top-0 z-50 bg-white/90 dark:bg-[#0b1220]/85 backdrop-blur-xl border-b border-border-light dark:border-border-dark"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="max-w-[1100px] mx-auto px-8 h-[60px] flex items-center justify-between">
        <a className="font-display font-bold text-base text-text-light dark:text-text-dark no-underline tracking-tight" href="#hero">
          NK<span className="text-amber">.</span>
        </a>
        <div className="flex items-center gap-6">
          <ul className="nav-links flex gap-6 list-none m-0 p-0">
            <li><a className="text-sm font-medium text-muted-light dark:text-muted-dark no-underline hover:text-text-light dark:hover:text-text-dark transition-colors" href="#formation">{t('nav.formation')}</a></li>
            <li><a className="text-sm font-medium text-muted-light dark:text-muted-dark no-underline hover:text-text-light dark:hover:text-text-dark transition-colors" href="#projets">{t('nav.projets')}</a></li>
            <li><a className="text-sm font-medium text-muted-light dark:text-muted-dark no-underline hover:text-text-light dark:hover:text-text-dark transition-colors" href="#contact">{t('nav.contact')}</a></li>
          </ul>
          <button
            className="w-[38px] h-[34px] flex items-center justify-center border border-border-light dark:border-border-dark rounded-md bg-bg-card-light dark:bg-bg-card-dark text-text-light dark:text-text-dark cursor-pointer font-mono text-xs font-bold tracking-wider hover:border-blue hover:scale-105 transition-all"
            onClick={toggleLang}
            aria-label={t('nav.lang')}
            title={t('nav.lang')}
          >
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>
          <button
            className="w-[34px] h-[34px] flex items-center justify-center border border-border-light dark:border-border-dark rounded-full bg-bg-card-light dark:bg-bg-card-dark text-text-light dark:text-text-dark cursor-pointer hover:border-blue hover:scale-105 transition-all"
            onClick={onToggleTheme}
            aria-label={t('nav.theme')}
            title={t('nav.theme')}
          >
            <SvgIcon id="#i-sun" className="w-4 h-4 stroke-current fill-none stroke-[1.8] [.dark_&]:hidden" />
            <SvgIcon id="#i-moon" className="w-4 h-4 stroke-current fill-none stroke-[1.8] hidden [.dark_&]:block" />
          </button>
        </div>
      </div>
    </motion.nav>
  );
}