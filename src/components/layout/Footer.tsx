import { useLanguage } from '../../context/LanguageContext';
import { css } from '../../../styled-system/css';

const styles = {
  footer: css({
    position: 'relative',
    bg: 'rgba(5, 8, 22, 0.72)',
    backdropFilter: 'blur(24px)',
    color: 'slate.400',
    textAlign: 'center',
    py: '12',
    px: '8',
  }),
  inner: css({
    maxW: '1100px',
    mx: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6',
  }),
  links: css({
    display: 'flex',
    gap: '6',
    flexWrap: 'wrap',
    justifyContent: 'center',
  }),
  link: css({
    color: 'slate.400',
    textDecoration: 'none',
    fontSize: 'sm',
    position: 'relative',
    transition: 'color 150ms ease',
    _before: {
      content: '""',
      position: 'absolute',
      bottom: '-2px',
      left: 0,
      w: 'full',
      h: '1px',
      bg: 'linear-gradient(90deg, transparent, #67e8f9, transparent)',
      opacity: 0,
      transition: 'opacity 150ms ease',
    },
    _hover: {
      color: 'cyan.300',
      _before: {
        opacity: 1,
      },
    },
  }),
  copyright: css({
    color: 'slate.500',
    fontSize: 'xs',
  }),
};

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.links}>
          <a href="#hero" className={styles.link}>
            {t('footer.home')}
          </a>
          <a href="#projets" className={styles.link}>
            {t('footer.projets')}
          </a>
          <a href="#formation" className={styles.link}>
            {t('footer.formation')}
          </a>
          <a href="#contact" className={styles.link}>
            {t('footer.contact')}
          </a>
        </div>
        <p className={styles.copyright}>
          {t('footer.copyright')}
        </p>
      </div>
    </footer>
  );
}
