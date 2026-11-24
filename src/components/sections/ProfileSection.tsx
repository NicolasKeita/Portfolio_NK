import { useLanguage } from '../../context/LanguageContext';
import { ProfileHeroActions } from './profile/ProfileHeroActions';
import { ProfileHeroHeader } from './profile/ProfileHeroHeader';
import { ProfileHeroIntro } from './profile/ProfileHeroIntro';
import { profileStyles as styles } from './profile/profileSection.styles';

export function ProfileSection() {
  const { t } = useLanguage();

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.stack}>
            <ProfileHeroHeader />
            <ProfileHeroIntro
              role={t('hero.role')}
              statement={t('hero.tagline.statement')}
              goal={t('hero.tagline.goal')}
            />
            <ProfileHeroActions
              workLabel={t('hero.cta.work')}
              cvLabel={t('hero.cta.cv')}
              contactLabel={t('hero.cta.contact')}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
