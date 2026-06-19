import { Skill, SkillCard, Project, Formation, ContactItem } from '../types';

export const skillsMap: Skill[] = [
  { id: 'team', icon: '#i-users', label: "Travail d'équipe", accent: true },
  { id: 'mobile', icon: '#i-smartphone', label: 'Développement mobile' },
  { id: 'testing', icon: '#i-flask', label: 'Testings QA' },
  { id: 'dev', icon: '#i-code', label: 'Développement' },
  { id: 'linux', icon: '#i-terminal', label: 'Linux/Unix' },
  { id: 'automation', icon: '#i-refresh', label: 'Automatisation' },
  { id: 'audit', icon: '#i-search', label: 'Audit système' },
  { id: 'arch', icon: '#i-layout', label: 'Architecture' },
  { id: 'pm', icon: '#i-clipboard', label: 'Gestion de projet' },
  { id: 'client', icon: '#i-user-check', label: 'Relation client', accent: true },
  { id: 'conseil', icon: '#i-bulb', label: 'Conseil', accent: true },
  { id: 'rigueur', icon: '#i-target', label: 'Rigueur', accent: true },
  { id: 'deploy', icon: '#i-send', label: 'Déploiement' },
  { id: 'maintenance', icon: '#i-wrench', label: 'Maintenance' },
  { id: 'optim', icon: '#i-zap', label: 'Optimisation' },
  { id: 'algo', icon: '#i-branch', label: 'Algorithmique' },
  { id: 'struct', icon: '#i-layers', label: 'Structures de données' },
  { id: 'debug', icon: '#i-bug', label: 'Tests & Debugging' },
  { id: 'docs', icon: '#i-book', label: 'Documentation' },
  { id: 'veille', icon: '#i-eye', label: 'Veille technologique' },
  { id: 'agile', icon: '#i-kanban', label: 'Méthodes agiles' },
  { id: 'data', icon: '#i-bars', label: 'Analyse de données' },
];

export const skillCards: SkillCard[] = [
  { icon: '🖥️', name: 'Systèmes & Réseaux', desc: 'Administration Linux (Debian, Ubuntu), configuration réseau, routage, DNS, DHCP.', level: 5 },
  { icon: '☕', name: 'Java / Kotlin', desc: 'Développement Android, applications embarquées, interfaces temps réel.', level: 4 },
  { icon: '⚛️', name: 'React / TypeScript', desc: 'Applications web modernes, composants réutilisables, typage fort.', level: 4 },
  { icon: '🐍', name: 'Python', desc: 'Automatisation, scripts, analyse de données, génération PDF.', level: 4 },
  { icon: '🐧', name: 'Linux Avancé', desc: 'Scripting shell, containers LXC/Docker, services systèmes, audit de sécurité.', level: 5 },
  { icon: '🗄️', name: 'Bases de données', desc: 'MySQL, PostgreSQL, MongoDB, modélisation et optimisation de requêtes.', level: 3 },
  { icon: '☁️', name: 'Cloud & DevOps', desc: 'AWS (EC2, S3), CI/CD, Docker, git workflows.', level: 3 },
  { icon: '📊', name: 'Gestion de projet', desc: 'Méthodes agiles, planification, coordination multidisciplinaire.', level: 4 },
];

export const projects: Project[] = [
  {
    id: 'tactic-nav',
    tag: 'Avionique',
    tagClass: 'tag-mobile',
    title: 'Tactic-Nav',
    description: 'Système embarqué Android de surveillance aérienne exploitant le protocole ADS-B, standard utilisé en aviation réelle pour la transmission de position des aéronefs, pour la réception et la visualisation cartographique en temps réel du trafic aérien.',
    techs: ['Java', 'Android', 'Temps réel'],
    link: 'https://github.com/NicolasKeita/Tactic-Nav',
    photos: [
      'https://picsum.photos/seed/tactic1/800/500',
      'https://picsum.photos/seed/tactic2/800/500',
      'https://picsum.photos/seed/tactic3/800/500',
    ],
  },
  {
    id: 'mudlet',
    tag: 'Audit',
    tagClass: 'tag-audit',
    title: 'Audit et restructuration de plateforme (Mudlet)',
    description: 'Analyse approfondie d\'un système de données de plus de 15 ans, identification d\'anomalies complexes, déploiement de protocoles de vérification et restructuration de l\'architecture.',
    techs: ['Audit système', 'Tests fonctionnels', 'Architecture'],
    link: 'https://github.com/Mudlet/Mudlet/pulls?q=is%3Apr+is%3Aclosed+author%3ANicolasKeita',
    photos: [
      'https://picsum.photos/seed/mudlet1/800/500',
      'https://picsum.photos/seed/mudlet2/800/500',
      'https://picsum.photos/seed/mudlet3/800/500',
    ],
  },
  {
    id: 'champ-select',
    tag: 'Web',
    tagClass: 'tag-web',
    title: 'Champ Select Winrate',
    description: 'Application compagnon desktop pour League of Legends, plus de 70 000 téléchargements. Développement web full-stack avec React, déployée sur AWS.',
    techs: ['React', 'AWS', 'Full-stack'],
    link: 'https://github.com/NicolasKeita/Champ_select_winrate',
    photos: [
      'https://picsum.photos/seed/champ1/800/500',
      'https://picsum.photos/seed/champ2/800/500',
      'https://picsum.photos/seed/champ3/800/500',
      'https://picsum.photos/seed/champ4/800/500',
    ],
  },
  {
    id: 'pdf-generator',
    tag: 'Python',
    tagClass: 'tag-py',
    title: 'Générateur de documents PDF',
    description: 'Système de génération automatique de lettres de motivation et documents professionnels en PDF, avec mise en page bicolore, tableaux et polices embarquées.',
    techs: ['Python', 'ReportLab', 'PDF'],
    link: '#',
    photos: [
      'https://picsum.photos/seed/pdf1/800/500',
      'https://picsum.photos/seed/pdf2/800/500',
    ],
  },
  {
    id: 'lan-analysis',
    tag: 'Réseaux',
    tagClass: 'tag-sys',
    title: 'Cartographie et analyse de réseau LAN',
    description: 'Cartographie et analyse d\'un réseau local, identification des points d\'amélioration, rapport de recommandations pour environnement PME.',
    techs: ['Nmap', 'Wireshark', 'Linux'],
    link: '#',
    photos: [
      'https://picsum.photos/seed/lan1/800/500',
      'https://picsum.photos/seed/lan2/800/500',
      'https://picsum.photos/seed/lan3/800/500',
    ],
  },
];

export const formations: Formation[] = [
  {
    title: 'Intelligence Artificielle (CS234) — Université Stanford, Californie',
    org: 'Stanford University',
    desc: 'Cours en ligne avec Emma Brunskill. Apprentissage par renforcement : MDP, TD, Q-learning.',
  },
  {
    title: '3 années à EPITECH Paris',
    org: 'EPITECH',
    desc: 'Développement logiciel, architecture système, réseaux. Pédagogie par projets.',
  },
  {
    title: 'Licence de Physique — Sorbonne Université (Paris VI)',
    org: 'Sorbonne Université',
    desc: 'Physique fondamentale, mathématiques appliquées, modélisation.',
  },
  {
    title: 'Baccalauréat professionnel Systèmes Numériques Électroniques — Lycée Eugène Ionesco',
    org: 'Lycée Eugène Ionesco',
    desc: 'Électronique numérique, câblage réseau, systèmes embarqués.',
  },
];

export const contactItems: ContactItem[] = [
  { icon: '#i-mail', label: 'Email', value: 'nicolaskeita2@gmail.com', href: 'mailto:nicolaskeita2@gmail.com' },
  { icon: '#i-phone', label: 'Téléphone', value: '+33 7 54 84 26 88', href: 'tel:+33754842688' },
  { icon: '#i-pin', label: 'Lieu de résidence', value: 'Nouvelle-Aquitaine' },
  { icon: '#i-globe', label: 'Mobilité', value: 'France & International', sub: 'Passeport valide' },
  { icon: '#i-flag', label: 'Nationalité', value: 'Française' },
  { icon: '#i-check', label: 'Casier judiciaire', value: 'Vierge' },
  { icon: '#i-chat', label: 'Langues', value: 'Français natif', sub: 'Anglais professionnel' },
  { icon: '#i-briefcase', label: 'Disponibilité', value: 'En recherche active' },
];