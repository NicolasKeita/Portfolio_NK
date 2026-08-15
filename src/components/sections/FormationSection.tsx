import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { getFormations } from '../../data';
import { MagicCard } from '../ui/MagicCard';
import { sectionStyles } from './sectionStyles';
import { css } from '../../../styled-system/css';

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const styles = {
  title: css({
    fontFamily: 'display',
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: '-0.025em',
    lineHeight: 'tight',
    mb: 0,
    filter: 'drop-shadow(0 0 28px rgba(167,139,250,0.12))',
    fontSize: 'clamp(1.8rem, 4vw, 2.75rem)',
  }),
  panel: css({
    listStyle: 'none',
    mt: '8',
    px: { base: '5', sm: '7' },
  }),
  item: css({
    py: '7',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'rgba(255,255,255,0.1)',
    _last: {
      borderBottomWidth: 0,
    },
  }),
  itemTitle: css({
    fontFamily: 'display',
    fontWeight: 'semibold',
    fontSize: 'lg',
    color: 'white',
    mb: '1',
  }),
  itemOrg: css({
    fontSize: 'sm',
    color: 'rgba(165, 243, 252, 0.8)',
    mb: '2',
  }),
  itemDescription: css({
    fontSize: 'sm',
    color: 'slate.400',
    lineHeight: 'relaxed',
  }),
};

export function FormationSection() {
  const { lang, t } = useLanguage();
  const formations = getFormations(lang as 'fr' | 'en');

  return (
    <section id="formation" className={sectionStyles.section}>
      <div className={sectionStyles.inner}>
        <p className={sectionStyles.eyebrow}>{t('formation.label')}</p>
        <h2 className={styles.title}>
          {t('formation.title')}
        </h2>
        <MagicCard asPanel className={styles.panel}>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {formations.map((f, i) => (
              <motion.div
                key={f.id ?? i}
                variants={itemVariant}
                className={styles.item}
              >
                <div className={styles.itemTitle}>
                  {f.title}
                </div>
                <div className={styles.itemOrg}>
                  {f.org}
                </div>
                <div className={styles.itemDescription}>
                  {f.desc}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </MagicCard>
      </div>
    </section>
  );
}
