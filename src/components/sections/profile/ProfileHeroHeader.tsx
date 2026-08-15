import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeSlideUp, portraitPopIn } from './profileSection.motion';
import { profileStyles as styles } from './profileSection.styles';

export function ProfileHeroHeader() {
  return (
    <div className={styles.header}>
      <motion.h1
        className={styles.title}
        {...fadeSlideUp(0)}
      >
        Nicolas<br />Keita
      </motion.h1>
      <motion.div
        className={styles.portraitWrap}
        {...portraitPopIn}
      >
        <div className={styles.portraitFrame}>
          <Image
            src="/photo-profil.jpg"
            alt="Nicolas Keita"
            fill
            priority
            sizes="(min-width: 640px) 170px, 140px"
            className={styles.portraitImage}
          />
        </div>
      </motion.div>
    </div>
  );
}
