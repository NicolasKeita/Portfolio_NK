import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SkillCard } from './SkillCard';
import { SvgIcon } from './SvgSprite';
import { useLanguage } from '../context/LanguageContext';
import { skillsMap, engineerBadge } from '../data/portfolio';
import { NebulaConstellation } from './ui/nebula-constellation';

const SKILL_POSITIONS: Record<string, { x: number; y: number }> = {
  dev: { x: -29, y: -24 },
  mobile: { x: -11, y: -31 },
  linux: { x: 12, y: -30 },
  arch: { x: 30, y: -21 },
  automation: { x: -37, y: -2 },
  deploy: { x: -30, y: 13 },
  algo: { x: 29, y: 7 },
  data: { x: 38, y: -5 },
  client: { x: -28, y: 29 },
  conseil: { x: -7, y: 34 },
  rigueur: { x: 14, y: 31 },
  team: { x: 32, y: 25 },
};

export function SkillsMap() {
  const { lang } = useLanguage();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isCenterHovered, setIsCenterHovered] = useState(false);
  const [showEngineerDesc, setShowEngineerDesc] = useState(true);
  const [activeSkill, setActiveSkill] = useState(skillsMap[0]);

  const t = (obj: { fr: string; en: string }) => (lang === 'en' ? obj.en : obj.fr);
  const label = (s: typeof skillsMap[number]) =>
    lang === 'en' && s.labelEn ? s.labelEn : s.label;
  const proof = (s: typeof skillsMap[number]) =>
    lang === 'en' ? s.proofEn : s.proof;

  const renderSkillButton = (skill: typeof skillsMap[number]) => {
    const isActive = hoveredId === skill.id || activeSkill.id === skill.id;
    const position = SKILL_POSITIONS[skill.id] ?? { x: 0, y: 0 };

    return (
      <button
        key={skill.id}
        style={{ left: `${50 + position.x}%`, top: `${50 + position.y}%` }}
        onClick={() => {
          setHoveredId(skill.id);
          setActiveSkill(skill);
          setShowEngineerDesc(false);
        }}
        onMouseEnter={() => {
          setHoveredId(skill.id);
          setActiveSkill(skill);
          setShowEngineerDesc(false);
        }}
        onFocus={() => {
          setHoveredId(skill.id);
          setActiveSkill(skill);
          setShowEngineerDesc(false);
        }}
        onMouseLeave={() => setHoveredId(null)}
        onBlur={() => setHoveredId(null)}
        className={
          'group absolute flex items-center gap-2 -translate-x-1/2 -translate-y-1/2 ' +
          'rounded-full border px-3.5 py-1.5 whitespace-nowrap backdrop-blur-md ' +
          'transition-all duration-300 ease-out select-none ' +
          (isActive
            ? 'border-cyan-400/50 bg-cyan-950/20 text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.25)] scale-105 z-20'
            : 'border-white/[0.06] bg-slate-900/30 text-slate-300 hover:border-cyan-400/30 hover:bg-slate-900/50 hover:scale-105 z-10')
        }
      >
        <span className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
          isActive ? 'bg-cyan-400 animate-pulse scale-100' : 'bg-transparent scale-0'
        }`} />

        <SvgIcon
          id={skill.icon}
          className={`h-4 w-4 fill-none stroke-[1.8] transition-colors sm:h-4.5 sm:w-4.5 ${
            isActive ? 'stroke-cyan-300' : 'stroke-slate-400 group-hover:stroke-cyan-300'
          }`}
        />
        <span className="text-[11px] font-medium tracking-wide sm:text-xs">
          {label(skill)}
        </span>
      </button>
    );
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 pt-4 pb-4 space-y-6">
      <div
        className={[
          'pointer-events-none absolute inset-x-[-12%] top-[-12%] h-[500px] rounded-full',
          'bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.1),rgba(59,130,246,0.03)_40%,transparent_70%)]',
          'blur-3xl',
        ].join(' ')}
      />

      <div className="relative h-[420px] overflow-visible rounded-3xl border border-white/[0.03] bg-slate-950/10">
        
        <div className="absolute inset-x-0 top-[-82px] h-[520px]">
          
          <div className="pointer-events-none absolute inset-0 z-0">
            <NebulaConstellation
              skills={skillsMap}
              layoutPositions={SKILL_POSITIONS}
              activeId={activeSkill?.id ?? null}
              hoveredId={hoveredId}
              onSelect={setActiveSkill}
              onHover={setHoveredId}
              isCenterHovered={isCenterHovered}
              onCenterHover={setIsCenterHovered}
              centerLabel={t(engineerBadge.engineer)}
            />
          </div>

          <div className="relative z-10 h-[520px]">
            {skillsMap.map(renderSkillButton)}
            
            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 justify-center px-4">
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
                className={`w-[clamp(180px,20vw,250px)] rounded-full border px-6 py-3 text-center backdrop-blur-2xl transition-all duration-300 ease-out ${
                  isCenterHovered
                    ? 'border-cyan-400/50 bg-slate-950/80 shadow-[0_0_40px_rgba(34,211,238,0.2)] scale-105'
                    : 'border-white/[0.08] bg-slate-950/50 shadow-[0_10px_40px_rgba(0,0,0,0.5)]'
                }`}
              >
                <div className="text-sm font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 uppercase sm:text-base">
                  {t(engineerBadge.engineer)}
                </div>
              </button>
            </div>

          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-4xl border border-white/[0.05] bg-slate-900/20 backdrop-blur-xl rounded-2xl p-4 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(34,211,238,0.04),transparent_40%,rgba(167,139,250,0.03))]" />
        <div className="relative w-full">
          <AnimatePresence mode="wait">
            {showEngineerDesc || !activeSkill ? (
              <motion.div
                key="engineer-description"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className="flex items-center justify-center gap-4"
              >
                <p className="text-sm leading-relaxed text-cyan-300/90 font-medium text-center px-4 py-3 rounded-xl bg-cyan-500/[0.03] border border-cyan-500/10 w-full max-w-3xl">
                  &ldquo;{t(engineerBadge.engineerDescription)}&rdquo;
                </p>
              </motion.div>
            ) : (
              <SkillCard
                skill={activeSkill}
                proof={proof(activeSkill)}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}