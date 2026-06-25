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

