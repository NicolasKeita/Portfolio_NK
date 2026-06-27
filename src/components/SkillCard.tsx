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

function scrollToFormation(e: React.MouseEvent) {
  e.stopPropagation();
  document.getElementById('formation')?.scrollIntoView({ behavior: 'smooth' });
}

const LINK_MAP: Record<string, (e: React.MouseEvent) => void> = {
  'Tactic-Nav': scrollToProjects,
  'Champ Select Winrate': scrollToProjects,
  'AI Mars Lander': scrollToProjects,
  'Mudlet': scrollToProjects,
  'écoles de coding': scrollToFormation,
};

const LINK_NAMES = Object.keys(LINK_MAP);

function renderProof(text: string) {
  const escaped = LINK_NAMES.map((n) =>
    n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  ).join('|');
  const parts = text.split(new RegExp(`(${escaped})`, 'g'));
  return parts.map((part, i) => {
    const handler = LINK_MAP[part];
    return handler ? (
      <button
        key={i}
        onClick={handler}
        className="inline underline decoration-dotted underline-offset-2 text-cyan-300 hover:text-cyan-200 hover:decoration-solid transition-all cursor-pointer"
      >
        {part}
      </button>
    ) : (
      part
    );
  });
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
