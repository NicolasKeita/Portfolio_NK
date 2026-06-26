import { Project } from '../../types';
import tacticNavAndroid from '../../assets/tactic-nav/Android_app_2.png';
import tacticNavBacklog from '../../assets/tactic-nav/backlog_backend.png';
import tacticNavCockpit from '../../assets/tactic-nav/cockpit.png';
import tacticNavSchema from '../../assets/tactic-nav/schema_architecture.png';
import marsLanderCodingame from '../../assets/mars-lander/codinggame_mars_lander.png';
import marsLanderHumanoid from '../../assets/mars-lander/humanoid_standup.gif';
import marsLanderFalcon9Landing from '../../assets/mars-lander/space_x_falcon_9_landing.png';
import marsLanderFalcon9Launch from '../../assets/mars-lander/space_X_falcon_9_launch.png';
import mudletAlgora from '../../assets/mudlet/algora.io.png';
import mudletGame1 from '../../assets/mudlet/game_1.png';
import mudletGame2 from '../../assets/mudlet/game_2.png';
import champSelectScreenshot1 from '../../assets/champ-select/CSW_1.jpg';
import champSelectScreenshot2 from '../../assets/champ-select/CSW_2.jpg';

export const projects: Project[] = [
  {
    id: 'tactic-nav',
    tag: 'Avionique',
    tagClass: 'tag-mobile',
    title: 'Tactic-Nav',
    description: [
      "Système embarqué Android de surveillance aérienne exploitant le protocole ADS-B,",
      "standard utilisé en aviation réelle pour la transmission de position des aéronefs,",
      "pour la réception et la visualisation cartographique en temps réel du trafic aérien.",
    ].join(' '),
    descEn: [
      "Android embedded system for air surveillance using the ADS-B protocol,",
      "a standard used in real aviation for aircraft position transmission,",
      "receiving and displaying real-time air traffic on a map.",
    ].join(' '),
    prologue: [
      "Au-delà de son contexte aéronautique, ce projet constitue un exercice complet",
      "d'ingénierie logicielle couvrant :\n- le développement mobile Android",
      "- l'assurance d'une application sans crash grâce à des tests automatisés variés",
      "- l'optimisation bas niveau nécessaire au respect d'objectifs de performance stricts",
      "(aucun crash ni perte de FPS n'est autorisé en plein vol), avec validation par benchmarking",
    ].join('\n'),
    prologueEn: [
      "Beyond its aeronautical context, this project is a complete software engineering",
      "exercise covering:\n- Android mobile development",
      "- ensuring a crash-free application through various automated tests",
      "- low-level optimization required to meet strict performance targets",
      "(no crashes or FPS drops allowed during flight), validated through benchmarking",
    ].join('\n'),
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
    description: [
      "Développement d'agents autonomes utilisant des techniques de Reinforcement Learning",
      "sur plusieurs environnements OpenAI Gym, ainsi que sur Mars Lander (Codingame)",
      "et Lunar Lander.\n\n",
      "Le projet explore la conception d'agents capables de prendre des décisions en temps réel",
      "dans un espace d'état continu, avec contraintes physiques (gravité, poussée,",
      "carburant, stabilité). Ces environnements constituent des cas d'étude classiques",
      "pour des problématiques de contrôle, de prise de décision séquentielle et d'optimisation.\n\n",
      "Travail réalisé :\n\n",
      "* Implémentation d'agents basés sur des méthodes de Reinforcement Learning",
      "(Q-Learning, algorithmes de type Policy Gradient)",
      "* Entraînement sur des environnements OpenAI Gym et adaptation sur un environnement",
      "Codingame (Mars Lander)",
      "* Analyse des fonctions de récompense et de leur impact sur l'apprentissage",
      "et les performances des agents",
      "* Optimisation des performances d'atterrissage via l'ajustement",
      "des hyperparamètres et le reward shaping",
      "* Étude comparative des comportements des agents selon les architectures testées\n\n",
      "Formation des compétences via des ressources académiques en ligne,",
      "notamment le cours de Reinforcement Learning CS234 de Stanford University.",
    ].join(' '),
    descEn: [
      "Development of autonomous agents using Reinforcement Learning techniques",
      "across multiple OpenAI Gym environments, as well as Mars Lander (Codingame)",
      "and Lunar Lander.\n\n",
      "The project explores the design of agents capable of making real-time decisions",
      "in a continuous state space, with physical constraints (gravity, thrust, fuel,",
      "stability). These environments are classic case studies for control problems,",
      "sequential decision-making, and optimization.\n\n",
      "Work accomplished:\n\n",
      "* Implementation of agents based on Reinforcement Learning methods",
      "(Q-Learning, Policy Gradient algorithms)",
      "* Training on OpenAI Gym environments and adaptation to a Codingame",
      "environment (Mars Lander)",
      "* Analysis of reward functions and their impact on agent learning and performance",
      "* Landing performance optimization via hyperparameter tuning",
      "and reward shaping",
      "* Comparative study of agent behaviors across tested architectures\n\n",
      "Skill development through online academic resources, including Stanford",
      "University's CS234 Reinforcement Learning course.",
    ].join(' '),
    prologue: [
      "Je maîtrise les principes de création de l'IA, et ce projet prouve ma capacité",
      "à développer des agents intelligents et à conduire des travaux complexes",
      "fondés sur l'étude de publications scientifiques de pointe.",
    ].join(' '),
    prologueEn: [
      "I master the principles of AI creation, and this project proves my ability",
      "to develop intelligent agents and conduct complex work based on the study",
      "of cutting-edge scientific publications.",
    ].join(' '),
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
    description: [
      "Mudlet (C++/Qt) est une plateforme opensource pour jeux vidéo comme Steam.\n",
      "J'ai réalisé plusieurs milestones majeurs sur lesquels l'équipe bloquait",
      "depuis des années :\n",
      "• Intégration de Sentry (crash reporting)\n",
      "• Mise en place de tests fonctionnels fiables.\n",
      "• Correction de bugs profondément enfouis dans un codebase de plus de 15 ans.\n",
      "• Rendre Mudlet modulaire : détacher le front-end Qt du cœur du logiciel",
      "afin de préparer une version mobile et d'adopter un front-end plus adapté",
      "que Qt pour les mobiles.",
    ].join(''),
    descEn: [
      "Mudlet (C++/Qt) is an open-source gaming platform like Steam.\n",
      "I achieved several major milestones the team had been stuck on for years:\n",
      "• Sentry integration (crash reporting)\n",
      "• Implementation of reliable functional tests.\n",
      "• Bug fixes deep within a 15+ year-old codebase.\n",
      "• Making Mudlet modular: detaching the Qt front-end from the software core",
      "to prepare a mobile version and adopt a more suitable front-end than Qt for mobile.",
    ].join(''),
    prologue: [
      "Cette expérience met en évidence ma capacité à comprendre rapidement",
      "des codebases énormes et complexes sous contrainte de temps.\n\n",
      "Lors de compétitions internationales de chasse aux bugs rémunérées",
      "(sur Algora.io), j'ai à plusieurs reprises identifié et corrigé des problèmes",
      "avant d'autres participants, notamment des ingénieurs logiciels issus",
      "des États-Unis, de Chine et d'Inde, afin d'obtenir la prime associée.",
    ].join(' '),
    prologueEn: [
      "This experience highlights my ability to quickly understand enormous",
      "and complex codebases under time constraints.\n\n",
      "During international paid bug bounty competitions (on Algora.io),",
      "I have repeatedly identified and fixed issues before other participants,",
      "including software engineers from the United States, China, and India,",
      "in order to claim the associated bounty.",
    ].join(' '),
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
    description: [
      "Application compagnon desktop pour League of Legends (70k téléchargements).",
      "Dev web full-stack, React, AWS.",
    ].join(' '),
    descEn: [
      "Desktop companion app for League of Legends (70k downloads).",
      "Full-stack web development, React, AWS.",
    ].join(' '),
    prologue: [
      "Au-delà du développement web, ce projet illustre ma capacité à construire",
      "un produit complet : intégration d'API tierces, architecture full-stack",
      "React/AWS, déploiement cloud et collaboration avec les équipes QA d'Overwolf",
      "jusqu'à la validation du produit.",
    ].join(' '),
    prologueEn: [
      "Beyond web development, this project demonstrates my ability to build",
      "a complete product: third-party API integration, full-stack React/AWS",
      "architecture, cloud deployment and collaboration with Overwolf's QA teams",
      "until product validation.",
    ].join(' '),
    techs: ['React', 'AWS', 'Full-stack'],
    link: 'https://github.com/NicolasKeita/Champ_select_winrate',
    photos: [
      champSelectScreenshot1.src,
      champSelectScreenshot2.src,
    ],
  },
];