import { useLanguage } from '../context/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative bg-[#050816]/72 backdrop-blur-xl text-slate-400 text-center py-12 px-8">
      <div className="max-w-[1100px] mx-auto flex flex-col items-center gap-6">
        <div className="flex gap-6 flex-wrap justify-center">
          <a href="#hero" className="text-slate-400 no-underline text-sm hover:text-cyan-300 transition-colors relative before:content-[''] before:absolute before:bottom-[-2px] before:left-0 before:w-full before:h-px before:bg-gradient-to-r before:from-transparent before:via-cyan-300 before:to-transparent before:opacity-0 before:transition-opacity hover:before:opacity-100">
            {t('footer.home')}
          </a>
          <a href="#projets" className="text-slate-400 no-underline text-sm hover:text-cyan-300 transition-colors relative before:content-[''] before:absolute before:bottom-[-2px] before:left-0 before:w-full before:h-px before:bg-gradient-to-r before:from-transparent before:via-cyan-300 before:to-transparent before:opacity-0 before:transition-opacity hover:before:opacity-100">
            {t('footer.projets')}
          </a>
          <a href="#formation" className="text-slate-400 no-underline text-sm hover:text-cyan-300 transition-colors relative before:content-[''] before:absolute before:bottom-[-2px] before:left-0 before:w-full before:h-px before:bg-gradient-to-r before:from-transparent before:via-cyan-300 before:to-transparent before:opacity-0 before:transition-opacity hover:before:opacity-100">
            {t('footer.formation')}
          </a>
          <a href="#contact" className="text-slate-400 no-underline text-sm hover:text-cyan-300 transition-colors relative before:content-[''] before:absolute before:bottom-[-2px] before:left-0 before:w-full before:h-px before:bg-gradient-to-r before:from-transparent before:via-cyan-300 before:to-transparent before:opacity-0 before:transition-opacity hover:before:opacity-100">
            {t('footer.contact')}
          </a>
        </div>
        <p className="text-slate-500 text-xs">
          {t('footer.copyright')}
        </p>
      </div>
    </footer>
  );
}
