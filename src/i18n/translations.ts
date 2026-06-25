export type Lang = 'fr' | 'en';

export interface TranslationEntry {
  key: string;
  en: string;
  fr: string;
}

export const translations: TranslationEntry[] = [
  /* Modal */
  { key: 'modal.close', en: 'Close', fr: 'Fermer' },
  { key: 'modal.github', en: 'View code', fr: 'Voir le code' },

  /* Nav */
  { key: 'nav.formation', en: 'Education', fr: 'Formation' },
  { key: 'nav.projets', en: 'Projects', fr: 'Projets' },
  { key: 'nav.contact', en: 'Contact', fr: 'Contact' },
  { key: 'nav.lang', en: 'Switch to French', fr: 'Passer en anglais' },

  /* Hero */
  { key: 'hero.role', en: 'Portfolio — Software Engineer & IT Consultant', fr: 'Portfolio — Ingénieur Logiciel & Consultant IT' },
  { key: 'hero.tagline', en: 'What sets me apart is not the number of projects completed, but the quality standard I bring to each one.', fr: 'Ce qui me distingue n\'est pas la quantité de projets réalisés, mais l\'exigence de qualité que j\'apporte à chacun d\'eux.' },
  { key: 'hero.cta.work', en: 'See my work', fr: 'Voir mes réalisations' },
  { key: 'hero.cta.contact', en: 'Get in touch', fr: 'Me contacter' },
  /* Projects */
  { key: 'projects.label', en: 'Projects', fr: 'Projets' },
  { key: 'projects.title', en: 'My Work', fr: 'Réalisations' },

  /* Formation */
  { key: 'formation.label', en: 'Academic Background', fr: 'Parcours Académique' },
  { key: 'formation.title', en: 'Education', fr: 'Formation' },

  /* Contact */
  { key: 'contact.title', en: 'Contact', fr: 'Contact' },
  { key: 'contact.tagline', en: 'Ready to take on\nnew challenges.', fr: 'Prêt à relever\nde nouveaux défis.' },
  { key: 'contact.sub1', en: 'Available for permanent, fixed-term, or public sector contracts.', fr: 'Disponible pour des postes en CDI, CDD ou contrat public.' },
  { key: 'contact.sub2', en: 'Feel free to reach out to discuss your needs.', fr: 'N\'hésitez pas à me contacter pour discuter de votre besoin.' },

  /* Footer */
  { key: 'footer.home', en: 'Home', fr: 'Accueil' },
  { key: 'footer.projets', en: 'Projects', fr: 'Projets' },
  { key: 'footer.formation', en: 'Education', fr: 'Formation' },
  { key: 'footer.contact', en: 'Contact', fr: 'Contact' },
  { key: 'footer.copyright', en: '© 2026 Nicolas Keita — Software Engineer & IT Consultant | Nouvelle-Aquitaine, France', fr: '© 2026 Nicolas Keita — Ingénieur Logiciel & Consultant IT | Nouvelle-Aquitaine, France' },
];