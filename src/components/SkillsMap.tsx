import { SvgIcon } from './SvgSprite';
import { useLanguage } from '../context/LanguageContext';
import { skillsMap } from '../data/portfolio';

export function SkillsMapPreview() {
  const { lang } = useLanguage();

  return (
    <div className="pins">
      {skillsMap.map((skill, i) => (
        <span
          key={skill.id}
          className={`pin${skill.accent ? ' pin--accent' : ''}`}
          style={{ '--i': i } as React.CSSProperties}
        >
          <span className="pin-body">
            <SvgIcon id={skill.icon} className="pin-icon" />
            <span className="pin-sparkle" />
            <span className="pin-sparkle" />
            <span className="pin-sparkle" />
          </span>
          <span className="pin-shadow" />
          <span className="pin-label">
            {lang === 'en' && skill.labelEn ? skill.labelEn : skill.label}
          </span>
        </span>
      ))}
    </div>
  );
}