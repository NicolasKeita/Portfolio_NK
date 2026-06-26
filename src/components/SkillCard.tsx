import { motion } from 'framer-motion';
import type { Skill } from '../types';

interface SkillCardProps {
  skill: Skill;
  proof: string | undefined;
}

function scrollToProjects(e: React.MouseEvent) {
  e.stopPropagation();
  document.getElementById('projets')?.scrollIntoView({ behavior: 'smooth' });
}

function renderProof(text: string) {
  const parts = text.split(/(Tactic-Nav|Champ Select Winrate|AI Mars Lander)/g);
  return parts.map((part, i) =>
    part === 'Tactic-Nav' ? (
      <button
        key={i}
        onClick={scrollToProjects}
        className="inline underline decoration-dotted underline-offset-2 text-cyan-300 hover:text-cyan-200 hover:decoration-solid transition-all cursor-pointer"
      >
        Tactic-Nav
      </button>
    ) : part === 'Champ Select Winrate' ? (
      <button
        key={i}
        onClick={scrollToProjects}
        className="inline underline decoration-dotted underline-offset-2 text-cyan-300 hover:text-cyan-200 hover:decoration-solid transition-all cursor-pointer"
      >
        Champ Select Winrate
      </button>
    ) : part === 'AI Mars Lander' ? (
      <button
        key={i}
        onClick={scrollToProjects}
        className="inline underline decoration-dotted underline-offset-2 text-cyan-300 hover:text-cyan-200 hover:decoration-solid transition-all cursor-pointer"
      >
        AI Mars Lander
      </button>
    ) : (
      part
    )
  );
}

export function SkillCard({ skill, proof = '' }: SkillCardProps) {
  return (
    <motion.div
      key={skill.id}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className="flex items-center justify-center gap-4"
    >
      <p className="text-sm leading-relaxed text-cyan-300/90 font-medium text-center px-4 py-3 rounded-xl bg-cyan-500/[0.03] border border-cyan-500/10 w-full max-w-3xl">
        &ldquo;{renderProof(proof)}&rdquo;
      </p>
    </motion.div>
  );
}
