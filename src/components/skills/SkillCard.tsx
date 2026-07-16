interface SkillCardProps {
  proof: string;
  className?: string;
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
  'OpenAI Gym': scrollToProjects,
  'Mudlet': scrollToProjects,
  'écoles de coding': scrollToFormation,
};

const LINK_NAMES = Object.keys(LINK_MAP);
const ESCAPED_NAMES = LINK_NAMES.map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
const PROOF_REGEX = new RegExp(`(${ESCAPED_NAMES})`, 'g');

function renderProof(text: string) {
  if (!text) return '';
  const parts = text.split(PROOF_REGEX);

  return parts.map((part, i) => {
    const handler = LINK_MAP[part];
    return handler ? (
      <button
        key={i}
        onClick={handler}
        className={[
          'inline align-baseline underline decoration-dotted underline-offset-2',
          'text-cyan-300 hover:text-cyan-200 hover:decoration-solid transition-all cursor-pointer',
        ].join(' ')}
      >
        {part}
      </button>
    ) : (
      part
    );
  });
}

export const CARD_CLASS =
  [
    'text-sm leading-relaxed text-cyan-300/90 font-medium text-center',
    'px-4 py-3 rounded-xl bg-cyan-500/[0.03] border border-cyan-500/10',
    'w-full max-w-3xl mx-auto',
  ].join(' ');

export function SkillCard({ proof = '', className = '' }: SkillCardProps) {
  return (
    <p className={`${CARD_CLASS} ${className}`}>
      {renderProof(proof)}
    </p>
  );
}
