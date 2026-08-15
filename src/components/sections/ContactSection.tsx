import { motion } from 'framer-motion';
import { SvgIcon } from '../shared/SvgSprite';
import { useLanguage } from '../../context/LanguageContext';
import { getContactItems } from '../../data';
import { MagicCard } from '../ui/MagicCard';
import { sectionStyles } from './sectionStyles';
import { css } from '../../../styled-system/css';

const styles = {
  panel: css({
    maxW: '1100px',
    mx: 'auto',
    p: { base: '6', sm: '8' },
  }),
  grid: css({
    display: 'grid',
    gridTemplateColumns: { base: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
    gap: '16',
    alignItems: 'start',
  }),
  title: css({
    fontFamily: 'display',
    fontWeight: 'semibold',
    color: 'white',
    letterSpacing: '-0.025em',
    lineHeight: 'tight',
    mb: '3.5',
    fontSize: 'clamp(1.4rem, 2.8vw, 2rem)',
  }),
  intro: css({
    fontSize: 'sm',
    color: 'slate.400',
    lineHeight: 'relaxed',
  }),
  list: css({
    listStyle: 'none',
    display: 'grid',
    gridTemplateColumns: { base: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
    gap: '3.5',
    m: 0,
    p: 0,
  }),
  item: css({
    display: 'flex',
    alignItems: 'flex-start',
    gap: '3',
  }),
  iconBox: css({
    w: '34px',
    h: '34px',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    rounded: 'lg',
    bg: 'rgba(34, 211, 238, 0.1)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(103,232,249,0.2)',
    color: 'cyan.300',
    transition: 'background-color 200ms ease, border-color 200ms ease',
    _hover: {
      bg: 'rgba(34, 211, 238, 0.2)',
      borderColor: 'rgba(103,232,249,0.4)',
    },
  }),
  icon: css({
    w: '17px',
    h: '17px',
    stroke: 'currentColor',
    fill: 'none',
    strokeWidth: '1.75',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    display: 'block',
  }),
  label: css({
    fontSize: 'xs',
    fontWeight: 'medium',
    color: 'slate.500',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    mb: '0.5',
  }),
  value: css({
    fontSize: 'sm',
    fontWeight: 'medium',
    color: 'white',
    textDecoration: 'none',
    _hover: {
      color: 'cyan.300',
      textDecoration: 'underline',
    },
  }),
  subValue: css({
    fontWeight: 'normal',
    color: 'slate.500',
    fontSize: 'xs',
  }),
};

export function ContactSection() {
  const { lang, t } = useLanguage();
  const items = getContactItems(lang as 'fr' | 'en');
  const entries = Object.entries(items);

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  };

  return (
    <section id="contact" className={sectionStyles.compactSection}>
      <MagicCard asPanel className={styles.panel}>
        <div className={styles.grid}>
          <div>
            <p className={sectionStyles.eyebrow}>{t('contact.title')}</p>
            <h2 className={styles.title}>
              {t('contact.tagline')}
            </h2>
            <p className={styles.intro}>
              {t('contact.sub1')}<br />
              {t('contact.sub2')}
            </p>
          </div>
          <ul className={styles.list}>
            {entries.map(([key, item]) => (
              <motion.li
                key={key}
                className={styles.item}
                variants={iconVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                whileHover={{ x: 3 }}
              >
                <div className={styles.iconBox}>
                  <SvgIcon
                    id={item.icon}
                    className={styles.icon}
                  />
                </div>
                <div>
                  <div className={styles.label}>
                    {item.label}
                  </div>
                  {item.href ? (
                    <a href={item.href} className={styles.value}>
                      {item.value}
                    </a>
                  ) : (
                    <span className={styles.value}>
                      {item.value}
                      {item.sub && (
                        <><br /><span className={styles.subValue}>{item.sub}</span></>
                      )}
                    </span>
                  )}
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </MagicCard>
    </section>
  );
}
