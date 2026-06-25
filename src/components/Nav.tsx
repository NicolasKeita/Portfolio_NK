import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export function Nav() {
  const { lang, setLang, t } = useLanguage();

  const toggleLang = () => {
    setLang(lang === 'fr' ? 'en' : 'fr');
  };

  return (
    <motion.nav
      className="sticky top-0 z-50 bg-[#050816]/78 backdrop-blur-2xl border-b border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.2)]"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="max-w-[1100px] mx-auto px-8 h-[60px] flex items-center justify-between">
        <a className="font-display font-bold text-base text-white no-underline tracking-tight" href="#hero">
          NK<span className="text-amber">.</span>
        </a>
        <div className="flex items-center gap-6">
          <ul className="nav-links flex gap-6 list-none m-0 p-0">
            <li><a className="text-sm font-medium text-slate-400 no-underline hover:text-white transition-colors" href="#formation">{t('nav.formation')}</a></li>
            <li><a className="text-sm font-medium text-slate-400 no-underline hover:text-white transition-colors" href="#projets">{t('nav.projets')}</a></li>
            <li><a className="text-sm font-medium text-slate-400 no-underline hover:text-white transition-colors" href="#contact">{t('nav.contact')}</a></li>
          </ul>
          <button
            className="w-[38px] h-[34px] flex items-center justify-center border border-white/10 rounded-md bg-white/[0.04] text-white cursor-pointer font-mono text-xs font-bold tracking-wider hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:scale-105 transition-all"
            onClick={toggleLang}
            aria-label={t('nav.lang')}
            title={t('nav.lang')}
          >
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
