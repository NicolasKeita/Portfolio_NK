import { useState } from 'react';
import { motion } from 'framer-motion';
import { SvgIcon } from './SvgSprite';
import { useLanguage } from '../context/LanguageContext';
import { skillsMap } from '../data/portfolio';

/* ─── Distribution helpers ─── */
function distributeOnRing(
  items: typeof skillsMap,
  ringIndex: number,
  itemsPerRing: number,
): (typeof skillsMap[number] | null)[] {
  const ring: (typeof skillsMap[number] | null)[] = [];
  const start = ringIndex * itemsPerRing;
  for (let i = 0; i < itemsPerRing; i++) {
    const idx = start + i;
    ring.push(idx < items.length ? items[idx] : null);
  }
  return ring;
}

/* ─── Ring component ─── */
function OrbitalRing({
  skills,
  radius,
  duration,
  onSelect,
  activeId,
  onHoverChange,
  labelFn,
}: {
  skills: (typeof skillsMap[number] | null)[];
  radius: number;
  duration: number;
  onSelect: (s: typeof skillsMap[number]) => void;
  activeId: string | null;
  onHoverChange: (v: boolean) => void;
  labelFn: (s: typeof skillsMap[number]) => string;
}) {
  return (
    <motion.div
      className="absolute rounded-full border border-white/[0.04]"
      style={{
        width: radius * 2,
        height: radius * 2,
        left: `calc(50% - ${radius}px)`,
        top: `calc(50% - ${radius}px)`,
      }}
      animate={{ rotate: 360 }}
      transition={{ ease: 'linear', duration, repeat: Infinity }}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
    >
      {skills.map((skill, index) => {
        if (!skill) return null;

        const safeCount = skills.filter(Boolean).length;
        const angle = (index / safeCount) * 2 * Math.PI;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const isActive = activeId === skill.id;

        return (
          <motion.div
            key={skill.id}
            className="absolute"
            style={{
              left: `calc(50% + ${x}px - 22px)`,
              top: `calc(50% + ${y}px - 22px)`,
            }}
            // Contre-rotation : le label reste droit
            animate={{ rotate: -360 }}
            transition={{ ease: 'linear', duration, repeat: Infinity }}
          >
            <button
              onClick={() => onSelect(skill)}
              onMouseEnter={() => onSelect(skill)}
              className={`group flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl transition-all duration-200
                ${isActive
                  ? 'bg-white/10 ring-1 ring-blue-400/40 scale-110'
                  : 'hover:bg-white/5 hover:scale-105'
                }`}
              title={labelFn(skill)}
            >
              <SvgIcon
                id={skill.icon}
                className={`w-5 h-5 stroke-[1.8] fill-none transition-colors duration-200 ${
                  isActive
                    ? 'stroke-blue-400 drop-shadow-[0_0_6px_rgba(96,165,250,0.5)]'
                    : 'stroke-white/80'
                }`}
              />
              <span
                className={`text-[10px] font-medium leading-tight transition-colors duration-200 ${
                  isActive ? 'text-blue-300' : 'text-white/70'
                }`}
              >
                {labelFn(skill)}
              </span>
            </button>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

/* ─── Main component ─── */
export function SkillsMapPreview() {
  const { lang } = useLanguage();
  const [activeSkill, setActiveSkill] = useState(skillsMap[0] ?? null);
  const [hovered, setHovered] = useState(false);

  const label = (s: typeof skillsMap[number]) =>
    lang === 'en' && s.labelEn ? s.labelEn : s.label;
  const proof = (s: typeof skillsMap[number]) =>
    lang === 'en' ? s.proofEn : s.proof;

  // 12 skills → 6 par anneau sur 2 anneaux → plus d'espace
  const half = Math.ceil(skillsMap.length / 2);
  const ringA = distributeOnRing(skillsMap, 0, half);
  const ringB = distributeOnRing(skillsMap, 1, half);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 space-y-6">
      {/* ─── SOLAR SYSTEM (pleine largeur) ─── */}
      <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/[0.08] bg-slate-950/40 backdrop-blur-md p-6 min-h-[500px] select-none">
        {/* Label top-left */}
        <div className="absolute top-4 left-6 z-20">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Système Solaire
          </span>
        </div>

        {/* Sun / Core */}
        <div className="absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {/* Glow */}
          <div className="w-20 h-20 rounded-full bg-blue-500/15 animate-ping absolute -inset-4 pointer-events-none" />
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 flex items-center justify-center shadow-[0_0_30px_rgba(96,165,250,0.3)]">
            <div className="text-center">
              <div className="text-[9px] font-display font-bold text-white tracking-widest uppercase leading-tight">
                Fullstack
              </div>
              <div className="text-[7px] font-display text-blue-200/70 tracking-wider">
                Developer
              </div>
            </div>
          </div>
        </div>

        {/* Orbital rings */}
        <div className="relative w-full h-full" style={{ minHeight: 460 }}>
          {/* Outer ring — 6 planètes, grand rayon, lent */}
          <OrbitalRing
            skills={ringB}
            radius={200}
            duration={50}
            onSelect={setActiveSkill}
            activeId={activeSkill?.id ?? null}
            onHoverChange={setHovered}
            labelFn={label}
          />

          {/* Inner ring — 6 planètes, rayon moyen, plus rapide */}
          <OrbitalRing
            skills={ringA}
            radius={135}
            duration={28}
            onSelect={setActiveSkill}
            activeId={activeSkill?.id ?? null}
            onHoverChange={setHovered}
            labelFn={label}
          />
        </div>

        {/* Hover pause indicator */}
        {hovered && (
          <div className="absolute bottom-4 left-6 z-20 text-[10px] text-slate-500 font-mono tracking-wider">
            ⏸ PAUSED
          </div>
        )}
      </div>

      {/* ─── HUD / PROOF PANEL (en bas, pleine largeur) ─── */}
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-slate-950/50 backdrop-blur-md p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
          {/* Label colonne gauche */}
          <div className="shrink-0 w-full sm:w-32">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
              Tableau de Bord
            </span>
          </div>

          {/* Contenu dynamique */}
          <div className="flex-1 w-full">
            {activeSkill ? (
              <div className="flex flex-col sm:flex-row items-start gap-4 animate-fade-in" key={activeSkill.id}>
                {/* Header */}
                <div
                  className={`flex items-center gap-3 p-3 rounded-2xl border transition-colors duration-300 shrink-0 ${
                    activeSkill.accent
                      ? 'bg-amber-500/5 border-amber-500/15'
                      : 'bg-white/[0.04] border-white/[0.08]'
                  }`}
                >
                  <div
                    className={`p-2.5 rounded-xl ${
                      activeSkill.accent
                        ? 'bg-amber-500/10'
                        : 'bg-blue-500/10'
                    }`}
                  >
                    <SvgIcon
                      id={activeSkill.icon}
                      className={`w-6 h-6 stroke-[1.8] fill-none ${
                        activeSkill.accent
                          ? 'stroke-amber-400'
                          : 'stroke-blue-400'
                      }`}
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">
                      {label(activeSkill)}
                    </h4>
                    {activeSkill.accent && (
                      <span className="inline-block text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full mt-1 font-medium">
                        Spécialité principale
                      </span>
                    )}
                  </div>
                </div>

                {/* Proof */}
                <p
                  className={`text-sm leading-relaxed p-4 rounded-2xl shadow-inner italic border transition-colors duration-300 flex-1 ${
                    activeSkill.accent
                      ? 'text-amber-200/80 bg-amber-500/[0.03] border-amber-500/10'
                      : 'text-slate-300 bg-white/[0.02] border-white/[0.04]'
                  }`}
                >
                  &ldquo;{proof(activeSkill) || 'En cours de déploiement…'}&rdquo;
                </p>
              </div>
            ) : (
              <p className="text-sm text-slate-500 italic">
                Survole une planète pour découvrir mes compétences.
              </p>
            )}
          </div>

          {/* Status colonne droite */}
          <div className="shrink-0 self-end sm:self-auto flex items-center gap-3">
            <span className="text-xs text-slate-400 whitespace-nowrap">{skillsMap.length} planètes</span>
            <span
              className={`text-[10px] font-mono transition-colors ${
                hovered ? 'text-blue-400' : 'text-slate-500'
              }`}
            >
              {hovered ? '⏸ PAUSED' : '▶ ROTATING'}
            </span>
          </div>
        </div>
      </div>

      {/* ─── BADGES ─── */}
      <div className="w-full rounded-2xl border border-white/[0.08] bg-slate-950/20 p-4 flex flex-wrap gap-3 items-center justify-center">
        <span className="text-xs font-medium text-slate-500 mr-2">
          Méthodologies :
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