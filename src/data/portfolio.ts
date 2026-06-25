import { Skill, Project, Formation, ContactItem } from '../types';
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
import champSelectScreenshot1 from '../assets/champ-select/CSW_1.jpg';
import champSelectScreenshot2 from '../assets/champ-select/CSW_2.jpg';

export const skillsMap: Skill[] = [
  { id: 'dev', icon: '#i-code', label: 'Développement', labelEn: 'Development', proof: 'React, TypeScript, Python, Java, C++ — stack varié maîtrisé.', proofEn: 'React, TypeScript, Python, Java, C++ — versatile stack mastered.' },
  { id: 'mobile', icon: '#i-smartphone', label: 'Mobile', labelEn: 'Mobile', proof: 'Application Android Tactic-Nav avec réception ADS-B et carte temps réel.', proofEn: 'Tactic-Nav Android app with ADS-B reception and real-time map.' },
  { id: 'linux', icon: '#i-terminal', label: 'Linux/Unix', labelEn: 'Linux/Unix', proof: 'Administration Debian/Ubuntu, scripting shell, Docker, LXC, audit sécurité.', proofEn: 'Debian/Ubuntu admin, shell scripting, Docker, LXC, security audit.' },
  { id: 'arch', icon: '#i-layout', label: 'Architecture', labelEn: 'Architecture', proof: 'Modularisation d\'un codebase legacy C++/Qt de 15+ ans pour préparer une version mobile.', proofEn: 'Modularized a 15+ year legacy C++/Qt codebase for a mobile version.' },
  { id: 'automation', icon: '#i-refresh', label: 'Automatisation', labelEn: 'Automation', proof: 'Scripts Python, CI/CD, génération automatisée de documents PDF.', proofEn: 'Python scripts, CI/CD, automated PDF document generation.' },
  { id: 'deploy', icon: '#i-send', label: 'Déploiement', labelEn: 'Deployment', proof: 'AWS (EC2, S3), Firebase Hosting, déploiement cloud full-stack.', proofEn: 'AWS (EC2, S3), Firebase Hosting, full-stack cloud deployment.' },
  { id: 'algo', icon: '#i-branch', label: 'Algorithmique', labelEn: 'Algorithmics', proof: 'Reinforcement Learning (Stanford CS234), agents autonomes sur OpenAI Gym.', proofEn: 'Reinforcement Learning (Stanford CS234), autonomous agents on OpenAI Gym.' },
  { id: 'data', icon: '#i-bars', label: 'Data', labelEn: 'Data', proof: 'Analyse de données, modélisation BDD (MySQL, PostgreSQL, MongoDB).', proofEn: 'Data analysis, database modeling (MySQL, PostgreSQL, MongoDB).' },
  { id: 'client', icon: '#i-user-check', label: 'Relation client', labelEn: 'Client relations', accent: true, proof: '70k téléchargements sur l\'App Store Overwolf, support et itérations selon feedback.', proofEn: '70k downloads on Overwolf App Store, support and iteration based on feedback.' },
  { id: 'conseil', icon: '#i-bulb', label: 'Conseil', labelEn: 'Consulting', accent: true, proof: 'Conseil en architecture logicielle et choix techniques pour projets variés.', proofEn: 'Software architecture and technical consulting for various projects.' },
  { id: 'rigueur', icon: '#i-target', label: 'Rigueur', labelEn: 'Rigor', accent: true, proof: 'Tests automatisés, benchmark de performance, certification sans crash en vol.', proofEn: 'Automated tests, performance benchmarking, crash-free in-flight certification.' },
  { id: 'team', icon: '#i-users', label: "Équipe", labelEn: 'Teamwork', accent: true, proof: 'Collaboration avec QA Overwolf, revue de code, coordination multidisciplinaire.', proofEn: 'Collaboration with Overwolf QA, code review, multidisciplinary coordination.' },
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
      tacticNavAndroid.src,
      tacticNavSchema.src,
      tacticNavBacklog.src,
      tacticNavCockpit.src,
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
      marsLanderCodingame.src,
      marsLanderFalcon9Landing.src,
      marsLanderFalcon9Launch.src,
      marsLanderHumanoid.src,
    ],
  },
  {
    id: 'mudlet',
    tag: 'Audit',
    tagClass: 'tag-audit',
    title: 'Mudlet',
    titleEn: 'Mudlet',
    description: 'Mudlet (C++/Qt) est une plateforme opensource pour jeux vidéo comme Steam.\nJ\'ai réalisé plusieurs milestones majeurs sur lesquels l\'équipe bloquait depuis des années :\n• Intégration de Sentry (crash reporting)\n• Mise en place de tests fonctionnels fiables.\n• Correction de bugs profondément enfouis dans un codebase de plus de 15 ans.\n• Rendre Mudlet modulaire : détacher le front-end Qt du cœur du logiciel afin de préparer une version mobile et d\'adopter un front-end plus adapté que Qt pour les mobiles.',
    descEn: 'Mudlet (C++/Qt) is an open-source gaming platform like Steam.\nI achieved several major milestones the team had been stuck on for years:\n• Sentry integration (crash reporting)\n• Implementation of reliable functional tests.\n• Bug fixes deep within a 15+ year-old codebase.\n• Making Mudlet modular: detaching the Qt front-end from the software core to prepare a mobile version and adopt a more suitable front-end than Qt for mobile.',
    prologue: 'Cette expérience met en évidence ma capacité à comprendre rapidement des codebases énormes et complexes sous contrainte de temps.\n\nLors de compétitions internationales de chasse aux bugs rémunérées (sur Algora.io), j\'ai à plusieurs reprises identifié et corrigé des problèmes avant d\'autres participants, notamment des ingénieurs logiciels issus des États-Unis, de Chine et d\'Inde, afin d\'obtenir la prime associée.',
    prologueEn: 'This experience highlights my ability to quickly understand enormous and complex codebases under time constraints.\n\nDuring international paid bug bounty competitions (on Algora.io), I have repeatedly identified and fixed issues before other participants, including software engineers from the United States, China, and India, in order to claim the associated bounty.',
    techs: ['C++', 'Qt', 'Sentry', 'Tests fonctionnels', 'Architecture modulaire'],
    link: 'https://github.com/Mudlet/Mudlet/pulls?q=is%3Apr+is%3Aclosed+author%3ANicolasKeita',
    photos: [
      mudletGame1.src,
      mudletGame2.src,
      mudletAlgora.src,
    ],
  },
  {
    id: 'champ-select',
    tag: 'Web',
    tagClass: 'tag-web',
    title: 'Champ Select Winrate',
    description: 'Application compagnon desktop pour League of Legends (70k téléchargements). Dev web full-stack, React, AWS.',
    descEn: 'Desktop companion app for League of Legends (70k downloads). Full-stack web development, React, AWS.',
    prologue: 'Au-delà du développement web, ce projet illustre ma capacité à construire un produit complet : intégration d\'API tierces, architecture full-stack React/AWS, déploiement cloud et collaboration avec les équipes QA d\'Overwolf jusqu\'à la validation du produit.',
    prologueEn: 'Beyond web development, this project demonstrates my ability to build a complete product: third-party API integration, full-stack React/AWS architecture, cloud deployment and collaboration with Overwolf\'s QA teams until product validation.',
    techs: ['React', 'AWS', 'Full-stack'],
    link: 'https://github.com/NicolasKeita/Champ_select_winrate',
    photos: [
      champSelectScreenshot1.src,
      champSelectScreenshot2.src,
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
