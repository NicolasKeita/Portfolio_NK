import { motion, AnimatePresence } from 'framer-motion';
import { SkillCard, CARD_CLASS } from './SkillCard';
import { css } from '../../../styled-system/css';

type Props = {
  activeSkillId: string;
  proof: (id: string) => string | undefined;
  engineerDescription: string;
  showEngineerDesc: boolean;
};

const styles = {
  panel: css({
    position: 'relative',
    mx: 'auto',
    maxW: '4xl',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(255,255,255,0.05)',
    bg: 'rgba(15,23,42,0.2)',
    backdropFilter: 'blur(24px)',
    rounded: '2xl',
    p: '4',
    overflow: 'hidden',
    boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
  }),
  glow: css({
    pointerEvents: 'none',
    position: 'absolute',
    inset: 0,
    bg: 'linear-gradient(90deg, rgba(34,211,238,0.04), transparent 40%, rgba(167,139,250,0.03))',
  }),
  content: css({
    position: 'relative',
    w: 'full',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4',
  }),
};

export function SkillsMapDetail({
  activeSkillId,
  proof,
  engineerDescription,
  showEngineerDesc,
}: Props) {
  return (
    <div className={styles.panel}>
      <div className={styles.glow} />

      <AnimatePresence mode="wait">
        {showEngineerDesc ? (
          <motion.div
            key="engineer-description"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={styles.content}
          >
            <p className={CARD_CLASS}>
              {engineerDescription}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key={activeSkillId}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={styles.content}
          >
            <SkillCard proof={proof(activeSkillId) ?? ''} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
