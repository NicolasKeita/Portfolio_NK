import { useState, useCallback } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getSkills, getEngineer } from '../../data';
import { SkillsMapDiagram } from '../skills/SkillsMapDiagram';
import { SkillsMapDetail } from '../skills/SkillsMapDetail';

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
  const [displayedSkillId, setDisplayedSkillId] = useState<string>('dev');

  const skills = getSkills(lang as 'fr' | 'en');
  const engineer = getEngineer(lang as 'fr' | 'en');

  const proof = useCallback(
    (id: string) => skills[id]?.proof ?? '',
    [skills]
  );

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
        skills={skills}
        centerLabel={engineer.label}
      />

      <SkillsMapDetail
        activeSkillId={displayedSkillId}
        proof={proof}
        engineerDescription={engineer.description}
        showEngineerDesc={showEngineerDesc}
      />
    </div>
  );
}
