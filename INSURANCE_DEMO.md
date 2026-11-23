# Insurance AI sur le même domaine

Le portfolio et Insurance AI conservent leurs dépôts et leurs builds Next.js.
Le site publié contient le portfolio à `/` et l’export autonome de la démo à
`/insurance-demo/`. Les ressources Next de la démo restent sous
`/insurance-demo/_next/` : aucune copie du code métier n’est maintenue ici.

## Préparer le site complet

Utiliser une version Node compatible avec les deux projets (Node 22.13+ sur la
branche 22, ou Node 24+) et installer leurs dépendances avec `npm ci` dans chaque
projet. Le checkout Insurance AI doit être au commit enregistré dans
`insurance-demo.source.json`.

Depuis le portfolio :

```powershell
npm run build:with-demo -- --insurance-root ../insurance_claims_ai_triage
```

Le script construit Insurance AI avec `CLAIMS_REVIEW_BASE_PATH=/insurance-demo`
en mode statique, construit le portfolio, vérifie le manifeste, les dossiers et
leurs fichiers, puis copie uniquement l’export dans `out/insurance-demo/`.
`INSURANCE_AI_ROOT` peut remplacer l’argument `--insurance-root`.
`npm run build` conserve son comportement de build du portfolio seul.

## Ouvrir la démo en développement

Après avoir assemblé le site complet, lancer `npm run dev` puis ouvrir
`http://localhost:3000/insurance-demo?lang=fr`. Le serveur de développement sert
la démo et ses ressources depuis `out/insurance-demo/`, sur le même port que le
portfolio. Après un `npm run build` du portfolio seul, réassembler la démo avec
la commande ci-dessous si son export existe déjà.

Pour réassembler un export existant sans relancer les builds :

```powershell
npm run assemble:demo -- --insurance-root ../insurance_claims_ai_triage
```

Une modification de la démo se fait dans le dépôt Insurance AI. Après validation
et commit de cette modification, mettre à jour `revision` dans
`insurance-demo.source.json` avec le SHA Git complet. `--expected-ref <SHA>` permet
de vérifier explicitement un autre commit. Le build complet refuse par défaut
les sources ou exports issus de modifications non commitées ; `--allow-dirty`
est réservé à la prévisualisation locale.

## Vérifications et publication

```powershell
npm run lint
npm run test:demo-build
npm run test:demo-access
npm run build:with-demo -- --insurance-root ../insurance_claims_ai_triage
```

`test:demo-access` démarre un serveur Next.js isolé sur un port libre. Il vérifie
le lien de la fiche projet, les URL de dossiers, les ressources et les erreurs
HTTP, avec un export synthétique indépendant du dépôt Insurance AI.
Vérifier dans l’hébergement statique l’accès direct à `/insurance-demo/`, aux
PDF/photos et à une URL `?claim=...`, puis le retour à la fiche du portfolio.
Firebase sert `out/` ; sa règle de démo précède le fallback du portfolio.
Son contrôle `predeploy` vérifie l’export assemblé et le commit source épinglé ;
il refuse une publication si la démo manque ou provient de sources non commitées.
Ce contrôle peut être lancé séparément avec `npm run check:demo-build`.
La publication Firebase est une opération distincte du build.

La démo présente des cas synthétiques et des résultats précalculés. Elle ne
nécessite aucun serveur Python ni modèle en fonctionnement pendant la visite.
