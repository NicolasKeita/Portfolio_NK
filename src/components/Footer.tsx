import { useLanguage } from '../context/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer>
      <div className="footer-content">
        <div className="footer-nav">
          <a href="#hero">{t('footer.home')}</a>
          <a href="#projets">{t('footer.projets')}</a>
          <a href="#formation">{t('footer.formation')}</a>
          <a href="#contact">{t('footer.contact')}</a>
        </div>
        <p className="footer-copyright">
          {t('footer.copyright')}
        </p>
      </div>
    </footer>
  );
}
