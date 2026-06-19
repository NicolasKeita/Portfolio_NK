import { Skill, SkillCard, Project, Formation, ContactItem } from '../types';
import tacticNavAndroid from '../assets/tactic-nav/Android_app_2.png';
import tacticNavBacklog from '../assets/tactic-nav/backlog_backend.png';
import tacticNavCockpit from '../assets/tactic-nav/cockpit.png';
import tacticNavSchema from '../assets/tactic-nav/schema_architecture.png';

export const skillsMap: Skill[] = [
  { id: 'team', icon: '#i-users', label: "Travail d'équipe", labelEn: 'Teamwork', accent: true },
  { id: 'mobile', icon: '#i-smartphone', label: 'Développement mobile', labelEn: 'Mobile development' },
  { id: 'testing', icon: '#i-flask', label: 'Testings QA', labelEn: 'QA Testing' },
  { id: 'dev', icon: '#i-code', label: 'Développement', labelEn: 'Development' },
  { id: 'linux', icon: '#i-terminal', label: 'Linux/Unix', labelEn: 'Linux/Unix' },
  { id: 'automation', icon: '#i-refresh', label: 'Automatisation', labelEn: 'Automation' },
  { id: 'audit', icon: '#i-search', label: 'Audit système', labelEn: 'System audit' },
  { id: 'arch', icon: '#i-layout', label: 'Architecture', labelEn: 'Architecture' },
  { id: 'pm', icon: '#i-clipboard', label: 'Gestion de projet', labelEn: 'Project management' },
  { id: 'client', icon: '#i-user-check', label: 'Relation client', labelEn: 'Client relations', accent: true },
  { id: 'conseil', icon: '#i-bulb', label: 'Conseil', labelEn: 'Consulting', accent: true },
  { id: 'rigueur', icon: '#i-target', label: 'Rigueur', labelEn: 'Rigor', accent: true },
  { id: 'deploy', icon: '#i-send', label: 'Déploiement', labelEn: 'Deployment' },
  { id: 'maintenance', icon: '#i-wrench', label: 'Maintenance', labelEn: 'Maintenance' },
  { id: 'optim', icon: '#i-zap', label: 'Optimisation', labelEn: 'Optimization' },
  { id: 'algo', icon: '#i-branch', label: 'Algorithmique', labelEn: 'Algorithmics' },
  { id: 'struct', icon: '#i-layers', label: 'Structures de données', labelEn: 'Data structures' },
  { id: 'debug', icon: '#i-bug', label: 'Tests & Debugging', labelEn: 'Testing & Debugging' },
  { id: 'docs', icon: '#i-book', label: 'Documentation', labelEn: 'Documentation' },
  { id: 'veille', icon: '#i-eye', label: 'Veille technologique', labelEn: 'Tech watch' },
  { id: 'agile', icon: '#i-kanban', label: 'Méthodes agiles', labelEn: 'Agile methods' },
  { id: 'data', icon: '#i-bars', label: 'Analyse de données', labelEn: 'Data analysis' },
];

export const skillCards: SkillCard[] = [
  { icon: '🖥️', name: 'Systèmes & Réseaux', nameEn: 'Systems & Networks', desc: 'Administration Linux (Debian, Ubuntu), configuration réseau, routage, DNS, DHCP.', descEn: 'Linux administration (Debian, Ubuntu), network configuration, routing, DNS, DHCP.', level: 5 },
  { icon: '☕', name: 'Java / Kotlin', desc: 'Développement Android, applications embarquées, interfaces temps réel.', descEn: 'Android development, embedded applications, real-time interfaces.', level: 4 },
  { icon: '⚛️', name: 'React / TypeScript', desc: 'Applications web modernes, composants réutilisables, typage fort.', descEn: 'Modern web applications, reusable components, strong typing.', level: 4 },
  { icon: '🐍', name: 'Python', desc: 'Automatisation, scripts, analyse de données, génération PDF.', descEn: 'Automation, scripting, data analysis, PDF generation.', level: 4 },
  { icon: '🐧', name: 'Linux Avancé', nameEn: 'Advanced Linux', desc: 'Scripting shell, containers LXC/Docker, services systèmes, audit de sécurité.', descEn: 'Shell scripting, LXC/Docker containers, system services, security audit.', level: 5 },
  { icon: '🗄️', name: 'Bases de données', nameEn: 'Databases', desc: 'MySQL, PostgreSQL, MongoDB, modélisation et optimisation de requêtes.', descEn: 'MySQL, PostgreSQL, MongoDB, modeling and query optimization.', level: 3 },
  { icon: '☁️', name: 'Cloud & DevOps', desc: 'AWS (EC2, S3), CI/CD, Docker, git workflows.', descEn: 'AWS (EC2, S3), CI/CD, Docker, git workflows.', level: 3 },
  { icon: '📊', name: 'Gestion de projet', nameEn: 'Project management', desc: 'Méthodes agiles, planification, coordination multidisciplinaire.', descEn: 'Agile methods, planning, multidisciplinary coordination.', level: 4 },
];

export const projects: Project[] = [
  {
    id: 'tactic-nav',
    tag: 'Avionique',
    tagClass: 'tag-mobile',
    title: 'Tactic-Nav',
    description: 'Système embarqué Android de surveillance aérienne exploitant le protocole ADS-B, standard utilisé en aviation réelle pour la transmission de position des aéronefs, pour la réception et la visualisation cartographique en temps réel du trafic aérien.',
    descEn: 'Android embedded system for air surveillance using the ADS-B protocol, a standard used in real aviation for aircraft position transmission, receiving and displaying real-time air traffic on a map.',
    techs: ['Java', 'Android', 'Temps réel'],
    link: 'https://github.com/NicolasKeita/Tactic-Nav',
    photos: [
      tacticNavAndroid,
      tacticNavSchema,
      tacticNavBacklog,
      tacticNavCockpit,
    ],
  },
  {
    id: 'mars-lander-rl',
    tag: 'IA',
    tagClass: 'tag-ai',
    title: 'IA de Pilotage Autonome — Mars Lander, Lunar Lander et défis OpenAI Gym',
    titleEn: 'Autonomous Pilot AI — Mars Lander, Lunar Lander and OpenAI Gym challenges',
    description: 'Développement d\'agents d\'atterrissage autonomes sur environnements simulés inspirés de problèmes réels de contrôle continu. Mise en œuvre et comparaison de différentes approches de Reinforcement Learning sur des environnements de type OpenAI Gym, incluant Lunar Lander et Mars Lander (Codingame). Le projet explore la conception d\'agents capables de prendre des décisions en temps réel dans un espace d\'état continu, avec contraintes physiques (gravité, poussée, carburant, stabilité). Travail réalisé : implémentation d\'agents basés sur des méthodes de Reinforcement Learning (Q-learning, policy-based methods), entraînement sur environnements OpenAI Gym et adaptation sur un environnement Codingame (Mars Lander), analyse des fonctions de récompense et impact sur la convergence des politiques, optimisation des performances d\'atterrissage via ajustement des hyperparamètres et shaping de reward, étude comparative des comportements des agents selon les architectures testées.',
    descEn: 'Development of autonomous landing agents on simulated environments inspired by real-world continuous control problems. Implementation and comparison of different Reinforcement Learning approaches on OpenAI Gym environments, including Lunar Lander and Mars Lander (Codingame). The project explores the design of agents capable of making real-time decisions in continuous state spaces, with physical constraints (gravity, thrust, fuel, stability). Work accomplished: implementation of agents based on Reinforcement Learning methods (Q-learning, policy-based methods), training on OpenAI Gym environments and adaptation to a Codingame environment (Mars Lander), analysis of reward functions and their impact on policy convergence, landing performance optimization via hyperparameter tuning and reward shaping, comparative study of agent behaviors across tested architectures.',
    techs: ['Python', 'Reinforcement Learning', 'OpenAI Gym'],
    link: 'https://github.com/NicolasKeita',
    photos: [
      'https://picsum.photos/seed/mars1/800/500',
      'https://picsum.photos/seed/mars2/800/500',
      'https://picsum.photos/seed/mars3/800/500',
    ],
  },
  {
    id: 'mudlet',
    tag: 'Audit',
    tagClass: 'tag-audit',
    title: 'Audit et restructuration de plateforme (Mudlet)',
    titleEn: 'Platform audit and restructuring (Mudlet)',
    description: 'Analyse approfondie d\'un système de données de plus de 15 ans, identification d\'anomalies complexes, déploiement de protocoles de vérification et restructuration de l\'architecture.',
    descEn: 'In-depth analysis of a 15+ year old data system, identification of complex anomalies, deployment of verification protocols, and architecture restructuring.',
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
    descEn: 'Desktop companion app for League of Legends, over 70,000 downloads. Full-stack web development with React, deployed on AWS.',
    techs: ['React', 'AWS', 'Full-stack'],
    link: 'https://github.com/NicolasKeita/Champ_select_winrate',
    photos: [
      'https://picsum.photos/seed/champ1/800/500',
      'https://picsum.photos/seed/champ2/800/500',
      'https://picsum.photos/seed/champ3/800/500',
      'https://picsum.photos/seed/champ4/800/500',
    ],
  },
];

export const formations: Formation[] = [
  {
    title: 'Intelligence Artificielle (CS234) — Université Stanford, Californie',
    titleEn: 'Artificial Intelligence (CS234) — Stanford University, California',
    org: 'Stanford University',
    desc: 'Cours en ligne avec Emma Brunskill. Apprentissage par renforcement : MDP, TD, Q-learning.',
    descEn: 'Online course with Emma Brunskill. Reinforcement learning: MDP, TD, Q-learning.',
  },
  {
    title: '3 années à EPITECH Paris',
    titleEn: '3 years at EPITECH Paris',
    org: 'EPITECH',
    desc: 'Développement logiciel, architecture système, réseaux. Pédagogie par projets.',
    descEn: 'Software development, system architecture, networking. Project-based learning.',
  },
  {
    title: 'Licence de Physique — Sorbonne Université (Paris VI)',
    titleEn: "Bachelor's in Physics — Sorbonne University (Paris VI)",
    org: 'Sorbonne Université',
    desc: 'Physique fondamentale, mathématiques appliquées, modélisation.',
    descEn: 'Fundamental physics, applied mathematics, modeling.',
  },
  {
    title: 'Baccalauréat professionnel Systèmes Numériques Électroniques — Lycée Eugène Ionesco',
    titleEn: 'Professional Baccalaureate in Digital Electronic Systems — Lycée Eugène Ionesco',
    org: 'Lycée Eugène Ionesco',
    desc: 'Électronique numérique, câblage réseau, systèmes embarqués.',
    descEn: 'Digital electronics, network cabling, embedded systems.',
  },
];

export const contactItems: ContactItem[] = [
  { icon: '#i-mail', label: 'Email', value: 'nicolaskeita2@gmail.com', href: 'mailto:nicolaskeita2@gmail.com' },
  { icon: '#i-phone', label: 'Téléphone', labelEn: 'Phone', value: '+33 7 54 84 26 88', href: 'tel:+33754842688' },
  { icon: '#i-pin', label: 'Lieu de résidence', labelEn: 'Location', value: 'Nouvelle-Aquitaine' },
  { icon: '#i-globe', label: 'Mobilité', labelEn: 'Mobility', value: 'France & International', sub: 'Passeport valide', subEn: 'Valid passport' },
  { icon: '#i-flag', label: 'Nationalité', labelEn: 'Nationality', value: 'Française', valueEn: 'French' },
  { icon: '#i-check', label: 'Casier judiciaire', labelEn: 'Criminal record', value: 'Vierge', valueEn: 'Clean' },
  { icon: '#i-chat', label: 'Langues', labelEn: 'Languages', value: 'Français natif', valueEn: 'Native French', sub: 'Anglais professionnel', subEn: 'Professional English' },
  { icon: '#i-briefcase', label: 'Disponibilité', labelEn: 'Availability', value: 'En recherche active', valueEn: 'Actively seeking' },
];
