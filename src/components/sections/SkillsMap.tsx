import { useState, useCallback } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getSkills, getEngineer } from '../../data';
import { SkillsMapDiagram } from '../skills/SkillsMapDiagram';
import { SkillsMapDetail } from '../skills/SkillsMapDetail';
import { css } from '../../../styled-system/css';

const styles = {
  root: css({
    position: 'relative',
    w: 'full',
    maxW: '7xl',
    mx: 'auto',
    px: '4',
    pt: '4',
    pb: '4',
    '& > * + *': {
      mt: '6',
    },
  }),
  gradient: css({
    pointerEvents: 'none',
    position: 'absolute',
    insetX: '-12%',
    top: '-12%',
    h: '500px',
    rounded: 'full',
    bg: 'radial-gradient(circle at center, rgba(34,211,238,0.1), rgba(59,130,246,0.03) 40%, transparent 70%)',
    md: {
      filter: 'blur(40px)',
    },
  }),
};

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
    <div className={styles.root}>
      <div className={styles.gradient} />

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
