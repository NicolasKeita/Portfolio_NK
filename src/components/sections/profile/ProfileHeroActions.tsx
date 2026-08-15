import { motion } from 'framer-motion';
import { fadeSlideUp } from './profileSection.motion';
import { profileStyles as styles } from './profileSection.styles';

interface ProfileHeroActionsProps {
  workLabel: string;
  contactLabel: string;
}

export function ProfileHeroActions({
  workLabel,
  contactLabel,
}: ProfileHeroActionsProps) {
  return (
    <motion.div className={styles.actions} {...fadeSlideUp(0.3)}>
      <a
        href="#projets"
        className={styles.primaryCta}
      >
        {workLabel}
      </a>
      <a
        href="#contact"
        className={styles.secondaryCta}
      >
        {contactLabel}
      </a>
    </motion.div>
  );
}
