import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SvgIcon } from './SvgSprite';
import { useLanguage } from '../context/LanguageContext';
import { skillsMap } from '../data/portfolio';
import { NebulaConstellation } from './ui/nebula-constellation';

const LOCALE = {
  analyse: { fr: 'Core Analytique', en: 'Analytical Core' },
  survole: { fr: 'Survole une compétence pour voir sa preuve.', en: 'Hover a skill to see its proof.' },
  enCours: { fr: 'En cours de déploiement…', en: 'Deployment in progress…' },
  specialist: { fr: 'Spécialité principale', en: 'Lead specialty' },
  engineer: { fr: 'Ingénieur Logiciel', en: 'Software Engineer' },
  methods: { fr: 'Méthodologies :', en: 'Methodologies :' },
} as const;

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
  return <SkillsMapPreview />;
}

function SkillsMapPreview() {
  const { lang } = useLanguage();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isCenterHovered, setIsCenterHovered] = useState(false);
  const [activeSkill, setActiveSkill] = useState(skillsMap[0]);

  const t = (obj: { fr: string; en: string }) => (lang === 'en' ? obj.en : obj.fr);
  const label = (s: typeof skillsMap[number]) =>
    lang === 'en' && s.labelEn ? s.labelEn : s.label;
  const proof = (s: typeof skillsMap[number]) =>
    lang === 'en' ? s.proofEn : s.proof;

  const anyHighlight = hoveredId !== null || isCenterHovered;

  const renderSkillButton = (skill: typeof skillsMap[number]) => {
    const isActive = hoveredId === skill.id || activeSkill.id === skill.id;
    const position = SKILL_POSITIONS[skill.id] ?? { x: 0, y: 0 };

    return (
      <button
        key={skill.id}
        style={{ left: `${50 + position.x}%`, top: `${50 + position.y}%` }}
        onMouseEnter={() => {
          setHoveredId(skill.id);
          setActiveSkill(skill);
        }}
        onFocus={() => {
          setHoveredId(skill.id);
          setActiveSkill(skill);
        }}
        onMouseLeave={() => setHoveredId(null)}
        onBlur={() => setHoveredId(null)}
        className={`group absolute flex min-h-[96px] w-[clamp(86px,9vw,124px)] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2 rounded-2xl border px-3 py-4 text-center backdrop-blur-xl transition-colors duration-200 ${
          isActive
            ? 'border-cyan-300/65 bg-slate-950/68 shadow-[0_0_32px_rgba(34,211,238,0.24)]'
            : 'border-white/[0.08] bg-slate-950/30 hover:border-cyan-300/45 hover:bg-slate-950/52'
        }`}
      >
        <SvgIcon
          id={skill.icon}
          className={`h-7 w-7 fill-none stroke-[1.8] transition-colors sm:h-8 sm:w-8 ${
            isActive ? 'stroke-cyan-200' : 'stroke-slate-100/80 group-hover:stroke-cyan-100'
          }`}
        />
        <span
          className={`text-xs font-bold leading-tight tracking-tight sm:text-sm ${
            isActive ? 'text-cyan-100' : 'text-slate-100/90'
          }`}
        >
          {label(skill)}
        </span>
      </button>
    );
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-0 sm:px-2 pt-4 pb-2 space-y-4">
      <div className="pointer-events-none absolute inset-x-[-12%] top-[-8%] h-[760px] rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.18),rgba(59,130,246,0.08)_36%,transparent_68%)] blur-2xl" />

      {/* ─── CANVAS 3D + overlay HTML lisible ─── */}
      <div className="relative min-h-[760px] overflow-visible">
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
            centerLabel={t(LOCALE.engineer)}
          />
        </div>

        <div className="relative z-10 min-h-[760px]">
          {skillsMap.map(renderSkillButton)}
          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 justify-center px-4">
            <button
              onMouseEnter={() => setIsCenterHovered(true)}
              onFocus={() => setIsCenterHovered(true)}
              onMouseLeave={() => setIsCenterHovered(false)}
              onBlur={() => setIsCenterHovered(false)}
              className={`w-[clamp(220px,28vw,310px)] rounded-3xl border px-8 py-7 text-center backdrop-blur-xl transition-colors duration-200 ${
                isCenterHovered
                  ? 'border-cyan-300/65 bg-slate-950/72 shadow-[0_0_58px_rgba(34,211,238,0.36)]'
                  : 'border-cyan-200/16 bg-slate-950/46 shadow-[0_0_46px_rgba(15,23,42,0.42)]'
              }`}
            >
              <div className="text-xl font-extrabold tracking-tight text-white">
                {t(LOCALE.engineer)}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* ─── PANNEAU ANALYSE fondu dans la nébuleuse ─── */}
      <div className="relative mx-auto max-w-5xl border border-cyan-200/[0.08] bg-[#050816]/30 backdrop-blur-xl rounded-2xl p-5 sm:p-6 overflow-hidden shadow-[0_16px_70px_rgba(2,6,23,0.2)]">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(34,211,238,0.08),transparent_32%,rgba(167,139,250,0.06))]" />
        <div className="relative flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
          <div className="shrink-0 w-full sm:w-40">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block">
              {t(LOCALE.analyse)}
            </span>
          </div>

          <div className="flex-1 w-full">
            <AnimatePresence mode="wait">
              {activeSkill ? (
                <motion.div
                  key={activeSkill.id}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="flex flex-col sm:flex-row items-start gap-3 sm:gap-6"
                >
                  {/* Header */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="p-2 rounded-xl bg-cyan-500/10 shadow-[0_0_24px_rgba(34,211,238,0.12)]">
                      <SvgIcon
                        id={activeSkill.icon}
                        className="w-5 h-5 stroke-[1.8] fill-none stroke-cyan-400"
                      />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-white">
                        {label(activeSkill)}
                      </h4>
                      {activeSkill.accent && (
                        <span className="inline-block text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full mt-0.5 font-medium">
                          {t(LOCALE.specialist)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Proof */}
                  <p className="text-sm leading-relaxed text-slate-400 italic p-3 rounded-xl bg-white/[0.025] border border-white/[0.04] flex-1">
                    &ldquo;{proof(activeSkill) || t(LOCALE.enCours)}&rdquo;
                  </p>
                </motion.div>
              ) : (
                <p className="text-sm text-slate-500 italic">{t(LOCALE.survole)}</p>
              )}
            </AnimatePresence>
          </div>

          {/* Status à droite */}
          <div className="shrink-0 self-end sm:self-auto flex items-center gap-3">
            <span className="text-[10px] text-slate-500 font-mono">
              {skillsMap.length} nœuds
            </span>
            <span className="text-[10px] font-mono text-slate-500">
              {anyHighlight ? '⏺ actif' : '⏸ veille'}
            </span>
          </div>
        </div>
      </div>

      {/* ─── BADGES ─── */}
      <div className="relative w-full rounded-2xl border border-white/[0.04] bg-transparent p-4 flex flex-wrap gap-3 items-center justify-center">
        <span className="text-xs font-medium text-slate-500 mr-2">
          {t(LOCALE.methods)}
        </span>
        <span className="px-3 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium">
          Travail d'équipe
        </span>
        <span className="px-3 py-1 text-xs rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 font-medium">
          CI/CD & DevOps
        </span>
        <span className="px-3 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
          Agile / Scrum
        </span>
      </div>
    </div>
  );
}
