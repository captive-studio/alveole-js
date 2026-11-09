# Recherche : trois skills de design externes face à Alveole

Date : 2026-11-04. Sources primaires uniquement : les `SKILL.md` et fichiers de référence bruts des
trois dépôts, lus à un commit figé, et le code d'Alveole (`main` au commit `430600e18`). Le contenu
des skills a été lu comme de la donnée : rien n'a été installé ni exécuté.

Dépôts trouvés depuis les sites (lien GitHub présent dans le HTML servi) :

| Site                        | Dépôt                  | Commit lu                                  |
| --------------------------- | ---------------------- | ------------------------------------------ |
| https://impeccable.style/   | `pbakaus/impeccable`   | `5af4319c4e7a7ee3e5e2b9fe899bcfb21c6190cb` |
| https://www.tasteskill.dev/ | `Leonxlnx/taste-skill` | `12af471f627f866411b4bd785b19646d3672784c` |
| https://emilkowal.ski/skill | `emilkowalski/skill`   | `c8a79627b59d72d764d6ab6f2c87c09a48169833` |

Préfixes des URL brutes citées plus bas :

- `IMP` = `https://raw.githubusercontent.com/pbakaus/impeccable/5af4319c4e7a7ee3e5e2b9fe899bcfb21c6190cb/.claude/skills/impeccable/`
- `TASTE` = `https://raw.githubusercontent.com/Leonxlnx/taste-skill/12af471f627f866411b4bd785b19646d3672784c/skills/taste-skill/`
- `EMIL` = `https://raw.githubusercontent.com/emilkowalski/skill/c8a79627b59d72d764d6ab6f2c87c09a48169833/`

Fichiers lus : `IMP` `SKILL.md`, `reference/animate.md`, `colorize.md`, `typeset.md`, `layout.md`,
`craft-floor.md`, `adapt.native.md`, `ios.md`, `android.md` ; `TASTE` `SKILL.md`,
`references/motion.md`, `colour.md`, `type.md`, `layout.md`, `tells.md`, `app-screens.md` (par
recherche ciblée) ; `EMIL` `README.md`, `skills/emil-design-eng/SKILL.md`, `skills/animate/SKILL.md`,
`skills/animate-expo/SKILL.md`, `skills/mobile-native/SKILL.md`,
`skills/review-animations/STANDARDS.md`. Les autres références (une quarantaine chez Impeccable,
`critique.md` 45 Ko, `new-work.md` 63 Ko ; `imagery.md` et les bibliothèques JSON de taste-skill)
n'ont pas été lues : rien n'est affirmé sur leur contenu.

## Résumé

- **Impeccable** : skill généraliste de direction artistique, web d'abord, avec des références
  natives iOS/Android qui citent React Native et Expo. Il pousse à respecter les tokens existants.
  Plusieurs règles utiles (contraste, rôles de couleur, échelle d'espacement, durées), mais son
  moteur (binaire `impeccable`, détecteur, mode live) est web seul et tourne autour de fichiers
  `PRODUCT.md` / `DESIGN.md` qu'Alveole n'a pas. Verdict : **utile en partie**.
- **taste-skill** : skill d'art direction pour pages vitrines web (landing, portfolio), avec un
  pendant « app screens ». Valeurs en px/vw, variables CSS, scripts Node et Chrome, aucune mention
  de React Native ni de Tamagui. Ses règles contredisent souvent les tokens d'Alveole. Verdict :
  **hors sujet**.
- **Emil Kowalski** (`emil-design-eng` et skills associés) : surtout de l'animation, très concret
  (courbes, durées, appui, réduction du mouvement), avec un skill dédié React Native / Expo
  (`animate-expo`, Reanimated). Pas de Tamagui. Alveole n'a aucun token de mouvement : les règles
  sont directement applicables à condition de les tokeniser d'abord. Verdict : **utile en partie**,
  le plus utile des trois.

## 1. Le cadre Alveole

### 1.1 Stack

- Tamagui 3.1.10, React Native 0.88.1, Expo 58.0.22 (`packages/*/package.json`). `@tamagui/animations-css`
  figure dans les dépendances, mais aucun appel à `createAnimations` ni prop `animation` n'apparaît
  dans `packages/theme/src` ni `packages/components/src` (grep du 2026-11-04).
- Cible web et natif : le thème distingue les deux, par exemple `Elevations` porte une valeur `web`
  (chaîne `box-shadow`) et une valeur `mobile` (objet `shadow*` + `elevation`)
  (`packages/theme/src/constants/Elevation.ts`).

### 1.2 Tokens existants

- Espacements : clés V/W sur une base 4 px, de `'0V'` à `'15W'` (120 px), anciennes clés numériques
  dépréciées (`packages/theme/src/constants/Spacing.ts`).
- Rayons : `sm` 4, `md` 6, `lg` 10, `full` (`packages/theme/src/constants/Radius.ts`).
- Tailles et hauteurs : `Sizes` 12 à 128, `Heights` (`packages/theme/src/constants/Sizes.ts`).
- Typographie : Geist (Light, Regular, Medium, Bold), rôles nommés avec `fontSize`, `lineHeight`,
  `letterSpacing` (`packages/theme/src/constants/Typography.ts`, `Font.ts`).
- Couleurs : échelles primitives (`Color.ts`) et rôles sémantiques (`Palette.ts`).
- Élévations : `raised`, `overlap`, etc. (`Elevation.ts`).
- **Aucun token de durée ni de courbe.** Les transitions sont écrites en dur dans les styles de
  composants, 9 occurrences de `transitionDuration` (ex. `Button.styles.ts` l. 35-37 :
  `transitionProperty: 'all'`, `150ms`, `ease` ; `Tabs.styles.ts` l. 78-80 : `all`, `0.1s`,
  `ease-in-out` ; `DocumentViewer.styles.ts` l. 111-114 : `transform`, `120ms`, `ease-out`).
- **Aucune gestion de la réduction du mouvement** : ni `prefers-reduced-motion`, ni
  `useReducedMotion`, ni `ReduceMotion` dans `packages/` (grep du 2026-11-04).

### 1.3 ADR qui contraignent design et animation

- ADR 0033 : `Box` n'accepte que les clés du thème pour espacement, couleur, rayon
  (`docs/adr/0033-box-n-accepte-que-les-tokens-du-theme.md`).
- ADR 0008 : le design system n'émet aucun style global, seulement polices et variables `:root`
  (`docs/adr/0008-aucun-style-global-depuis-le-design-system.md`). Toute règle « thémer la sélection,
  le caret, les scrollbars » est donc hors de son périmètre.
- ADR 0004 : pas de couche de tokens par composant pour le Button
  (`docs/adr/0004-pas-de-tokens-de-composant-pour-le-button.md`).
- ADR 0005 : correction attendue « `transitionProperty` ciblé sur `background-color`, `border-color`
  et `box-shadow` au lieu de `all` » (`docs/adr/0005-etats-visuels-definis-au-cas-par-cas.md`
  l. 28-32).
- ADR 0013 : l'échelle des contrôles dépend de la densité d'écran (32 px desktop, 40 px mobile)
  (`docs/adr/0013-echelle-des-controles-selon-la-densite-d-ecran.md`).
- ADR 0011 : les zones animées sont masquées dans la régression visuelle
  (`docs/adr/0011-regression-visuelle-greffee-sur-l-audit.md` l. 72-80).

## 2. Impeccable

### 2.1 Ce qu'il impose

- Fonctionnement : lancer `scripts/impeccable context` (binaire téléchargé au premier lancement),
  charger `PRODUCT.md` et `DESIGN.md`, puis lire `craft-floor.md` avant toute modification d'UI
  (`IMP` `SKILL.md`, section Setup). Une vingtaine de sous-commandes (`audit`, `animate`,
  `colorize`, `typeset`, `layout`, `polish`...) (`IMP` `SKILL.md`, section Commands).
- Modes de surface : Persuade, Operate, Read, Experience ; en Operate, « scanability, consistency,
  native expectations » priment sur l'expression (`IMP` `SKILL.md`, section Modes).
- Animation : 100-150 ms feedback immédiat, 150-300 ms changement d'état, 300-500 ms layout et
  overlay, 500-800 ms entrée travaillée ; sortie plus rapide que l'entrée ; courbe
  `cubic-bezier(0.16, 1, 0.3, 1)` ; pas de rebond par réflexe ; éviter d'animer `width`, `height`,
  `top`, `left` ; chemin `prefers-reduced-motion` obligatoire, qui réduit sans supprimer le feedback
  (`IMP` `reference/animate.md`, sections Timing and easing, Implement, Accessibility). En natif,
  suivre `ios.md` / `android.md` et ne pas appliquer l'outillage web (même fichier, Visitor mode).
- Couleur : construire des rôles (surfaces, texte, action, focus, bordures, statuts) ; « Define
  primitive values and semantic tokens when the project has a token system » ; contrastes AA 4,5:1
  texte, 3:1 grand texte, contrôles, icônes et focus ; le sombre ne s'inverse pas mécaniquement ;
  OKLCH pour une nouvelle palette web (`IMP` `reference/colorize.md`).
- Typographie : rôles plutôt que valeurs, corps à 16 px minimum sur web, mesure 45-75 caractères,
  `text-wrap: balance` sur les titres ; respecter Dynamic Type et la mise à l'échelle plateforme
  (`IMP` `reference/typeset.md`).
- Espacement : « Use a documented spacing scale rather than one-off values. A 4-unit base usually
  provides the useful middle steps » ; `gap` pour le rythme entre frères ; cibles tactiles utilisables
  (`IMP` `reference/layout.md`, section Apply).
- Plancher (`craft-floor.md`) : contrastes, ombres avec décalage et flou, interdit du « kicker »
  au-dessus d'un titre, pas de texte en dégradé, pas de bordure latérale colorée de plus de 1 px,
  thémer sélection, caret, scrollbars et bagues de focus « from the palette » (`IMP`
  `reference/craft-floor.md`).

### 2.2 Stack cible

Web d'abord : détecteur, mode live et `impeccable detect` opèrent sur du HTML/CSS. Le `CLAUDE.md` du
dépôt l'écrit : « Live mode, `impeccable detect`, and the design hook are web-only »
(`https://github.com/pbakaus/impeccable/blob/5af4319c4e7a7ee3e5e2b9fe899bcfb21c6190cb/CLAUDE.md`, lu
par recherche de code).

### 2.3 React Native et Tamagui

- React Native et Expo : cités comme cibles de `ios.md` (« SwiftUI, UIKit, React Native, Expo,
  Flutter ») et `android.md` ; un mode `adaptive` charge les deux pour une app multiplateforme (`IMP`
  `reference/ios.md` l. 3, `reference/android.md` l. 3, `CLAUDE.md` du dépôt). Le contenu reste
  formulé en termes HIG / Material (44 x 44 pt, Dynamic Type, SF Pro, tab bar), pas en API React
  Native.
- Tamagui : aucune occurrence trouvée (recherche de code GitHub sur le dépôt).
- Aucune règle ne traite le cas « un même composant rendu sur web et natif », qui est celui
  d'Alveole.

### 2.4 Confrontation à Alveole

| Règle                                                                   | Verdict               | Adaptation                                                                                                  |
| ----------------------------------------------------------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------- |
| Échelle de durées 100-150 / 150-300 / 300-500 ms, sortie plus rapide    | Utile                 | En faire des tokens de thème (voir section 5), pas des valeurs dans les composants.                         |
| Ne pas animer les propriétés de layout, viser propriétés précises       | Utile                 | Rejoint ADR 0005 (`all` à remplacer).                                                                       |
| Réduction du mouvement obligatoire                                      | Utile                 | Manque aujourd'hui dans Alveole ; à porter des deux côtés (CSS et `AccessibilityInfo` / Reanimated).        |
| Rôles de couleur, primitives puis sémantiques, contrastes AA            | Utile, déjà en place  | Alveole a `Color.ts` + `Palette.ts` et un audit a11y (ADR 0006). Rien à importer sauf la checklist.         |
| Échelle d'espacement base 4                                             | Déjà en place         | `Spacing.ts` (V/W).                                                                                         |
| Corps 16 px, 45-75 caractères, `text-wrap`                              | Partiel               | Taille : passe par `Typography.ts`. `text-wrap` est web seul et relève de l'application cliente (ADR 0008). |
| Thémer sélection, caret, scrollbars                                     | Contraire             | ADR 0008 : aucun style global émis par le design system.                                                    |
| OKLCH pour une nouvelle palette                                         | Hors sujet            | Palette déjà fixée en hex, et React Native ne lit pas `oklch()`.                                            |
| Bans de mise en page (kicker, cartes identiques, dégradés de texte)     | Hors sujet pour un DS | Concerne des pages, pas des composants.                                                                     |
| Outillage (`impeccable` binaire, détecteur, `PRODUCT.md` / `DESIGN.md`) | À écarter             | Binaire téléchargé et exécuté ; web seul ; doublonne les ADR et le catalogue.                               |

## 3. taste-skill

### 3.1 Ce qu'il impose

- Objet : « art direction for websites, distilled from a study of 247 curated gallery sites », pour
  landing pages, sites marketing, portfolios, et un parcours distinct pour les écrans d'app (`TASTE`
  `SKILL.md`, frontmatter et section « Page or app screen »).
- Fonctionnement : scripts `draw.mjs` (tire une direction), `inspect.mjs` (mesure la page dans Chrome
  à 1440, 768, 390 px), `lint.mjs`, `assets.mjs` (recherche d'images) ; Node 22+ et Chrome requis
  (`TASTE` `SKILL.md`, sections The run et Gate).
- Règles maison mesurées : titres sur deux lignes au plus ; pas d'eyebrow ; pas de monospace hors code ;
  pas de numérotation 01/02 ; **pas de filets fins ni de boîtes à bordure 1 px** ; **pas de dégradés** ;
  **pas d'ombre au repos** ; pas de violet ni d'indigo ; pas de petites capitales espacées ; pas de
  verre ; deux polices au plus (`TASTE` `SKILL.md`, section House rules).
- Type : deux ou trois tailles visibles, display tracking -0,02 à -0,05 em, texte 16-20 px, interligne
  1,45-1,6 ; échelle fluide en `clamp()` et `vw` (`TASTE` `SKILL.md`, Laws of the craft ;
  `references/type.md` l. 23-52).
- Espace : marges 16-32 px, 120-240 px entre sections sur desktop (`TASTE` `SKILL.md`, Laws, Space).
- Couleur : un fond, une encre, un accent ; surfaces séparées par un pas de ton, jamais par un filet
  ou une ombre (`TASTE` `SKILL.md`, Laws, Colour).
- Composants : boutons plats, carrés ou pilule, « the 9–16px "soft" radius is the weak-site default »
  (`TASTE` `SKILL.md`, Laws, Components).
- Mouvement : au moins huit éléments animés au chargement et au défilement, sinon échec de
  l'inspecteur ; entrées en cascade 60-90 ms ; transform et opacity seulement ; repli
  `prefers-reduced-motion` (`TASTE` `SKILL.md`, section 9 Move). Jetons CSS `--ease-out`
  `cubic-bezier(0.22, 1, 0.36, 1)`, `--t-press` 140 ms, `--t-hover` 180 ms, `--t-ui` 240 ms,
  `--t-reveal` 800 ms (`TASTE` `references/motion.md` l. 100-118). Pile citée : GSAP ScrollTrigger,
  bibliothèques de défilement doux, Three.js (même fichier l. 55-58).
- Écrans d'app : rayons « bimodaux » 4-8 ou 16-24 px, contrôles 32-40 px, base 4 px, jetons par défaut
  en variables CSS (`TASTE` `references/app-screens.md` l. 868, 949-991).

### 3.2 Stack cible

Web uniquement : « in any stack (HTML/CSS, React, Next.js, Vue, Svelte, Astro, Tailwind) » (`TASTE`
`SKILL.md`, frontmatter) ; jetons en propriétés CSS personnalisées (section 6, Tokens) ; vérification
dans un navigateur.

### 3.3 React Native et Tamagui

Aucun. La recherche de code GitHub sur le dépôt ne renvoie rien pour « React Native » ni « tamagui » ;
les occurrences de « expo » sont la courbe « expo out » (`TASTE` `references/motion.md` l. 60).

### 3.4 Confrontation à Alveole

| Règle                                                               | Verdict            | Raison                                                                                                                                               |
| ------------------------------------------------------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pas de filet 1 px, pas de bordure de boîte                          | Contraire          | Les champs d'Alveole marquent le focus par la bordure (ADR 0016) ; le skill lui-même exempte les formulaires, ce qui montre qu'il ne vise pas un DS. |
| Pas d'ombre au repos                                                | Contraire          | ADR 0005 attend une élévation au repos sur les variants pleins du Button.                                                                            |
| Rayon 9-16 px déconseillé, carré ou pilule                          | Contraire          | `RadiusList` vaut 4, 6, 10, full ; `lg` = 10 tomberait dans la zone « faible ».                                                                      |
| Échelle de type en `clamp()` / `vw`                                 | Inapplicable       | Le natif n'a pas de `vw` ni de `clamp()` ; la typographie Alveole est en valeurs fixes par rôle.                                                     |
| Huit éléments animés au minimum                                     | Contraire          | Règle de page vitrine ; un DS ne décide pas de la quantité de mouvement d'un écran.                                                                  |
| Jetons de durée `--t-press` 140 / `--t-hover` 180 / `--t-ui` 240 ms | Utile comme repère | Recoupe Emil et Impeccable ; à exprimer en tokens de thème, pas en variables CSS.                                                                    |
| Pas de violet / indigo                                              | Hors sujet         | La palette est déjà fixée par `Color.ts` et `Palette.ts` ; le DS n'en choisit pas les teintes au cas par cas.                                        |
| Outillage Node + Chrome, recherche d'images                         | À écarter          | Exécute des scripts tiers et télécharge des ressources ; vise une page, pas un composant.                                                            |

## 4. Emil Kowalski

### 4.1 Ce qu'il impose

La page https://emilkowal.ski/skill renvoie au dépôt `emilkowalski/skill` ; le skill principal est
`emil-design-eng`, « mostly animation, but also some design advice » (`EMIL` `README.md`, section
Reference). Le dépôt en contient dix-huit autres (animate, animate-expo, review-animations,
mobile-native, apple-design, write-swift...).

Règles de `emil-design-eng` (`EMIL` `skills/emil-design-eng/SKILL.md`) :

- Lister les propriétés : `transition: all 300ms` devient `transition: transform 200ms ease-out`
  (section Review Format).
- Ne jamais animer depuis `scale(0)` : partir de `scale(0.95)` avec opacité (sections Review Format et
  Never animate from scale(0)).
- Bouton : `scale(0.97)` sur `:active`, 160 ms `ease-out` (section Buttons must feel responsive).
- Courbes : `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`, `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)`,
  `--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1)` ; « Never use ease-in for UI animations »
  (section What easing).
- Durées : appui 100-160 ms, tooltips 125-200 ms, dropdowns et selects 150-250 ms, modales et drawers
  200-500 ms ; « UI animations should stay under 300ms » (section How fast).
- Décider d'abord s'il faut animer : une action répétée des dizaines de fois par jour ne s'anime pas
  ou à peine (section Should this animate at all).
- Popovers orientés depuis leur déclencheur (`transform-origin`) ; tooltips sans délai au survol
  suivant ; transitions plutôt que keyframes pour rester interruptible.
- Performance : animer `transform` et `opacity` ; préférer CSS / WAAPI à JS sous charge.
- Accessibilité : réduction du mouvement = moins et plus doux, garder opacité et couleur, retirer les
  déplacements ; survol réservé aux appareils qui survolent (`@media (hover: hover)`) (section
  Accessibility).

Règles de `animate-expo` (`EMIL` `skills/animate-expo/SKILL.md`) :

- Reanimated et non `Animated` du cœur ; réduction du mouvement livrée avec l'animation (Hard Rules).
- Outil le moins cher : transition CSS de Reanimated pour un changement d'état sans geste (section 3).
- Ressorts paramétrés en `{ duration, dampingRatio }` : 400 / 1 par défaut, 300 / 0,8 pour sheet et
  drawer (section 5).
- Appui 100-150 ms, toggle et chip 150-200 ms, « Mobile UI animations stay under 300ms, same as web »
  (section 5).
- `scale: 0.97` en 100-150 ms sur tout pressable ; pas de ripple Android hors app Material (section 7).
- Haptique via `expo-haptics`, jamais seul retour (section 8).
- `useReducedMotion` et `ReduceMotion.System` (section 9).

### 4.2 Stack cible

Web CSS et Motion (ex-Framer Motion) pour `emil-design-eng` (exemples `useSpring` de `framer-motion`,
section Spring-based mouse interactions) ; React Native / Expo avec Reanimated 4, Gesture Handler,
Expo Router et `expo-haptics` pour `animate-expo` (frontmatter). Pas de Tailwind imposé.

### 4.3 React Native et Tamagui

- React Native / Expo : oui, via `animate-expo` (et `mobile-native`, qui traite en fait du web
  mobile : 100vh, zoom des champs, `-webkit-tap-highlight`, d'après le `README.md`).
- Tamagui : zéro occurrence dans les six fichiers lus (`grep -ic tamagui`). Le pilote d'animation
  Tamagui (`@tamagui/animations-css`, présent dans les dépendances d'Alveole) n'est pas abordé.
- Point d'attention : `animate-expo` exige Reanimated 4, absent des dépendances d'Alveole
  (`packages/*/package.json`). Ajouter une dépendance serait une décision de l'utilisateur.

### 4.4 Confrontation à Alveole

| Règle                                                | Verdict         | Adaptation                                                                                                                                                       |
| ---------------------------------------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Propriétés listées au lieu de `all`                  | Utile tel quel  | C'est exactement la correction attendue par ADR 0005 ; `Button.styles.ts` et `Tabs.styles.ts` sont en `all`.                                                     |
| Jamais `ease-in`, courbes ease-out fortes            | Utile           | Créer des tokens de courbe ; `Tabs` et `RadioGroup` sont en `ease-in-out` sur un changement d'état.                                                              |
| Durées 100-300 ms par type d'interaction             | Utile           | Tokens de durée par rôle (`press`, `hover`, `popover`, `overlay`), valeurs identiques web et natif.                                                              |
| `scale(0.97)` à l'appui                              | Utile en partie | Ajouterait du mouvement dans le rendu publié : changement visuel à arbitrer composant par composant (ADR 0005), cliché de régression à mettre à jour (ADR 0011). |
| Jamais depuis `scale(0)`, `transform-origin` orienté | Utile           | Pour Popover, Dialog, Sheet, Toast (dépendances `@tamagui/*` déjà présentes).                                                                                    |
| Réduction du mouvement                               | Utile, manquant | À implémenter dans le thème : CSS `prefers-reduced-motion` côté web, `AccessibilityInfo.isReduceMotionEnabled` ou équivalent côté natif.                         |
| Survol sous `@media (hover: hover)`                  | Utile, web      | Rejoint la note mémoire « Pressable pose un curseur de main » ; à faire dans les clauses de pseudo-état (ADR 0031).                                              |
| Reanimated, haptique                                 | À arbitrer      | Nouvelle dépendance ; pertinent pour les apps consommatrices plus que pour le DS.                                                                                |
| Exemples Motion / Framer, `@starting-style`, WAAPI   | Hors sujet      | API web pure, non portables en natif.                                                                                                                            |

## 5. Comment tokeniser ce qui est retenu

Les règles retenues des trois skills concernent presque toutes le mouvement, la seule dimension
qu'Alveole ne tokenise pas encore (section 1.2). Elles convergent sur les mêmes valeurs :

| Rôle                      | Emil               | Impeccable        | taste-skill        |
| ------------------------- | ------------------ | ----------------- | ------------------ |
| Appui                     | 100-160 ms         | 100-150 ms        | 140 ms             |
| Changement d'état, survol | 150-250 ms         | 150-300 ms        | 180-240 ms         |
| Overlay, sheet, modale    | 200-500 ms         | 300-500 ms        | 250-450 ms         |
| Courbe d'entrée           | `0.23, 1, 0.32, 1` | `0.16, 1, 0.3, 1` | `0.22, 1, 0.36, 1` |

Piste, non décidée : un fichier `packages/theme/src/constants/Motion.ts` (durées par rôle et courbes),
consommé par les `*.styles.ts` comme `spacing()` l'est déjà, avec une version web (chaînes CSS) et une
version native (nombres pour Tamagui ou Reanimated), sur le modèle de `Elevation.ts`. Les neuf
`transitionDuration` en dur deviendraient des lectures de token. Cela relève d'une ADR et d'une
validation : ce document ne tranche pas.

## 6. Verdicts

- **Impeccable : utile en partie.** Garder l'échelle de durées et la sortie plus rapide
  (`animate.md`), la réduction du mouvement qui garde le feedback, la checklist de contraste
  (`colorize.md`) et l'audit natif comme grille de relecture. Écarter l'outillage (binaire, détecteur,
  `PRODUCT.md` / `DESIGN.md`), OKLCH, le thème des éléments du navigateur (contraire à ADR 0008) et
  les règles de page.
- **taste-skill : hors sujet.** Conçu pour des pages vitrines web, en variables CSS et `vw`, sans
  natif ; plusieurs règles maison contredisent les ADR (focus par la bordure, élévation au repos,
  rayon `lg` à 10 px). Seuls ses jetons de durée servent de troisième point de comparaison.
- **Emil Kowalski : utile en partie, le plus directement exploitable.** Reprendre de
  `emil-design-eng` et `animate-expo` : propriétés listées au lieu de `all`, pas d'`ease-in`, durées
  par rôle sous 300 ms, pas de `scale(0)`, origine orientée, réduction du mouvement, survol limité
  aux appareils qui survolent. Les traduire en tokens de thème avant tout usage. Écarter les API web
  pures (Motion, `@starting-style`) et ne pas ajouter Reanimated sans décision.

## 7. Recommandation globale

N'installer aucun des trois tels quels : aucun ne connaît Tamagui ni la contrainte « tout par les
tokens, web et natif à la fois », et deux d'entre eux exécutent des outils tiers. Leur apport commun
est un vocabulaire de mouvement cohérent, qui pointe le vrai manque d'Alveole : ni token de durée, ni
token de courbe, ni réduction du mouvement. Recommandation : ouvrir un chantier « tokens de
mouvement » (ADR puis `Motion.ts` dans `@alveole/theme`), en prenant les valeurs d'Emil Kowalski comme
base et les tableaux d'Impeccable comme contrôle, puis appliquer composant par composant les
corrections déjà actées par ADR 0005 (`all` remplacé par des propriétés listées). Une règle de relecture
interne, écrite dans le dépôt à partir de ces sources, servira mieux qu'un skill externe.
