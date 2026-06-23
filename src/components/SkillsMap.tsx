import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SvgIcon } from './SvgSprite';
import { useLanguage } from '../context/LanguageContext';
import { skillsMap } from '../data/portfolio';

/* ─── Traductions ─── */
const LOCALE = {
  analyse: { fr: 'Analyse de Compétence', en: 'Skill Analysis' },
  survole: { fr: 'Survole un nœud de la constellation pour découvrir mes preuves.', en: 'Hover a constellation node to discover my proofs.' },
  enCours: { fr: 'En cours de déploiement…', en: 'Deployment in progress…' },
  specialist: { fr: 'Spécialité principale', en: 'Lead specialty' },
  constellations: { fr: 'Constellation Technique', en: 'Tech Constellation' },
} as const;

/* ─── Connexions manuelles entre skills (ID → [IDs connectés]) ─── */
const CONNECTIONS: Record<string, string[]> = {
  dev: ['mobile', 'arch', 'data'],
  mobile: ['dev', 'arch'],
  linux: ['deploy', 'automation'],
  arch: ['dev', 'mobile', 'algo'],
  automation: ['linux', 'deploy', 'rigueur'],
  deploy: ['linux', 'automation', 'data'],
  algo: ['arch', 'data', 'rigueur'],
  data: ['deploy', 'algo', 'dev'],
  client: ['conseil', 'team'],
  conseil: ['client', 'team', 'arch'],
  rigueur: ['automation', 'algo', 'team'],
  team: ['client', 'conseil', 'rigueur'],
};

/* ─── Positions asymétriques des badges sur la grille ─── */
const NODE_POSITIONS: Record<string, { x: string; y: string }> = {
  dev:       { x: '20%',  y: '15%' },
  mobile:    { x: '55%',  y: '10%' },
  linux:     { x: '72%',  y: '28%' },
  arch:      { x: '38%',  y: '28%' },
  automation:{ x: '15%',  y: '42%' },
  deploy:    { x: '62%',  y: '50%' },
  algo:      { x: '30%',  y: '58%' },
  data:      { x: '75%',  y: '65%' },
  client:    { x: '12%',  y: '72%' },
  conseil:   { x: '45%',  y: '78%' },
  rigueur:   { x: '68%',  y: '82%' },
  team:      { x: '85%',  y: '45%' },
};

/* ─── Helper pour générer les lignes SVG ─── */
function getLineCoords(
  idA: string,
  idB: string,
  containerRect: DOMRect,
): { x1: number; y1: number; x2: number; y2: number } | null {
  const elA = document.getElementById(`node-${idA}`);
  const elB = document.getElementById(`node-${idB}`);
  if (!elA || !elB) return null;

  const rA = elA.getBoundingClientRect();
  const rB = elB.getBoundingClientRect();

  return {
    x1: rA.left - containerRect.left + rA.width / 2,
    y1: rA.top - containerRect.top + rA.height / 2,
    x2: rB.left - containerRect.left + rB.width / 2,
    y2: rB.top - containerRect.top + rB.height / 2,
  };
}

/* ─── Composant principal ─── */
export function SkillsMapPreview() {
  const { lang } = useLanguage();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeSkill, setActiveSkill] = useState(skillsMap[0]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<{ id: string; coords: { x1: number; y1: number; x2: number; y2: number } }[]>([]);

  const t = (obj: { fr: string; en: string }) => (lang === 'en' ? obj.en : obj.fr);
  const label = (s: typeof skillsMap[number]) => (lang === 'en' && s.labelEn ? s.labelEn : s.label);
  const proof = (s: typeof skillsMap[number]) => (lang === 'en' ? s.proofEn : s.proof);

  // Recalcule les lignes au resize
  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const result: typeof lines = [];

      const seen = new Set<string>();
      for (const [idA, targets] of Object.entries(CONNECTIONS)) {
        for (const idB of targets) {
          const key = [idA, idB].sort().join('-');
          if (seen.has(key)) continue;
          seen.add(key);

          const coords = getLineCoords(idA, idB, rect);
          if (coords) result.push({ id: key, coords });
        }
      }
      setLines(result);
    };

    // petit délai pour laisser le DOM se poser
    const timer = setTimeout(update, 50);
    window.addEventListener('resize', update);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', update);
    };
  }, []);

  const connectedToHovered = useMemo(() => {
    if (!hoveredId) return new Set<string>();
    const set = new Set(CONNECTIONS[hoveredId] ?? []);
    set.add(hoveredId);
    // Inverse look-up
    for (const [id, targets] of Object.entries(CONNECTIONS)) {
      if (targets.includes(hoveredId)) set.add(id);
    }
    return set;
  }, [hoveredId]);

  /* ─── Effet pulse laser via strokeDasharray ─── */
  const isLineHighlighted = (lineId: string) => {
    if (!hoveredId) return false;
    const [a, b] = lineId.split('-');
    return a === hoveredId || b === hoveredId;
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-8 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ─── ZONE CONSTELLATION (2 cols) ─── */}
        <div
          ref={containerRef}
          className="lg:col-span-2 relative min-h-[550px] rounded-3xl overflow-hidden p-4"
        >
          {/* Label */}
          <div className="absolute top-4 left-6 z-30">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {t(LOCALE.constellations)}
            </span>
          </div>

          {/* SVG calque des lignes */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            {lines.map((line) => {
              const hl = isLineHighlighted(line.id);
              return (
                <motion.line
                  key={line.id}
                  x1={line.coords.x1}
                  y1={line.coords.y1}
                  x2={line.coords.x2}
                  y2={line.coords.y2}
                  stroke={hl ? '#06b6d4' : '#1e293b'}
                  strokeWidth={hl ? 2 : 1}
                  opacity={hl ? 0.8 : 0.2}
                  initial={false}
                  animate={
                    hl
                      ? {
                          strokeDasharray: ['0, 300', '300, 0'],
                          strokeDashoffset: [300, 0],
                        }
                      : { strokeDasharray: 'none', strokeDashoffset: 0 }
                  }
                  transition={
                    hl
                      ? { duration: 1.2, repeat: Infinity, ease: 'linear' }
                      : { duration: 0.3 }
                  }
                  style={{ willChange: 'stroke-dasharray, stroke-dashoffset' }}
                />
              );
            })}
          </svg>

          {/* Badges disposés asymétriquement */}
          <div className="relative w-full h-full z-20" style={{ minHeight: 500 }}>
            {skillsMap.map((skill) => {
              const pos = NODE_POSITIONS[skill.id];
              const isHovered = hoveredId === skill.id;
              const isConnected = hoveredId && connectedToHovered.has(skill.id) && !isHovered;

              return (
                <motion.button
                  key={skill.id}
                  id={`node-${skill.id}`}
                  onMouseEnter={() => { setHoveredId(skill.id); setActiveSkill(skill); }}
                  onMouseLeave={() => setHoveredId(null)}
                  className="absolute flex flex-col items-center gap-1.5 p-2.5 sm:p-3 rounded-2xl backdrop-blur-xl border transition-all duration-300"
                  style={{
                    left: pos.x,
                    top: pos.y,
                    transform: 'translate(-50%, -50%)',
                    willChange: 'transform, box-shadow',
                  }}
                  animate={{
                    scale: isHovered ? 1.15 : isConnected ? 1.05 : 1,
                    borderColor:
                      isHovered
                        ? 'rgba(6, 182, 212, 0.6)'
                        : isConnected
                          ? 'rgba(6, 182, 212, 0.25)'
                          : 'rgba(255,255,255,0.08)',
                    backgroundColor:
                      isHovered
                        ? 'rgba(15, 23, 42, 0.9)'
                        : isConnected
                          ? 'rgba(15, 23, 42, 0.5)'
                          : 'rgba(15, 23, 42, 0.3)',
                    boxShadow:
                      isHovered
                        ? '0 0 25px rgba(6, 182, 212, 0.25)'
                        : isConnected
                          ? '0 0 15px rgba(6, 182, 212, 0.08)'
                          : '0 0 0px rgba(0,0,0,0)',
                  }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  <SvgIcon
                    id={skill.icon}
                    className={`w-6 h-6 sm:w-7 sm:h-7 stroke-[1.8] fill-none transition-colors duration-200 ${
                      isHovered
                        ? 'stroke-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]'
                        : isConnected
                          ? 'stroke-cyan-300/60'
                          : 'stroke-white/70'
                    }`}
                  />
                  <span
                    className={`text-[9px] sm:text-[10px] font-medium leading-tight transition-colors duration-200 ${
                      isHovered ? 'text-cyan-300' : isConnected ? 'text-cyan-200/60' : 'text-white/60'
                    }`}
                  >
                    {label(skill)}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* ─── PANNEAU DE PREUVE (1 col) ─── */}
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-slate-950/40 backdrop-blur-md p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
              {t(LOCALE.analyse)}
            </span>

            <AnimatePresence mode="wait">
              {activeSkill ? (
                <motion.div
                  key={activeSkill.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="space-y-4"
                >
                  {/* Header */}
                  <div
                    className={`flex items-center gap-3 p-3 rounded-2xl border ${
                      activeSkill.accent
                        ? 'bg-amber-500/5 border-amber-500/15'
                        : 'bg-white/[0.04] border-white/[0.08]'
                    }`}
                  >
                    <div
                      className={`p-2.5 rounded-xl ${
                        activeSkill.accent ? 'bg-amber-500/10' : 'bg-cyan-500/10'
                      }`}
                    >
                      <SvgIcon
                        id={activeSkill.icon}
                        className={`w-6 h-6 stroke-[1.8] fill-none ${
                          activeSkill.accent ? 'stroke-amber-400' : 'stroke-cyan-400'
                        }`}
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">
                        {label(activeSkill)}
                      </h4>
                      {activeSkill.accent && (
                        <span className="inline-block text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full mt-1 font-medium">
                          {t(LOCALE.specialist)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Proof */}
                  <motion.p
                    initial={{ borderColor: 'rgba(6, 182, 212, 0.5)' }}
                    animate={{ borderColor: 'rgba(255,255,255,0.04)' }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    className={`text-sm leading-relaxed p-4 rounded-2xl italic border ${
                      activeSkill.accent
                        ? 'text-amber-200/80 bg-amber-500/[0.03] border-amber-500/10'
                        : 'text-slate-300 bg-white/[0.02] border-white/[0.04]'
                    }`}
                  >
                    &ldquo;{proof(activeSkill) || t(LOCALE.enCours)}&rdquo;
                  </motion.p>
                </motion.div>
              ) : (
                <p className="text-sm text-slate-500 italic">{t(LOCALE.survole)}</p>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="mt-6 border-t border-white/[0.06] pt-4 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              {skillsMap.length} nœuds &middot; {lines.length} connexions
            </span>
            <span className="text-[10px] font-mono text-slate-500">
              {hoveredId ? `⏺ ${hoveredId}` : '⏸ idle'}
            </span>
          </div>
        </div>
      </div>

      {/* ─── BADGES ─── */}
      <div className="w-full rounded-2xl border border-white/[0.08] bg-slate-950/20 p-4 flex flex-wrap gap-3 items-center justify-center">
        <span className="text-xs font-medium text-slate-500 mr-2">
          {lang === 'en' ? 'Methodologies :' : 'Méthodologies :'}
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