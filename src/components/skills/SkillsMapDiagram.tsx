import { SkillButton } from './SkillButton';
import { NebulaConstellation } from '../ui/nebula-constellation';
import type { SkillYaml } from '../../data';

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
    <div className="relative h-[420px] overflow-visible rounded-3xl border border-white/[0.03] bg-slate-950/10">
      <div className="absolute inset-x-0 top-[-82px] h-[520px]">
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

        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 justify-center px-4 z-10">
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
            className={[
              'w-[clamp(180px,20vw,250px)] rounded-full border px-6 py-3 text-center',
              'backdrop-blur-2xl transition-all duration-300 ease-out',
              isCenterHovered
                ? 'border-cyan-400/50 bg-slate-950/80 shadow-[0_0_40px_rgba(34,211,238,0.2)] scale-105'
                : 'border-white/[0.08] bg-slate-950/50 shadow-[0_10px_40px_rgba(0,0,0,0.5)]',
            ].join(' ')}
          >
            <div
              className={[
                'text-sm font-bold tracking-wider',
                'text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400',
                'uppercase sm:text-base',
              ].join(' ')}
            >
              {centerLabel}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
