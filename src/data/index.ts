import { getNested, locales } from '../i18n/translations';
import type { Lang } from '../i18n/translations';

import tacticNavAndroid from '../assets/tactic-nav/Android_app_2.png';
import tacticNavBacklog from '../assets/tactic-nav/backlog_backend.png';
import tacticNavCockpit from '../assets/tactic-nav/cockpit.png';
import tacticNavSchema from '../assets/tactic-nav/schema_architecture.png';
import marsLanderCodingame from '../assets/mars-lander/codinggame_mars_lander.png';
import marsLanderHumanoid from '../assets/mars-lander/humanoid_standup.gif';
import marsLanderFalcon9Landing from '../assets/mars-lander/space_x_falcon_9_landing.png';
import marsLanderFalcon9Launch from '../assets/mars-lander/space_X_falcon_9_launch.png';
import mudletAlgora from '../assets/mudlet/algora.io.png';
import mudletGame1 from '../assets/mudlet/game_1.png';
import mudletGame2 from '../assets/mudlet/game_2.png';
import mudletBg from '../assets/mudlet/ISO_C++_Logo.svg.webp';
import champSelectScreenshot1 from '../assets/champ-select/CSW_1.jpg';
import champSelectScreenshot2 from '../assets/champ-select/CSW_2.jpg';

const imageMap: Record<string, string> = {
  'tactic-nav/Android_app_2.png': tacticNavAndroid.src,
  'tactic-nav/backlog_backend.png': tacticNavBacklog.src,
  'tactic-nav/cockpit.png': tacticNavCockpit.src,
  'tactic-nav/schema_architecture.png': tacticNavSchema.src,
  'mars-lander/codinggame_mars_lander.png': marsLanderCodingame.src,
  'mars-lander/humanoid_standup.gif': marsLanderHumanoid.src,
  'mars-lander/space_x_falcon_9_landing.png': marsLanderFalcon9Landing.src,
  'mars-lander/space_X_falcon_9_launch.png': marsLanderFalcon9Launch.src,
  'mudlet/algora.io.png': mudletAlgora.src,
  'mudlet/game_1.png': mudletGame1.src,
  'mudlet/game_2.png': mudletGame2.src,
  'mudlet/ISO_C++_Logo.svg.webp': mudletBg.src,
  'champ-select/CSW_1.jpg': champSelectScreenshot1.src,
  'champ-select/CSW_2.jpg': champSelectScreenshot2.src,
};

export function getImage(path: string): string {
  return imageMap[path] ?? '';
}

export function getProjects(lang: Lang) {
  const locale = locales[lang];
  return getNested(locale, 'projectsList') as unknown as ProjectYaml[];
}

export function getFormations(lang: Lang) {
  const locale = locales[lang];
  return getNested(locale, 'formations') as unknown as FormationYaml[];
}

export function getSkills(lang: Lang) {
  const locale = locales[lang];
  return getNested(locale, 'skills') as Record<string, SkillYaml>;
}

export function getContactItems(lang: Lang) {
  const locale = locales[lang];
  return getNested(locale, 'contactItems') as Record<string, ContactYaml>;
}

export function getEngineer(lang: Lang) {
  const locale = locales[lang];
  return {
    label: getNested(locale, 'engineer.label') as string,
    description: getNested(locale, 'engineer.description') as string,
  };
}

export interface ProjectLink {
  url: string;
  label: string;
}

export interface ProjectYaml {
  id: string;
  tag: string;
  tagClass: string;
  tags?: { name: string; class: string }[];
  title: string;
  description: string;
  prologue?: string;
  overview?: string[];
  techs: string[];
  link: string;
  links?: ProjectLink[];
  bgImage?: string;
  photos: string[];
}

export interface FormationYaml {
  id: string;
  title: string;
  org: string;
  desc: string;
}

export interface SkillYaml {
  icon: string;
  label: string;
  proof?: string;
  accent?: boolean;
}

export interface ContactYaml {
  icon: string;
  label: string;
  value: string;
  href?: string;
  sub?: string;
}
