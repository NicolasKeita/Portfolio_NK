import { useState, useCallback, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { skillsMap, engineerBadge } from '../data/portfolio';
import { SkillsMapDiagram } from './SkillsMapDiagram';
import { SkillsMapDetail } from './SkillsMapDetail';

const GRADIENT_CLASS = [
  'pointer-events-none absolute inset-x-[-12%] top-[-12%] h-[500px]',
  'rounded-full bg-slate-950',
  'bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.1),rgba(59,130,246,0.03)_40%,transparent_70%)]',
  'md:blur-2xl',
].join(' ');

export function SkillsMap() {
  const { lang } = useLanguage();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isCenterHovered, setIsCenterHovered] = useState(false);
  const [showEngineerDesc, setShowEngineerDesc] = useState(true);
  const [displayedSkillId, setDisplayedSkillId] = useState<string>(skillsMap[0].id);

  const t = useCallback((obj: { fr: string; en: string }) => (lang === 'en' ? obj.en : obj.fr), [lang]);

  const label = useCallback(
    (s: typeof skillsMap[number]) => (lang === 'en' && s.labelEn ? s.labelEn : s.label),
    [lang]
  );

  const proof = useCallback(
    (s: typeof skillsMap[number]) => (lang === 'en' ? s.proofEn : s.proof),
    [lang]
  );

  const activeSkill = useMemo(
    () => skillsMap.find((s) => s.id === displayedSkillId) ?? skillsMap[0],
    [displayedSkillId]
  );

  const handleSelectSkill = useCallback((skill: typeof skillsMap[number]) => {
    setDisplayedSkillId(skill.id);
    setShowEngineerDesc(false);
  }, []);

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 pt-4 pb-4 space-y-6">
      <div className={GRADIENT_CLASS} />

      <SkillsMapDiagram
        displayedSkillId={displayedSkillId}
        hoveredId={hoveredId}
        isCenterHovered={isCenterHovered}
        setHoveredId={setHoveredId}
        setIsCenterHovered={setIsCenterHovered}
        setDisplayedSkillId={setDisplayedSkillId}
        setShowEngineerDesc={setShowEngineerDesc}
        onSelectSkill={handleSelectSkill}
        displayLabel={label}
        centerLabel={t(engineerBadge.engineer)}
      />

      <SkillsMapDetail
        activeSkill={activeSkill}
        proof={proof}
        engineerDescription={t(engineerBadge.engineerDescription)}
        showEngineerDesc={showEngineerDesc}
      />
    </div>
  );
}
