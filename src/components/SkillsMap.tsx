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

export function SkillsMapPreview() {
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

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-8 space-y-6">
      {/* ─── CANVAS 3D (pleine largeur) ─── */}
      <div className="relative min-h-[520px] rounded-3xl overflow-hidden bg-slate-950 border border-white/[0.06]">
        <NebulaConstellation
          skills={skillsMap}
          activeId={activeSkill?.id ?? null}
          hoveredId={hoveredId}
          onSelect={setActiveSkill}
          onHover={setHoveredId}
          isCenterHovered={isCenterHovered}
          onCenterHover={setIsCenterHovered}
          centerLabel={t(LOCALE.engineer)}
        />
      </div>

      {/* ─── PANNEAU ANALYSE (pleine largeur en bas) ─── */}
      <div className="relative border border-white/[0.06] bg-slate-900/10 backdrop-blur-xl rounded-2xl p-5 sm:p-6 overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
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
                    <div className="p-2 rounded-xl bg-cyan-500/10">
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
                  <p className="text-sm leading-relaxed text-slate-400 italic p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] flex-1">
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
      <div className="w-full rounded-2xl border border-white/[0.08] bg-slate-950/20 p-4 flex flex-wrap gap-3 items-center justify-center">
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