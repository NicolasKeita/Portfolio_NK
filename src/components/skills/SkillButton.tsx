import { SvgIcon } from '../shared/SvgSprite';
import { css, cx } from '../../../styled-system/css';

type Props = {
  skillId: string;
  icon: string;
  label: string;
  hoveredId: string | null;
  displayedSkillId: string;
  setHoveredId: (id: string | null) => void;
  setDisplayedSkillId: (id: string) => void;
  setShowEngineerDesc: (v: boolean) => void;
  position: { x: number; y: number };
};

const styles = {
  button: css({
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    gap: '2',
    transform: 'translate(-50%, -50%)',
    rounded: 'full',
    borderWidth: '1px',
    borderStyle: 'solid',
    px: '3.5',
    py: '1.5',
    whiteSpace: 'nowrap',
    backdropFilter: 'blur(12px)',
    transition: 'all 300ms cubic-bezier(0,0,.2,1)',
    userSelect: 'none',
  }),
  activeButton: css({
    borderColor: 'rgba(34,211,238,0.5)',
    bg: 'rgba(8, 51, 68, 0.2)',
    color: 'cyan.200',
    boxShadow: '0 0 20px rgba(34,211,238,0.25)',
    transform: 'translate(-50%, -50%) scale(1.05)',
    zIndex: 20,
  }),
  inactiveButton: css({
    borderColor: 'rgba(255,255,255,0.06)',
    bg: 'rgba(15,23,42,0.3)',
    color: 'slate.300',
    zIndex: 10,
    _hover: {
      borderColor: 'rgba(34,211,238,0.3)',
      bg: 'rgba(15,23,42,0.5)',
      transform: 'translate(-50%, -50%) scale(1.05)',
    },
  }),
  dot: css({
    h: '1.5',
    w: '1.5',
    rounded: 'full',
    transition: 'all 300ms ease',
  }),
  activeDot: css({
    bg: 'cyan.400',
    transform: 'scale(1)',
  }),
  inactiveDot: css({
    bg: 'transparent',
    transform: 'scale(0)',
  }),
  icon: css({
    h: { base: '4', sm: '4.5' },
    w: { base: '4', sm: '4.5' },
    fill: 'none',
    strokeWidth: '1.8',
    transition: 'stroke 150ms ease',
  }),
  activeIcon: css({
    stroke: 'cyan.300',
  }),
  inactiveIcon: css({
    stroke: 'slate.400',
    _groupHover: {
      stroke: 'cyan.300',
    },
  }),
  label: css({
    fontSize: { base: '11px', sm: 'xs' },
    fontWeight: 'medium',
    letterSpacing: '0.025em',
  }),
};

export function SkillButton({
  skillId,
  icon,
  label,
  hoveredId,
  displayedSkillId,
  setHoveredId,
  setDisplayedSkillId,
  setShowEngineerDesc,
  position,
}: Props) {
  const isActive = hoveredId === skillId || displayedSkillId === skillId;

  return (
    <button
      style={{ left: `${50 + position.x}%`, top: `${50 + position.y}%` }}
      onClick={() => {
        setHoveredId(skillId);
        setDisplayedSkillId(skillId);
        setShowEngineerDesc(false);
      }}
      onMouseEnter={() => {
        setHoveredId(skillId);
        setDisplayedSkillId(skillId);
        setShowEngineerDesc(false);
      }}
      onFocus={() => {
        setHoveredId(skillId);
        setDisplayedSkillId(skillId);
        setShowEngineerDesc(false);
      }}
      onMouseLeave={() => setHoveredId(null)}
      onBlur={() => setHoveredId(null)}
      className={cx('group', styles.button, isActive ? styles.activeButton : styles.inactiveButton)}
    >
      <span
        className={cx(styles.dot, isActive ? styles.activeDot : styles.inactiveDot)}
      />

      <SvgIcon
        id={icon}
        className={cx(styles.icon, isActive ? styles.activeIcon : styles.inactiveIcon)}
      />
      <span className={styles.label}>
        {label}
      </span>
    </button>
  );
}
