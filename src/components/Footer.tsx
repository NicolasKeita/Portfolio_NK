import { useLanguage } from '../context/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-bg-card-light dark:bg-bg-card-dark border-t border-border-light dark:border-border-dark text-text-soft-light dark:text-text-soft-dark text-center py-12 px-8">
      <div className="max-w-[1100px] mx-auto flex flex-col items-center gap-6">
        <div className="flex gap-6 flex-wrap justify-center">
          <a href="#hero" className="text-text-soft-light dark:text-text-soft-dark no-underline text-sm hover:text-blue transition-colors relative before:content-[''] before:absolute before:bottom-[-2px] before:left-0 before:w-full before:h-px before:bg-gradient-to-r before:from-transparent before:via-blue before:to-transparent before:opacity-0 before:transition-opacity hover:before:opacity-100">
            {t('footer.home')}
          </a>
          <a href="#projets" className="text-text-soft-light dark:text-text-soft-dark no-underline text-sm hover:text-blue transition-colors relative before:content-[''] before:absolute before:bottom-[-2px] before:left-0 before:w-full before:h-px before:bg-gradient-to-r before:from-transparent before:via-blue before:to-transparent before:opacity-0 before:transition-opacity hover:before:opacity-100">
            {t('footer.projets')}
          </a>
          <a href="#formation" className="text-text-soft-light dark:text-text-soft-dark no-underline text-sm hover:text-blue transition-colors relative before:content-[''] before:absolute before:bottom-[-2px] before:left-0 before:w-full before:h-px before:bg-gradient-to-r before:from-transparent before:via-blue before:to-transparent before:opacity-0 before:transition-opacity hover:before:opacity-100">
            {t('footer.formation')}
          </a>
          <a href="#contact" className="text-text-soft-light dark:text-text-soft-dark no-underline text-sm hover:text-blue transition-colors relative before:content-[''] before:absolute before:bottom-[-2px] before:left-0 before:w-full before:h-px before:bg-gradient-to-r before:from-transparent before:via-blue before:to-transparent before:opacity-0 before:transition-opacity hover:before:opacity-100">
            {t('footer.contact')}
          </a>
        </div>
        <p className="text-muted-light dark:text-muted-dark text-xs">
          {t('footer.copyright')}
        </p>
      </div>
    </footer>
  );
}