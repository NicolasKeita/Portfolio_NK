import { css, cx } from '../../../styled-system/css';

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
        className={styles.proofLink}
      >
        {part}
      </button>
    ) : (
      part
    );
  });
}

const styles = {
  proofLink: css({
    display: 'inline',
    verticalAlign: 'baseline',
    textDecoration: 'underline',
    textDecorationStyle: 'dotted',
    textUnderlineOffset: '2px',
    color: 'cyan.300',
    transition: 'all 150ms ease',
    cursor: 'pointer',
    _hover: {
      color: 'cyan.200',
      textDecorationStyle: 'solid',
    },
  }),
};

export const CARD_CLASS = css({
  fontSize: 'sm',
  lineHeight: 'relaxed',
  color: 'rgba(103,232,249,0.9)',
  fontWeight: 'medium',
  textAlign: 'center',
  px: '4',
  py: '3',
  rounded: 'xl',
  bg: 'rgba(6,182,212,0.03)',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'rgba(6,182,212,0.1)',
  w: 'full',
  maxW: '3xl',
  mx: 'auto',
});

export function SkillCard({ proof = '', className = '' }: SkillCardProps) {
  return (
    <p className={cx(CARD_CLASS, className)}>
      {renderProof(proof)}
    </p>
  );
}
