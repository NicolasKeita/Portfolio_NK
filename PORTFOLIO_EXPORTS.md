# Exports des projets

Trois fichiers sont accessibles sans JavaScript, sans changer les cartes ou les modales :

- `/portfolio.fr.md` : tous les projets en français.
- `/portfolio.en.md` : tous les projets en anglais.
- `/projects.json` : les deux langues, regroupées dans `projects.fr` et `projects.en`.

Chaque projet contient son titre, ses catégories, son statut éventuel, sa description
complète, ses défis techniques éventuels, son aperçu, ses technologies et ses liens
(modale du portfolio, GitHub et démo lorsqu'elle existe). Les URL internes sont
relatives à la racine du site ; les liens de modale et de démo précisent la langue.

Les Route Handlers Next.js utilisent les mêmes données et traductions TOML que
l'interface, dans le même ordre. Modifier les fichiers de
`src/i18n/locales/projects/` pour actualiser le contenu ; aucun export n'est à
maintenir manuellement.

`npm run dev` sert les trois URL localement. `npm run build` les génère directement
dans `out/`, également lors de `npm run build:with-demo`. Firebase Hosting sert ces
fichiers avec leurs types MIME et leur encodage UTF-8 configurés dans `firebase.json`.
Ils seront disponibles sur le site au prochain déploiement habituel.

Ces URL peuvent être fournies directement à un scraper ou à un assistant IA.
Leur consultation automatique par ces outils n'est pas garantie.
