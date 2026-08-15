import { SkillButton } from './SkillButton';
import { NebulaConstellation } from '../ui/nebula-constellation';
import type { SkillYaml } from '../../data';
import { css, cx } from '../../../styled-system/css';

type Props = {
  displayedSkillId: string;
  hoveredId: string | null;
  isCenterHovered: boolean;
  setHoveredId: (id: string | null) => void;
  setIsCenterHovered: (value: boolean) => void;
  setDisplayedSkillId: (id: string) => void;
  setShowEngineerDesc: (value: boolean) => void;
  skills: Record<string, SkillYaml>;
  centerLabel: string;
};

const SKILL_POSITIONS: Record<string, { x: number; y: number }> = {
  mobile: { x: -19, y: -32 },
  ai: { x: 0, y: -28 },
  arch: { x: 19, y: -32 },
  algo: { x: 32, y: -13 },
  team: { x: 32, y: 13 },
  rigueur: { x: 13, y: 32 },
  conseil: { x: -13, y: 32 },
  client: { x: -32, y: 13 },
  dev: { x: -32, y: -13 },
};

const styles = {
  frame: css({
    position: 'relative',
    h: '420px',
    overflow: 'visible',
    rounded: '3xl',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(255,255,255,0.03)',
    bg: 'rgba(2,6,23,0.1)',
  }),
  constellation: css({
    position: 'absolute',
    insetX: 0,
    top: '-82px',
    h: '520px',
  }),
  centerWrap: css({
    position: 'absolute',
    left: '50%',
    top: '50%',
    display: 'flex',
    transform: 'translate(-50%, -50%)',
    justifyContent: 'center',
    px: '4',
    zIndex: 10,
  }),
  centerButton: css({
    w: 'clamp(180px, 20vw, 250px)',
    rounded: 'full',
    borderWidth: '1px',
    borderStyle: 'solid',
    px: '6',
    py: '3',
    textAlign: 'center',
    backdropFilter: 'blur(40px)',
    transition: 'all 300ms cubic-bezier(0,0,.2,1)',
  }),
  centerIdle: css({
    borderColor: 'rgba(255,255,255,0.08)',
    bg: 'rgba(2,6,23,0.5)',
    boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
  }),
  centerActive: css({
    borderColor: 'rgba(34,211,238,0.5)',
    bg: 'rgba(2,6,23,0.8)',
    boxShadow: '0 0 40px rgba(34,211,238,0.2)',
    transform: 'scale(1.05)',
  }),
  centerLabel: css({
    fontSize: { base: 'sm', sm: 'md' },
    fontWeight: 'bold',
    letterSpacing: '0.05em',
    color: 'transparent',
    bgClip: 'text',
    bg: 'linear-gradient(90deg, #fff, #e2e8f0, #94a3b8)',
    textTransform: 'uppercase',
  }),
};

export function SkillsMapDiagram({
  displayedSkillId,
  hoveredId,
  isCenterHovered,
  setHoveredId,
  setIsCenterHovered,
  setDisplayedSkillId,
  setShowEngineerDesc,
  skills,
  centerLabel,
}: Props) {
  return (
    <div className={styles.frame}>
      <div className={styles.constellation}>
        <NebulaConstellation
          skillIds={Object.keys(skills)}
          layoutPositions={SKILL_POSITIONS}
          activeId={displayedSkillId}
          hoveredId={hoveredId}
          isCenterHovered={isCenterHovered}
          centerLabel={centerLabel}
        />

        {Object.entries(skills).map(([id, skill]) => (
          <SkillButton
            key={id}
            skillId={id}
            icon={skill.icon}
            label={skill.label}
            hoveredId={hoveredId}
            displayedSkillId={displayedSkillId}
            setHoveredId={setHoveredId}
            setDisplayedSkillId={setDisplayedSkillId}
            setShowEngineerDesc={setShowEngineerDesc}
            position={SKILL_POSITIONS[id] ?? { x: 0, y: 0 }}
          />
        ))}

        <div className={styles.centerWrap}>
          <button
            onMouseEnter={() => {
              setIsCenterHovered(true);
              setShowEngineerDesc(true);
            }}
            onFocus={() => {
              setIsCenterHovered(true);
              setShowEngineerDesc(true);
            }}
            onMouseLeave={() => setIsCenterHovered(false)}
            onBlur={() => setIsCenterHovered(false)}
            className={cx(styles.centerButton, isCenterHovered ? styles.centerActive : styles.centerIdle)}
          >
            <div className={styles.centerLabel}>
              {centerLabel}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
