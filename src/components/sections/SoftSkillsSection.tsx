import { useLanguage } from '../../context/LanguageContext';
import { getSoftSkills } from '../../data';
import { MagicCard } from '../ui/MagicCard';
import { sectionStyles } from './sectionStyles';
import { css } from '../../../styled-system/css';

const styles = {
  grid: css({
    display: 'grid',
    gridTemplateColumns: { base: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(3, minmax(0, 1fr))' },
    gap: '4',
    listStyle: 'none',
  }),
  card: css({
    height: 'full',
    p: { base: '5', md: '6' },
  }),
  title: css({
    fontFamily: 'display',
    fontWeight: 'semibold',
    fontSize: 'lg',
    color: 'white',
    mb: '2',
  }),
  description: css({
    fontSize: 'md',
    color: 'slate.300',
    lineHeight: 'relaxed',
  }),
};

export function SoftSkillsSection() {
  const { lang, t } = useLanguage();

  return (
    <section id="savoir-etre" aria-labelledby="savoir-etre-title" className={sectionStyles.section}>
      <div className={sectionStyles.inner}>
        <h2 id="savoir-etre-title" className={sectionStyles.title}>{t('softSkills.title')}</h2>
        <ul className={styles.grid}>
          {getSoftSkills(lang).map(({ id, title, description }) => (
            <li key={id}>
              <MagicCard asPanel className={styles.card}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
              </MagicCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
