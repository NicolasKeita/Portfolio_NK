import { motion } from 'framer-motion';
import { SvgIcon } from './SvgSprite';
import type { Skill } from '../types';

interface SkillCardProps {
  skill: Skill;
  label: string | undefined;
  proof: string | undefined;
}

function scrollToProjects(e: React.MouseEvent) {
  e.stopPropagation();
  document.getElementById('projets')?.scrollIntoView({ behavior: 'smooth' });
}

function renderProof(text: string) {
  const parts = text.split(/(Tactic-Nav)/g);
  return parts.map((part, i) =>
    part === 'Tactic-Nav' ? (
      <button
        key={i}
        onClick={scrollToProjects}
        className="inline underline decoration-dotted underline-offset-2 text-cyan-300 hover:text-cyan-200 hover:decoration-solid transition-all cursor-pointer"
      >
        Tactic-Nav
      </button>
    ) : (
      part
    )
  );
}

export function SkillCard({ skill, label = '', proof = '' }: SkillCardProps) {
  return (
    <motion.div
      key={skill.id}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
    >
      <div className="flex items-center gap-3 shrink-0">
        <div className="p-2 rounded-xl bg-cyan-500/5 border border-cyan-500/10 shadow-[0_0_15px_rgba(34,211,238,0.08)]">
          <SvgIcon
            id={skill.icon}
            className="w-4.5 h-4.5 stroke-[1.8] fill-none stroke-cyan-400"
          />
        </div>
        <h4 className="text-sm font-semibold tracking-wide text-white">
          {label}
        </h4>
      </div>

      <p className="text-xs leading-relaxed text-slate-400 italic px-4 py-2.5 rounded-xl bg-white/[0.01] border border-white/[0.03] w-full sm:max-w-2xl">
        &ldquo;{renderProof(proof)}&rdquo;
      </p>
    </motion.div>
  );
}
