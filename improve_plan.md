# Plan d'amélioration du Portfolio

## 🚀 1. Performance

| Problème | Suggestion |
|---|---|
| **Polices Google** chargées avec `preload: false` | Passer à `preload: true` pour améliorer le FCP (First Contentful Paint) |
| **`<html lang="fr">` statique** | Le rendre dynamique en fonction de la langue sélectionnée |
| **Images non optimisées** | Utiliser `next/image` au lieu de `<img>` pour le WebP automatique, le lazy loading natif et les dimensions explicites (évite le CLS) |

---

## ♿ 2. Accessibilité

| Problème | Suggestion |
|---|---|
| **Lightbox sans focus trap** | Piéger le focus clavier dans la modale, fermeture avec la touche Escape |
| **Cartes projets cliquables** | Ajouter `role="button"` et `aria-label` pour les lecteurs d'écran |
| **Pas de "Skip to content"** | Ajouter un lien d'évitement pour la navigation au clavier |
| **Contraste des badges tech** | Les badges `bg-white/[0.08]` avec texte `text-slate-200` peuvent manquer de contraste |

---

## 🧭 3. UX & Navigation

| Problème | Suggestion |
|---|---|
| **Pas de menu mobile** | Ajouter un menu hamburger pour les écrans < 768px |
| **Pas de scroll-to-top** | Ajouter un bouton flottant pour remonter en haut après avoir scrollé |
| **Pas de loading state** | Ajouter un fichier `loading.tsx` pour le suspense Next.js |
| **Pas de page 404 personnalisée** | Créer une page `not-found.tsx` |

---

## 🏗️ 4. Architecture & Technique

| Problème | Suggestion |
|---|---|
| **`'use client'` dans App.tsx** alors que certaines sections pourraient être serveur | Déplacer les parties interactives dans des composants `'use client'` plus petits, garder le layout en serveur |
| **Pas de tests** | Ajouter des tests unitaires (Vitest) et/ou d'intégration (Playwright/Cypress) |
| **Pas d'error boundary** | Ajouter un `error.tsx` pour les erreurs de rendu |
| **PWA incomplète** | Le `manifest.json` existe mais pas de service worker → ajouter `next-pwa` ou un SW basique |
| **Gestion de la langue** | Le changement de langue ne persiste pas (perdu au refresh) → utiliser localStorage ou un cookie |

---

## 🎨 5. Contenu & Design

| Problème | Suggestion |
|---|---|
| **Pas de section "À propos"** | Une section dédiée avec une biographie plus détaillée |
| **Formation en liste simple** | Pourrait être une timeline visuelle plus engageante |
| **Pas de témoignages** | Ajouter une section recommandations / avis |
| **Pas de blog** | Même un mini-blog technique renforcerait la crédibilité |

---

## 🎯 Recommandations prioritaires (quick wins à fort impact)

1. **Images optimisées** → `next/image` avec dimensions explicites (améliore CLS et performance)
2. **Focus trap + Escape sur la lightbox** → Accessibilité essentielle
3. **Menu mobile** → UX sur téléphone
4. **Persistance de la langue** → localStorage
5. **Page 404 + error boundary** → Robustesse