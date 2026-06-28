import { Skill } from '../../types';

export const skillsMap: Skill[] = [
  {
    id: 'dev',
    icon: '#i-code',
    label: 'Développement Web',
    labelEn: 'Web Development',
    proof: `
      Les projets Tactic-Nav, Champ Select Winrate et même ce site démontrent ma capacité
      à travailler sur une stack web : React, APIs, Cloud, Conteneurisation, Bases de données
    `.trim(),
    proofEn: `
      The projects Tactic-Nav, Champ Select Winrate and even this site demonstrate
      my ability to work on a web stack: React, APIs, Cloud, Containerization, Databases
    `.trim(),
  },
  {
    id: 'mobile',
    icon: '#i-smartphone',
    label: 'Développement Mobile',
    labelEn: 'Mobile Development',
    proof: `
      Le projet Tactic-Nav illustre mon expertise en développement Android,
      applicable aussi bien aux applications mobiles grand public qu'aux systèmes
      embarqués de l'aviation civile et militaire, soumis à des critères de performance stricts.
    `.trim(),
    proofEn: `
      The Tactic-Nav project illustrates my expertise in Android development,
      applicable both to mainstream mobile applications and to embedded systems
      in civil and military aviation, subject to strict performance criteria.
    `.trim(),
  },
  {
    id: 'ai',
    icon: '#i-robot',
    label: 'Intelligence Artificielle',
    labelEn: 'Artificial Intelligence',
    proof: `
      De la création d'un agent IA à son entraînement puis à son utilisation,
      je maîtrise les fondamentaux de l'intelligence artificielle.
      Ces concepts, étudiés notamment à travers les cours de Stanford,
      sont mis en pratique sur les défis OpenAI Gym.
    `.trim(),
    proofEn: `
      From creating an AI agent to training it and using it,
      I master the fundamentals of artificial intelligence.
      These concepts, studied notably through Stanford courses,
      are put into practice on OpenAI Gym challenges.
    `.trim(),
  },
  {
    id: 'arch',
    icon: '#i-layout',
    label: 'Architecture Logicielle',
    labelEn: 'Software Architecture',
    proof: `
      Mes participations à diverses chasses aux bugs m'ont mené à un constat :
      la majorité des entreprises font face à de lourds problèmes d'architecture
      nés de l'accumulation de couches de code au fil des années.
      Ce sont des défis de dette technique complexes que les IA ne peuvent pas résoudre
      et qui exigent une restructuration profonde. Mon travail sur le projet Mudlet en est une parfaite illustration.
    `.trim(),
    proofEn: `
      My participation in various bug hunts led me to a realization:
      the majority of companies face heavy architecture problems
      born from layers of code accumulated over the years.
      These are complex technical debt challenges that AIs cannot solve
      and that require deep restructuring. My work on the Mudlet project is a perfect illustration.
    `.trim(),
  },
  {
    id: 'algo',
    icon: '#i-branch',
    label: 'Algorithmique',
    labelEn: 'Algorithmics',
    proof: `
      Derrière chaque agent IA autonome se cache de l'algorithmique de pointe.
      Mon projet AI Mars Lander en est l'illustration : modélisation de trajectoire,
      optimisation de ressources et résolution de problèmes complexes sous contraintes
    `.trim(),
    proofEn: `
      Behind every autonomous AI agent lies cutting-edge algorithmics.
      My project AI Mars Lander illustrates this: trajectory modeling,
      resource optimization, and solving complex problems under constraints
    `.trim(),
  },
  {
    id: 'client',
    icon: '#i-user-check',
    label: 'Relation client',
    labelEn: 'Client relations',
    accent: true,
    proof: `
      Sur le projet Mudlet, j'ai affiné mon sens de la relation client en traduisant
      directement les retours et les plaintes des utilisateurs en corrections de bugs concrètes.
    `.trim(),
    proofEn: `
      On the Mudlet project, I refined my client relations skills by directly translating
      user feedback and complaints into concrete bug fixes.
    `.trim(),
  },
  {
    id: 'conseil',
    icon: '#i-bulb',
    label: 'Conseil',
    labelEn: 'Consulting',
    accent: true,
    proof: `
      Mon activité de freelance m'a amené à accompagner mes clients dans leurs choix techniques.
      Je fais preuve de pédagogie en utilisant des schémas d'architecture, des maquettes
      et des tableaux comparatifs pour faciliter la compréhension et la prise de décision.
    `.trim(),
    proofEn: `
      My freelance work led me to support clients in their technical choices.
      I take a pedagogical approach, using architecture diagrams, mockups,
      and comparative tables to facilitate understanding and decision-making.
    `.trim(),
  },
  {
    id: 'rigueur',
    icon: '#i-target',
    label: 'Tests & Qualité produit',
    labelEn: 'Testing & Product Quality',
    accent: true,
    proof: `
      J'ai participé à Mudlet et Tactic-Nav, deux projets où les tests étaient cruciaux.
      Sur Mudlet, avec des milliers d'utilisateurs qui signalent des bugs chaque jour,
      mon rôle a été de déployer des tests en masse pour stabiliser l'app.
      Sur Tactic-Nav (aviation), l'enjeu était d'éviter tout crash en plein vol.
    `.trim(),
    proofEn: `
      I worked on Mudlet and Tactic-Nav, two projects where testing was crucial.
      On Mudlet, with thousands of users reporting bugs every day,
      my role was to deploy mass testing to stabilize the app.
      On Tactic-Nav (aviation), the stakes were to avoid any in-flight crash.
    `.trim(),
  },
  {
    id: 'team',
    icon: '#i-users',
    label: "Équipe",
    labelEn: 'Teamwork',
    accent: true,
    proof: `
      Aujourd'hui, toutes les écoles de coding imposent des projets en équipe,
      c'était le cas pour 95% de mon cursus. C'est un cadre dont j'ai beaucoup bénéficié,
      notamment avec les méthodes Agiles, pour apprendre à aligner le travail de chacun
      afin de bâtir un produit cohérent.
    `.trim(),
    proofEn: `
      Today, all coding schools require team projects—this was the case for 95% of my curriculum.
      I benefited greatly from this framework, notably through Agile methodologies,
      to learn how to align everyone's work and build a cohesive product.
    `.trim(),
  },
];
