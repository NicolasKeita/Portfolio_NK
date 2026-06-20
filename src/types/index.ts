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
  labelEn?: string;
  accent?: boolean;
}

export interface SkillCard {
  icon: string;
  name: string;
  desc: string;
  nameEn?: string;
  descEn?: string;
  level: number; // 1-5
}

export interface Formation {
  title: string;
  org: string;
  desc: string;
  titleEn?: string;
  descEn?: string;
}

export interface Project {
  id: string;
  tag: string;
  tagClass: string;
  title: string;
  description: string;
  titleEn?: string;
  descEn?: string;
  prologue?: string;
  prologueEn?: string;
  techs: string[];
  link: string;
  photos: string[];
}

export interface ContactItem {
  icon: string;
  label: string;
  value: string;
  labelEn?: string;
  valueEn?: string;
  href?: string;
  sub?: string;
  subEn?: string;
}

export type Theme = 'dark' | 'light';