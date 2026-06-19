export interface Experience {
  id: string;
  title: string;
  organization: string;
  period: string;
  description: string;
  tags: string[];
}

export interface Skill {
  id: string;
  icon: string;
  label: string;
  accent?: boolean;
}

export interface SkillCard {
  icon: string;
  name: string;
  desc: string;
  level: number; // 1-5
}

export interface Formation {
  title: string;
  org: string;
  desc: string;
}

export interface Project {
  id: string;
  tag: string;
  tagClass: string;
  title: string;
  description: string;
  techs: string[];
  link: string;
}

export interface ContactItem {
  icon: string;
  label: string;
  value: string;
  href?: string;
  sub?: string;
}

export type Theme = 'dark' | 'light';