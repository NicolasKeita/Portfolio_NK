import { SvgIcon } from './SvgSprite';
import { useLanguage } from '../context/LanguageContext';
import { skillsMap } from '../data/portfolio';

export function SkillsMapPreview() {
  const { lang, t } = useLanguage();

  return (
    <div className="skills-map-preview">
      <div className="skills-map-container">
        {skillsMap.map((skill) => (
          <a key={skill.id} href="#projets" className="skill-pin" title={t('hero.skill.tooltip')}>
            <div className={`pin-marker${skill.accent ? ' pin-marker--accent' : ''}`}>
              <SvgIcon id={skill.icon} className="pin-icon" />
            </div>
            <span className="pin-label">{lang === 'en' && skill.labelEn ? skill.labelEn : skill.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
