import { Skill, SkillCard, Project, Formation, ContactItem } from '../types';
import tacticNavAndroid from '../assets/tactic-nav/Android_app_2.png';
import tacticNavBacklog from '../assets/tactic-nav/backlog_backend.png';
import tacticNavCockpit from '../assets/tactic-nav/cockpit.png';
import tacticNavSchema from '../assets/tactic-nav/schema_architecture.png';
import marsLanderCodingame from '../assets/mars-lander/codinggame_mars_lander.png';
import marsLanderHumanoid from '../assets/mars-lander/humanoid_standup.gif';
import marsLanderFalcon9Landing from '../assets/mars-lander/space_x_falcon_9_landing.png';
import marsLanderFalcon9Launch from '../assets/mars-lander/space_X_falcon_9_launch.png';

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
    prologue: 'Au-delà de son contexte aéronautique, ce projet constitue un exercice complet d\'ingénierie logicielle couvrant :\n- le développement mobile Android\n- l\'assurance d\'une application sans crash grâce à des tests automatisés variés\n- l\'optimisation bas niveau nécessaire au respect d\'objectifs de performance stricts (aucun crash ni perte de FPS n\'est autorisé en plein vol), avec validation par benchmarking',
    prologueEn: 'Beyond its aeronautical context, this project is a complete software engineering exercise covering:\n- Android mobile development\n- ensuring a crash-free application through various automated tests\n- low-level optimization required to meet strict performance targets (no crashes or FPS drops allowed during flight), validated through benchmarking',
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
    title: 'IA et Reinforcement Learning — Mars Lander, Lunar Lander et défis OpenAI Gym',
    titleEn: 'AI and Reinforcement Learning — Mars Lander, Lunar Lander and OpenAI Gym challenges',
    description: 'Développement d\'agents autonomes utilisant des techniques de Reinforcement Learning sur plusieurs environnements OpenAI Gym, ainsi que sur Mars Lander (Codingame) et Lunar Lander.\n\nLe projet explore la conception d\'agents capables de prendre des décisions en temps réel dans un espace d\'état continu, avec contraintes physiques (gravité, poussée, carburant, stabilité). Ces environnements constituent des cas d\'étude classiques pour des problématiques de contrôle, de prise de décision séquentielle et d\'optimisation.\n\nTravail réalisé :\n\n* Implémentation d\'agents basés sur des méthodes de Reinforcement Learning (Q-Learning, algorithmes de type Policy Gradient)\n* Entraînement sur des environnements OpenAI Gym et adaptation sur un environnement Codingame (Mars Lander)\n* Analyse des fonctions de récompense et de leur impact sur l\'apprentissage et les performances des agents\n* Optimisation des performances d\'atterrissage via l\'ajustement des hyperparamètres et le reward shaping\n* Étude comparative des comportements des agents selon les architectures testées\n\nFormation des compétences via des ressources académiques en ligne, notamment le cours de Reinforcement Learning CS234 de Stanford University.',
    descEn: 'Development of autonomous agents using Reinforcement Learning techniques across multiple OpenAI Gym environments, as well as Mars Lander (Codingame) and Lunar Lander.\n\nThe project explores the design of agents capable of making real-time decisions in a continuous state space, with physical constraints (gravity, thrust, fuel, stability). These environments are classic case studies for control problems, sequential decision-making, and optimization.\n\nWork accomplished:\n\n* Implementation of agents based on Reinforcement Learning methods (Q-Learning, Policy Gradient algorithms)\n* Training on OpenAI Gym environments and adaptation to a Codingame environment (Mars Lander)\n* Analysis of reward functions and their impact on agent learning and performance\n* Landing performance optimization via hyperparameter tuning and reward shaping\n* Comparative study of agent behaviors across tested architectures\n\nSkill development through online academic resources, including Stanford University\'s CS234 Reinforcement Learning course.',
    prologue: 'Je maîtrise les principes de création de l\'IA, et ce projet prouve ma capacité à développer des agents intelligents et à conduire des travaux complexes fondés sur l\'étude de publications scientifiques de pointe.',
    prologueEn: 'I master the principles of AI creation, and this project proves my ability to develop intelligent agents and conduct complex work based on the study of cutting-edge scientific publications.',
    techs: ['Python', 'Reinforcement Learning', 'OpenAI Gym'],
    link: 'https://github.com/NicolasKeita',
    photos: [
      marsLanderCodingame,
      marsLanderFalcon9Landing,
      marsLanderFalcon9Launch,
      marsLanderHumanoid,
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
    prologue: 'Ce projet sert à démontrer mon talent dans le développement logiciel.',
    prologueEn: 'This project showcases my talent in software development.',
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
    prologue: 'Ce projet sert à démontrer mon talent dans le développement logiciel.',
    prologueEn: 'This project showcases my talent in software development.',
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