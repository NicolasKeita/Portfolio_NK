import { motion } from 'framer-motion';
import { fadeSlideUp } from './profileSection.motion';
import { profileStyles as styles } from './profileSection.styles';

interface ProfileHeroIntroProps {
  role: string;
  statement: string;
  goal: string;
}

export function ProfileHeroIntro({
  role,
  statement,
  goal,
}: ProfileHeroIntroProps) {
  return (
    <>
      <motion.span
        className={styles.role}
        style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
        {...fadeSlideUp(0.1)}
      >
        {role}
      </motion.span>
      <motion.p
        className={styles.tagline}
        {...fadeSlideUp(0.2)}
      >
        <strong className={styles.taglineStatement}>{statement}</strong>{' '}
        <span className={styles.taglineSeparator} aria-hidden="true">|</span>{' '}
        <span className={styles.taglineGoal}>{goal}</span>
      </motion.p>
    </>
  );
}
