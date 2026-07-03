import { motion, AnimatePresence } from 'framer-motion';
import { SkillCard } from './SkillCard';
import type { Skill } from '../types';

type Props = {
  activeSkill: Skill;
  proof: (skill: Skill) => string | undefined;
  engineerDescription: string;
  showEngineerDesc: boolean;
};

export function SkillsMapDetail({
  activeSkill,
  proof,
  engineerDescription,
  showEngineerDesc,
}: Props) {
  return (
    <div className="relative mx-auto max-w-4xl border border-white/[0.05] bg-slate-900/20 backdrop-blur-xl rounded-2xl p-4 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(34,211,238,0.04),transparent_40%,rgba(167,139,250,0.03))]" />

      <AnimatePresence mode="wait">
        {showEngineerDesc ? (
          <motion.div
            key="engineer-description"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="relative w-full flex items-center justify-center gap-4"
          >
            <p className="text-sm leading-relaxed text-cyan-300/90 font-medium text-center px-4 py-3 rounded-xl bg-cyan-500/[0.03] border border-cyan-500/10 w-full max-w-3xl mx-auto">
              &ldquo;{engineerDescription}&rdquo;
            </p>
          </motion.div>
        ) : (
          <motion.div
            key={activeSkill.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="relative w-full flex items-center justify-center gap-4"
          >
            <SkillCard skill={activeSkill} proof={proof(activeSkill)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
