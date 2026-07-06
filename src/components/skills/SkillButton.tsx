import { clsx } from 'clsx';
import { SvgIcon } from '../shared/SvgSprite';

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
      className={clsx(
        'group absolute flex items-center gap-2 -translate-x-1/2 -translate-y-1/2',
        'rounded-full border px-3.5 py-1.5 whitespace-nowrap backdrop-blur-md',
        'transition-all duration-300 ease-out select-none',
        isActive
          ? 'border-cyan-400/50 bg-cyan-950/20 text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.25)] scale-105 z-20'
          : 'border-white/[0.06] bg-slate-900/30 text-slate-300 hover:border-cyan-400/30 hover:bg-slate-900/50 hover:scale-105 z-10'
      )}
    >
      <span
        className={clsx(
          'h-1.5 w-1.5 rounded-full transition-all duration-300',
          isActive ? 'bg-cyan-400 scale-100' : 'bg-transparent scale-0'
        )}
      />

      <SvgIcon
        id={icon}
        className={clsx(
          'h-4 w-4 fill-none stroke-[1.8] transition-colors sm:h-4.5 sm:w-4.5',
          isActive ? 'stroke-cyan-300' : 'stroke-slate-400 group-hover:stroke-cyan-300'
        )}
      />
      <span className="text-[11px] font-medium tracking-wide sm:text-xs">
        {label}
      </span>
    </button>
  );
}