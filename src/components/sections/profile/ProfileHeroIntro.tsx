import { motion } from 'framer-motion';
import { fadeSlideUp } from './profileSection.motion';
import { profileStyles as styles } from './profileSection.styles';

interface ProfileHeroIntroProps {
  role: string;
  tagline: string;
}

export function ProfileHeroIntro({
  role,
  tagline,
}: ProfileHeroIntroProps) {
  return (
    <>
      <motion.span
        className={styles.role}
        style={{ display: 'inline-block', fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
        {...fadeSlideUp(0.1)}
      >
        {role}
      </motion.span>
      <motion.p
        className={styles.tagline}
        {...fadeSlideUp(0.2)}
      >
        {tagline}
      </motion.p>
    </>
  );
}
