export interface Skill {
  id: string;
  icon: string;
  label: string;
  labelEn?: string;
  accent?: boolean;
  proof?: string;
  proofEn?: string;
}

export interface Formation {
  title: string;
  org: string;
  desc: string;
  titleEn?: string;
  descEn?: string;
  orgEn?: string;
}

export interface ProjectTag {
  name: string;
  class: string;
}

export interface Project {
  id: string;
  tag: string;
  tagClass: string;
  tags?: ProjectTag[];
  title: string;
  description: string;
  titleEn?: string;
  descEn?: string;
  prologue?: string;
  prologueEn?: string;
  overview?: string[];
  overviewEn?: string[];
  techs: string[];
  link: string;
  photos: string[];
  bgImage?: string;
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