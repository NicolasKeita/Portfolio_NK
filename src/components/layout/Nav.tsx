import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { css } from '../../../styled-system/css';

const styles = {
  nav: css({
    position: 'sticky',
    top: 0,
    zIndex: 50,
    bg: 'rgba(5, 8, 22, 0.78)',
    backdropFilter: 'blur(40px)',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
  }),
  inner: css({
    maxW: '1100px',
    mx: 'auto',
    px: '8',
    h: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }),
  logo: css({
    fontFamily: 'display',
    fontWeight: 'bold',
    fontSize: 'md',
    color: 'white',
    textDecoration: 'none',
    letterSpacing: '-0.025em',
  }),
  logoDot: css({
    color: 'amber',
  }),
  controls: css({
    display: 'flex',
    alignItems: 'center',
    gap: '6',
  }),
  links: css({
    display: 'flex',
    gap: '6',
    listStyle: 'none',
    m: 0,
    p: 0,
  }),
  link: css({
    fontSize: 'sm',
    fontWeight: 'medium',
    color: 'slate.400',
    textDecoration: 'none',
    transition: 'color 150ms ease',
    _hover: {
      color: 'white',
    },
  }),
  langButton: css({
    w: '38px',
    h: '34px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(255,255,255,0.1)',
    rounded: 'md',
    bg: 'rgba(255,255,255,0.04)',
    color: 'white',
    cursor: 'pointer',
    fontFamily: 'mono',
    fontSize: 'xs',
    fontWeight: 'bold',
    letterSpacing: '0.05em',
    transition: 'all 150ms ease',
    _hover: {
      borderColor: 'rgba(34,211,238,0.5)',
      bg: 'rgba(34,211,238,0.1)',
      transform: 'scale(1.05)',
    },
  }),
};

export function Nav() {
  const { lang, setLang, t } = useLanguage();

  const toggleLang = () => {
    setLang(lang === 'fr' ? 'en' : 'fr');
  };

  return (
    <motion.nav
      className={styles.nav}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className={styles.inner}>
        <a className={styles.logo} href="#hero">
          NK<span className={styles.logoDot}>.</span>
        </a>
        <div className={styles.controls}>
          <ul className={`nav-links ${styles.links}`}>
            <li>
              <a
                className={styles.link}
                href="#formation"
              >
                {t('nav.formation')}
              </a>
            </li>
            <li>
              <a
                className={styles.link}
                href="#projets"
              >
                {t('nav.projets')}
              </a>
            </li>
            <li>
              <a
                className={styles.link}
                href="#contact"
              >
                {t('nav.contact')}
              </a>
            </li>
          </ul>
          <button
            className={styles.langButton}
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
