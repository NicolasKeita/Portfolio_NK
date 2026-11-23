# Portfolio — Nicolas Keita

> Développeur logiciel · IA appliquée — Nouvelle-Aquitaine, France

Dernière mise à jour : **23 novembre 2026**. Ce document reprend le contenu français
du site et de ses modales à partir de `src/i18n/locales/` et des composants
d'affichage, dans l'ordre de l'interface. Les exports automatiques des projets sont
décrits dans [PORTFOLIO_EXPORTS.md](PORTFOLIO_EXPORTS.md).

---

## 🧭 Navigation

- **NK.** — Retour à l'accueil
- **Formation**
- **Projets**
- **Contact**
- **EN** — *Passer en anglais*
- **Aller au contenu principal** — Lien d'évitement affiché au focus clavier

---

## 🚀 Hero

**Nom :** Nicolas Keita

**Rôle :** Développeur logiciel · IA appliquée

**Objectif :** Je recherche une immersion professionnelle en ingénierie IA.

**Actions :**

- Voir mes réalisations
- [Consulter mon CV (PDF)](/cv-nicolas-keita-fr.pdf)
- Me contacter

---

## 💡 Ingénieur Logiciel

La combinaison d'ingrédients incontournables qui définit le standard d'une ingénierie logicielle réussie.

### Compétences

#### Développement Web

Les projets Tactic-Nav, Champ Select Winrate et même ce site démontrent ma capacité à travailler sur une stack web : React, APIs, Cloud, Conteneurisation, Bases de données

#### Développement Mobile

Le projet Tactic-Nav illustre mon expertise en développement Android, applicable aussi bien aux applications mobiles grand public qu'aux systèmes embarqués de l'aviation civile et militaire, soumis à des critères de performance stricts.

#### Intelligence Artificielle

De la création d'un agent IA à son entraînement puis à son utilisation, je maîtrise les fondamentaux de l'intelligence artificielle. Ces concepts, étudiés notamment à travers les cours de Stanford, sont mis en pratique sur les défis OpenAI Gym.

#### Architecture Logicielle

Mes participations à diverses chasses aux bugs m'ont mené à un constat : la majorité des entreprises font face à de lourds problèmes d'architecture nés de l'accumulation de couches de code au fil des années. Ce sont des défis de dette technique complexes que les IA ne peuvent pas résoudre et qui exigent une restructuration profonde. Mon travail sur le projet Mudlet en est une parfaite illustration.

#### Algorithmique

Derrière chaque agent IA autonome se cache de l'algorithmique de pointe. Mon projet AI Mars Lander en est l'illustration : modélisation de trajectoire, optimisation de ressources et résolution de problèmes complexes sous contraintes

#### Relation client

Sur le projet Mudlet, j'ai affiné mon sens de la relation client en traduisant directement les retours et les plaintes des utilisateurs en corrections de bugs concrètes.

#### Conseil

Mon activité de freelance m'a amené à accompagner mes clients dans leurs choix techniques. Je fais preuve de pédagogie en utilisant des schémas d'architecture, des maquettes et des tableaux comparatifs pour faciliter la compréhension et la prise de décision.

#### Tests & Qualité produit

J'ai participé à Mudlet et Tactic-Nav, deux projets où les tests étaient cruciaux. Sur Mudlet, avec des milliers d'utilisateurs qui signalent des bugs chaque jour, mon rôle a été de déployer des tests en masse pour stabiliser l'app. Sur Tactic-Nav (aviation), l'enjeu était d'éviter tout crash en plein vol.

#### Équipe

Aujourd'hui, toutes les écoles de coding imposent des projets en équipe, c'était le cas pour 95% de mon cursus. C'est un cadre dont j'ai beaucoup bénéficié, notamment avec les méthodes Agiles, pour apprendre à aligner le travail de chacun afin de bâtir un produit cohérent.

---

## 🛠️ Projets — Réalisations

### 1. Solution IA de triage et d’investigation des sinistres d’assurance

| | |
|---|---|
| **Tag** | IA appliquée |
| **Technologies** | Python, Machine Learning, Vision, RAG, MLOps |
| **Lien** | https://github.com/NicolasKeita/insurance_claims_ai_triage |
| **Statut** | Démo disponible |
| **Démo** | [Explorer la démo](/insurance-demo/?lang=fr) |

**Tags :** IA appliquée · Machine learning

**Le projet en une phrase :**

Outil d’aide au triage et à l’investigation des sinistres automobiles.

**Aperçu du projet :**

- Extraction de données depuis les documents et analyse des photos de dommages
- Évaluation de la sévérité, détection d'anomalies et orientation des dossiers
- Recherche des clauses du contrat et des procédures avec citations des sources
- Recommandations explicables et validation finale par un gestionnaire

**Description du projet :**

Plateforme d’aide aux gestionnaires de sinistres automobiles : elle extrait les informations des déclarations, contrats, devis et photos, puis prépare un dossier structuré pour le triage et l’investigation.

Le système combine analyse de documents et d’images, modèles de sévérité et de risque, recherche des clauses contractuelles par RAG et agent d’investigation. Il signale les informations manquantes et les incohérences, propose un parcours de traitement et justifie ses recommandations avec leurs sources.

La démo interactive présente des cas synthétiques et des résultats préparés. Les décisions juridiques et financières restent soumises à une validation humaine.

---

### 2. Drone - Contrôle de vol embarqué et sûreté

| | |
|---|---|
| **Tag** | Systèmes embarqués |
| **Technologies** | C++23, STM32, Zephyr, SIL / HIL, React, Three.js |
| **Lien** | https://github.com/NicolasKeita/Embedded_Work_On_Drone |

**Tags :** Systèmes embarqués · C++ · Avionique

**Le projet en une phrase :**

Logiciel embarqué de drone + Bancs de test pour valider le contrôle de vol et la gestion des pannes sur un aéronef simulé.

**Aperçu du projet :**

- Simulation SIL, HIL loopback et HIL physique sur deux STM32 sous Zephyr
- Injection de fautes, scénarios de validation et campagnes Monte Carlo
- Documentation technique et analyse FMECA des modes de défaillance, de leurs effets et de leur criticité
- Visualisation de télémétrie en direct et en relecture avec un Digital Twin

**Description du projet :**

Banc de développement et de validation d'un système de contrôle de vol distribué pour un aéronef simulé. Le contrôleur FC1 pilote la mission et les commandes, tandis que FC2 supervise l'état du système et participe à la gestion des fautes.

Le même cœur logiciel est exercé en simulation à pas fixe (SIL), en boucle HIL locale et sur deux cartes Nucleo-L476RG avec firmwares Zephyr. Le PC conserve le modèle de l'aéronef, des capteurs et des actionneurs. Des scénarios de fautes, une campagne Monte Carlo et une matrice de traçabilité structurent la validation. Un visualiseur Digital Twin en React et Three.js affiche la télémétrie en direct ou en relecture.

La documentation technique accompagne la conception et la validation du système. Elle inclut une analyse FMECA (analyse des modes de défaillance, de leurs effets et de leur criticité) pour étudier les pannes et leur impact sur le contrôle de vol, en complément des scénarios de fautes et de la matrice de traçabilité.

Le projet est un banc d'ingénierie : les performances du HIL physique et l'aptitude au vol réel ne sont pas établies par une campagne de mesures publiée.

---

### 3. IA et Reinforcement Learning — Mars Lander, Lunar Lander et défis OpenAI Gym

| | |
|---|---|
| **Tag** | Machine learning |
| **Technologies** | Python, Reinforcement Learning, Deep Learning, OpenAI Gym |
| **Profil GitHub (données / export)** | https://github.com/NicolasKeita |

**Liens « Voir le code » :**

- [Rocket Landing](https://github.com/NicolasKeita/Rocket_Landing_Genetic_Algorithm)
- [Mini - Runner AI](https://github.com/NicolasKeita/Runner_AI)
- [Mini - Self Driving Car AI](https://github.com/NicolasKeita/Self_Driving_Car_AI)

**Le projet en une phrase :**

Développement d'agents autonomes par Reinforcement Learning (Q-Learning, Policy Gradient)

**Aperçu du projet :**

- Environnements multiples : OpenAI Gym, Codingame Mars Lander, Lunar Lander
- Prise de décision temps réel en espace d'état continu avec contraintes physiques
- Analyse des fonctions de récompense et optimisation par reward shaping et hyperparamètres
- Étude basée sur le cours CS234 Reinforcement Learning de Stanford University

**Défis techniques :**

Je maîtrise les principes de création de l'IA, et ce projet prouve ma capacité
à développer des agents intelligents et à conduire des travaux complexes
fondés sur l'étude de publications scientifiques de pointe.

**Description du projet :**

Développement d'agents autonomes utilisant des techniques de Reinforcement Learning sur plusieurs environnements OpenAI Gym, ainsi que sur Mars Lander (Codingame) et Lunar Lander.

Le projet explore la conception d'agents capables de prendre des décisions en temps réel dans un espace
d'état continu, avec contraintes physiques (gravité, poussée, carburant, stabilité). Ces environnements
constituent des cas d'étude classiques pour des problématiques de contrôle, de prise de décision séquentielle et d'optimisation.

Travail réalisé :

- Implémentation d'agents basés sur des méthodes de Reinforcement Learning (Q-Learning, algorithmes de type Policy Gradient) et exploration de réseaux de neurones pour le Deep Learning
- Entraînement sur des environnements OpenAI Gym et adaptation sur un environnement Codingame (Mars Lander)
- Analyse des fonctions de récompense et de leur impact sur l'apprentissage et les performances des agents
- Optimisation des performances d'atterrissage via l'ajustement des hyperparamètres et le reward shaping
- Étude comparative des comportements des agents selon les architectures testées

Formation des compétences via des ressources académiques en ligne, notamment le cours de Reinforcement Learning CS234 de Stanford University.

---

### 4. Mudlet

| | |
|---|---|
| **Tag** | Architecture / Refactoring |
| **Technologies** | C++, Qt, Sentry, Tests fonctionnels, Architecture modulaire |
| **Lien** | https://github.com/Mudlet/Mudlet/pulls?q=is%3Apr+is%3Aclosed+author%3ANicolasKeita |

**Tags :** Architecture / Refactoring · Open Source · C++ / Qt

**Le projet en une phrase :**

Application desktop de gaming open-source (C++/Qt) pour joueurs et créateurs de jeux

**Aperçu du projet :**

- Intégration de Sentry (crash reporting) dans un codebase C++/Qt legacy de 15+ ans
- Mise en place de tests fonctionnels fiables sur une plateforme ouverte de gaming
- Correction de bugs critiques enfouis dans un codebase legacy massif
- Modularisation : détachement du front-end Qt du cœur logiciel pour préparer une version mobile
- Victoires récurrentes en compétitions internationales de bug bounty sur Algora.io

**Défis techniques :**

Cette expérience met en évidence ma capacité à comprendre rapidement
des codebases énormes et complexes sous contrainte de temps.

Lors de compétitions internationales de chasse aux bugs rémunérées
(sur Algora.io), j'ai à plusieurs reprises identifié et corrigé des problèmes
avant d'autres participants, notamment des ingénieurs logiciels issus
des États-Unis, de Chine et d'Inde, afin d'obtenir la prime associée.

**Description du projet :**

Mudlet (C++/Qt) est une plateforme opensource pour jeux vidéo comme Steam.
J'ai réalisé plusieurs milestones majeurs sur lesquels l'équipe bloquait
depuis des années :

- Intégration de Sentry (crash reporting)
- Mise en place de tests fonctionnels fiables.
- Correction de bugs profondément enfouis dans un codebase de plus de 15 ans.
- Rendre Mudlet modulaire : détacher le front-end Qt du cœur du logiciel
  afin de préparer une version mobile et d'adopter un front-end plus adapté
  que Qt pour les mobiles.

---

### 5. Tactic-Nav

| | |
|---|---|
| **Tag** | Avionique |
| **Technologies** | Java, Android, Temps réel |
| **Lien** | https://github.com/NicolasKeita/Tactic-Nav |

**Tags :** Avionique · Java

**Le projet en une phrase :**

Application Android embarquée de surveillance aérienne en temps réel via le protocole ADS-B

**Aperçu du projet :**

- Tests automatisés (unitaires, intégration, performance) garantissant zéro crash en vol
- Optimisation bas niveau (Java/Android) pour maintien des FPS sous contrainte temps réel
- Validation par benchmarking des performances sur cible embarquée

**Défis techniques :**

Au-delà de son contexte aéronautique, ce projet constitue un exercice complet d'ingénierie logicielle couvrant :

- le développement mobile Android
- l'assurance d'une application sans crash grâce à des tests automatisés variés
- l'optimisation bas niveau nécessaire au respect d'objectifs de performance stricts
  (aucun crash ni perte de FPS n'est autorisé en plein vol), avec validation par benchmarking

**Description du projet :**

Système embarqué Android de surveillance aérienne exploitant le protocole ADS-B,
standard utilisé en aviation réelle pour la transmission de position des aéronefs,
pour la réception et la visualisation cartographique en temps réel du trafic aérien.

---

### 6. Champ Select Winrate

| | |
|---|---|
| **Tag** | Web |
| **Technologies** | React, AWS, Full-stack |
| **Lien** | https://github.com/NicolasKeita/Champ_select_winrate |

**Le projet en une phrase :**

Application desktop companion pour League of Legends (70k téléchargements)

**Aperçu du projet :**

- Intégration d'API Riot Games pour l'analyse des winrates en phase de sélection
- Architecture full-stack React + AWS (déploiement cloud)
- Collaboration avec les équipes QA d'Overwolf jusqu'à validation du produit
- Déploiement et distribution via la plateforme Overwolf

**Défis techniques :**

Au-delà du développement web, ce projet illustre ma capacité à construire un produit complet : intégration d'API tierces, architecture full-stack React/AWS, déploiement cloud et collaboration avec les équipes QA d'Overwolf jusqu'à la validation du produit.

**Description du projet :**

Application compagnon desktop pour League of Legends (70k téléchargements). Dev web full-stack, React, AWS.

---

## 🎓 Formation — Parcours Académique

### Intelligence Artificielle, apprentissage par renforcement (reinforcement learning) (CS234)

*Stanford University, Californie — 6 mois*

Cours en ligne encadré par Emma Brunskill, incluant les processus de décision markoviens (MDP), les méthodes à différences temporelles (TD) et les algorithmes de Q-learning.

### École d'informatique (pédagogie par projets)

*EPITECH Paris — 3 Ans*

Major de promotion. Formation orientée développement logiciel, autonomie, travail en équipe, culture de l'innovation et approche produit.

### Licence de Physique

*Sorbonne Université (Paris VI) — 2 Ans*

Physique fondamentale, mathématiques appliquées et modélisation, développant une rigueur scientifique et une approche analytique.

### Baccalauréat professionnel Systèmes Numériques Électroniques

*Lycée Eugène Ionesco*

Électronique numérique, réseaux et systèmes embarqués. Bases en électronique et traitement du signal (analyse fréquentielle, séries de Fourier).

---

## 📬 Contact

**Proposer une immersion**

Je souhaite contribuer à la conception, à l’évaluation et à l’intégration de modèles d’IA dans des applications.

Échangeons sur vos projets et les modalités de l’immersion.

| Type | Valeur |
|---|---|
| **Email** | nicolas.keita@epitech.eu |
| **Téléphone** | +33 7 54 84 26 88 *(Appels masqués non acceptés)* |
| **Lieu de résidence** | Nouvelle-Aquitaine |
| **Mobilité** | France & International *(Passeport valide)* |
| **Nationalité** | Française |
| **Casier judiciaire** | Vierge |
| **Langues** | Français natif *(Anglais professionnel)* |
| **Disponibilité** | En recherche active |

---

## ⚙️ Modal — Textes d'interface

- **Fermer** — Bouton de fermeture des fenêtres modales
- **Voir le code** — Lien vers le code source d'un projet
- **Explorer la démo** — Lien vers la démo du projet d'IA assurance
- **Note de la démo :** Explorez des dossiers fictifs, leurs documents et les analyses déjà réalisées pour comprendre chaque recommandation.
- **Le projet en une phrase** — Premier élément de l'aperçu du projet
- **Défis techniques** — Section des modales projets
- **Aperçu du projet** — Éléments suivants de l'aperçu du projet
- **Description du projet** — Section des modales projets

---

## 🦶 Footer

- Accueil
- Projets
- Formation
- Contact

© 2026 Nicolas Keita — Développeur logiciel · IA appliquée | Nouvelle-Aquitaine, France
