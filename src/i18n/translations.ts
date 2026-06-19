export type Lang = 'fr' | 'en';

export const translations: Record<Lang, Record<string, string>> = {
  fr: {
    /* Modal */
    'modal.close': 'Fermer',

    /* Nav */
    'nav.formation': 'Formation',
    'nav.projets': 'Projets',
    'nav.contact': 'Contact',
    'nav.theme': 'Changer de thème',
    'nav.lang': 'Passer en anglais',

    /* Hero */
    'hero.role': 'Portfolio — Ingénieur Logiciel & Consultant IT',
    'hero.line1': 'Formé par les meilleures écoles, guidé par la rigueur et l\'exigence de qualité.',
    'hero.line2': 'Talent démontré à travers des projets complexes, construits à partir de l\'étude de publications scientifiques et de l\'exploration de méthodes state of the art dans le domaine.',
    'hero.cta.work': 'Voir mes réalisations',
    'hero.cta.contact': 'Me contacter',
    'hero.skill.tooltip': 'Voir projet lié',

    /* Projects */
    'projects.label': 'Projets',
    'projects.title': 'Réalisations',

    /* Formation */
    'formation.label': 'Parcours Académique',
    'formation.title': 'Formation',

    /* Contact */
    'contact.title': 'Contact',
    'contact.tagline': 'Prêt à relever\nde nouveaux défis.',
    'contact.sub1': 'Disponible pour des postes en CDI, CDD ou contrat public.',
    'contact.sub2': 'N\'hésitez pas à me contacter pour discuter de votre besoin.',

    /* Footer */
    'footer.home': 'Accueil',
    'footer.projets': 'Projets',
    'footer.formation': 'Formation',
    'footer.contact': 'Contact',
    'footer.copyright': '© 2026 Nicolas Keita — Ingénieur Logiciel & Consultant IT | Nouvelle-Aquitaine, France',
  },

  en: {
    /* Modal */
    'modal.close': 'Close',

    /* Nav */
    'nav.formation': 'Education',
    'nav.projets': 'Projects',
    'nav.contact': 'Contact',
    'nav.theme': 'Toggle theme',
    'nav.lang': 'Switch to French',

    /* Hero */
    'hero.role': 'Portfolio — Software Engineer & IT Consultant',
    'hero.line1': 'Trained by top-tier schools, guided by rigor and a commitment to quality.',
    'hero.line2': 'Proven talent through complex projects built from the study of scientific publications and the exploration of state-of-the-art methods.',
    'hero.cta.work': 'See my work',
    'hero.cta.contact': 'Get in touch',
    'hero.skill.tooltip': 'View related project',

    /* Projects */
    'projects.label': 'Projects',
    'projects.title': 'My Work',

    /* Formation */
    'formation.label': 'Academic Background',
    'formation.title': 'Education',

    /* Contact */
    'contact.title': 'Contact',
    'contact.tagline': 'Ready to take on\nnew challenges.',
    'contact.sub1': 'Available for permanent, fixed-term, or public sector contracts.',
    'contact.sub2': 'Feel free to reach out to discuss your needs.',

    /* Footer */
    'footer.home': 'Home',
    'footer.projets': 'Projects',
    'footer.formation': 'Education',
    'footer.contact': 'Contact',
    'footer.copyright': '© 2026 Nicolas Keita — Software Engineer & IT Consultant | Nouvelle-Aquitaine, France',
  },
};