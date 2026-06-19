import { SvgIcon } from './SvgSprite';
import { skillsMap } from '../data/portfolio';

export function SkillsMapPreview() {
  return (
    <div className="skills-map-preview">
      <div className="skills-map-container">
        {skillsMap.map((skill) => (
          <a key={skill.id} href="#projets" className="skill-pin" title="Voir projet lié">
            <div className={`pin-marker${skill.accent ? ' pin-marker--accent' : ''}`}>
              <SvgIcon id={skill.icon} className="pin-icon" />
            </div>
            <span className="pin-label">{skill.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}