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
      <motion.div
        className={styles.tagline}
        {...fadeSlideUp(0.2)}
      >
        <p className={styles.taglineStatement}>{statement}</p>
        <p className={styles.taglineGoal}>{goal}</p>
      </motion.div>
    </>
  );
}
