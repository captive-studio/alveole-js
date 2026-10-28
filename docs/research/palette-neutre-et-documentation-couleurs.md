# Recherche : combien de gris, et comment documenter les couleurs

Date : 2026-10-28. Sources primaires uniquement : code d'Alveole (`main` au commit `b8bf59a4b`),
paquets publiés des références (`@atlaskit/tokens@20.8.2`, `baseui@18.2.0`, extraits localement),
fichiers source GitHub (Primer, Radix, Material), spécification WCAG 2.2.

Complète `docs/research/echelle-neutre.md` (analyse de luminosité et de chroma de l'échelle, et
inventaire détaillé des fonds et bordures, sections 7 et 8) sans la répéter : ici, la question est
le **nombre** de crans et la **documentation**.

## Résumé

- Alveole déclare **16 crans** Neutre (`Color.ts`), mais les rôles du thème clair n'en utilisent
  que **10** ; 6 crans (75, 100, 125, 150, 175, 525) ne servent qu'à des rôles dépréciés ou à rien.
  Il manque en même temps deux rôles que toutes les références ont : une bordure de contrôle à
  3:1 et un overlay (scrim).
- Les références convergent sur **12 à 14 crans opaques par mode** (Radix 12, Primer 14 avec blanc
  et noir, Atlassian 13 + 5 translucides, Base Web 10 + blanc et noir, Material 13 tons
  utilisés), **une échelle distincte pour le mode sombre**, et quelques **gris translucides**
  pour survol, pressé et overlay.
- **Recommandation** : 12 crans opaques en clair (blanc compris), 3 translucides, et la même
  structure à 12 crans pour un futur mode sombre ; tous les usages passent par des tokens
  sémantiques, jamais par les crans.
- **Documentation** : séparer une page « primitives » (l'échelle, valeur, contraste) d'une page
  « tokens sémantiques » groupée par rôle, où chaque token montre swatch, nom, primitive
  référencée, usage en une phrase, contraste mesuré sur son fond d'usage, et valeur clair/sombre.
  Aujourd'hui `apps/docs` ne montre que nom de feuille et hex.

## 1. État actuel d'Alveole

### 1.1 L'échelle

`packages/theme/src/constants/Color.ts`, clé `Neutre` : 16 crans, numérotés façon DSFR
(numéro ≈ L* × 10, voir `echelle-neutre.md` §5) :
`50 75 100 125 150 175 200 425 525 625 850 900 925 950 975 1000`.

Les six crans sombres 75 à 175 sont serrés (`#1D1E20` à `#323439`) : c'est un reste d'échelle de
mode sombre, alors que `CustomPalette.dark` est entièrement `@deprecated`
(`packages/theme/src/constants/Palette.ts`, l. 84-96).

### 1.2 Crans réellement utilisés par les rôles

Rôles gris de `CustomPalette.light` (`Palette.ts`) et nombre d'occurrences dans
`packages/components/src` (hors tests et stories, 60 fichiers concernés, comptage `grep` du
2026-10-28) :

| Cran     | Hex       | Rôles `light`                                                                                 | Occurrences composants        |
| -------- | --------- | --------------------------------------------------------------------------------------------- | ----------------------------- |
| 1000     | `#FFFFFF` | `background.default-grey`, `background.active-inverted`, `text.inverted-grey`                 | 20 + 3                        |
| 975      | `#F6F7F8` | `background.alt-grey`, `background.default-grey-hover`                                        | 12 + 1                        |
| 950      | `#EFF1F6` | `background.contrast-grey`                                                                    | 5                             |
| 925      | `#E6EAF1` | `background.default-grey-active`, `background.disabled-grey`, `border.disabled-grey`          | 0 + 7 + 7                     |
| 900      | `#DEE3EC` | `border.default-grey`                                                                         | 44 (le token le plus utilisé) |
| 850      | `#CED5E1` | aucun en clair (seulement `dark.text.default-grey`, déprécié)                                 | 0                             |
| 625      | `#8D97AC` | `border.contrast-grey`, `text.disabled-grey`                                                  | 2 + 19                        |
| 525      | `#747E91` | aucun                                                                                         | 0                             |
| 425      | `#5F6571` | `text.mention-grey`                                                                           | 25                            |
| 200      | `#373A3F` | `text.default-grey`, `border.plain-grey`                                                      | 42 + 1                        |
| 175 à 75 |           | seulement des rôles dépréciés (`badge.default` 175, `dark.contrast-grey` 100)                 | 0                             |
| 50       | `#151617` | `text.title-grey`, `label-grey`, `action-high-grey`, `active-grey`, `border.action-high-grey` | 16 + 3 + 8 + 1 + 0            |

Bilan : **10 crans utiles sur 16**. Le travail réel repose sur 5 tokens (`border.default-grey`
44, `text.default-grey` 42, `text.mention-grey` 25, `background.default-grey` 20,
`text.disabled-grey` 19). Tokens déclarés jamais lus : `background.default-grey-active`,
`border.action-high-grey`. Le survol gris translucide existe déjà en valeur brute
(`background.transparent-hover`, `rgba(0, 0, 0, 0.04)`), hors échelle.

Rôles absents par rapport aux références (détail chiffré dans `echelle-neutre.md` §8.4) : une
bordure de champ à 3:1 (`border.contrast-grey` 625 est à 2,94:1 sur blanc), un niveau « contrôle
discret », un overlay de modale.

### 1.3 Ce que montre `apps/docs`

`apps/docs/app/theme/colors.tsx` passe `CustomPalette` à `ThemePaletteScreen`
(`packages/storybook/src/screens/ThemePaletteScreen.tsx`) : un accordéon par famille
(`background`, `border`, `text`...) avec un compteur de jetons, puis une grille de
`ColorSwatch` (`packages/storybook/src/components/ColorSwatch.tsx`) : pastille 120 px, **dernier
segment du chemin** (`default-grey`, donc ambigu entre `background`, `border` et `text`) et
**valeur hex**, copiable au clic. Une seconde page liste les variables CSS
(`apps/docs/app/theme/css-variables.tsx`).

Absents : l'échelle primitive `Colors` (on ne voit jamais `Neutre.900`), le lien token vers
primitive, l'usage, le contraste, les tokens dépréciés distingués visuellement des actifs (le
tri existe dans `paletteSections`, `deprecated?: boolean`, mais n'apporte qu'un repli
d'accordéon).

## 2. Ce que font les références

### 2.1 Nombre de crans

| Système         | Crans neutres opaques (clair)                                                           | Translucides                                     | Mode sombre                                                      | Source                   |
| --------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------ | ---------------------------------------------------------------- | ------------------------ |
| Radix Colors    | 12 (1-12)                                                                               | 12 (`grayA1`-`grayA12`)                          | échelle distincte de 12                                          | [R1] [R2]                |
| Primer          | 14 (`neutral.0` blanc à `neutral.13` noir)                                              | dans les tokens fonctionnels                     | échelle distincte, inversée                                      | [P1] [P2]                |
| Atlassian       | 13 (`Neutral0`, `100` à `1200` par 100) ; repris en usage : 0, 100, 500, 700, 800, 1000 | 5 (`Neutral100A` à `500A`)                       | échelle distincte : 15 opaques (ajout 250, 350) + 6 translucides | [A1]                     |
| Base Web (Uber) | 10 (`gray50` à `gray900`) + `white`, `black`                                            | `borderTransparent` (8 %), overlay 50 % calculés | 10 `gray*Dark` distincts                                         | [B1] [B2]                |
| Material 3      | palette tonale 0-100 ; 13 tons consommés par les rôles neutres en clair                 | `scrim` (ton 0 + opacité)                        | mêmes palettes, autres tons                                      | [M1]                     |
| Tailwind v4     | 11 (50, 100 à 900, 950)                                                                 | non                                              | pas de mode intégré, à composer                                  | voir `echelle-neutre.md` |
| **Alveole**     | **16 déclarés, 10 utilisés**                                                            | 1 en dur (`transparent-hover`)                   | déprécié                                                         | §1                       |

Constat : personne ne dépasse 14 crans opaques par mode, et le seul système qui en déclare plus
(Atlassian en sombre, 15) le fait pour compenser la perception des fonds sombres. Les
translucides servent partout aux mêmes rôles : survol/pressé de contrôles « subtils » posés sur
n'importe quel fond, et overlay.

### 2.2 Rôles couverts, cran par cran

| Rôle                           | Radix [R1]       | Primer (base) [P1] | Atlassian [A1]                                      | Base Web [B2]                                         | Material [M1]             |
| ------------------------------ | ---------------- | ------------------ | --------------------------------------------------- | ----------------------------------------------------- | ------------------------- |
| Fond de page                   | 1                | 0                  | `elevation.surface` = Neutral0                      | `backgroundPrimary` (blanc)                           | `surface` ton 98          |
| Fond secondaire / regroupement | 2                | 1                  | `elevation.surface.sunken` = Neutral100             | `backgroundSecondary` = gray50                        | `surfaceContainerLow` 96  |
| Fond de composant              | 3                | 1-2                | `background.neutral` = Neutral200A                  | `backgroundTertiary` = gray100                        | `surfaceContainer` 94     |
| Survol                         | 4                | 2-3                | `background.neutral.hovered` = Neutral300A          | -                                                     | couche d'état             |
| Pressé / sélectionné           | 5                | 3-4                | `background.neutral.pressed` = Neutral400A          | -                                                     | couche d'état             |
| Bordure non interactive        | 6                | 6                  | `border` = Neutral300A                              | `borderOpaque` = gray50                               | `outlineVariant` ton 80   |
| Bordure de contrôle            | 7 (8 forte)      | 8 (emphase)        | `border.input` = Neutral500                         | -                                                     | `outline` ton 50          |
| Fond plein / sombre            | 9-10             | 10-12              | -                                                   | `backgroundInversePrimary`                            | `inverseSurface` ton 20   |
| Texte secondaire               | 11               | 9                  | `text.subtle` = Neutral800, `subtlest` = Neutral700 | `contentSecondary` gray800, `contentTertiary` gray700 | `onSurfaceVariant` ton 30 |
| Texte principal                | 12               | 12-13              | `text` = Neutral1000                                | `contentPrimary` (noir)                               | `onSurface` ton 10        |
| Désactivé (fond / texte)       | -                | -                  | `background.disabled` 200A / `text.disabled` 400A   | gray50 / gray400                                      | opacité                   |
| Overlay de modale              | 9 (« overlays ») | -                  | `blanket` = Neutral500A                             | `backgroundOverlay` noir 50 %                         | `scrim` ton 0             |

Citations d'usage :

- Radix (paraphrase) : 1-2 fonds d'app, de carte, de barre latérale, interchangeables ; 3 fond
  de composant ; 4 survol ; 5 pressé ou sélectionné ; 6 bordures discrètes d'éléments non
  interactifs ; 7 bordures de composants interactifs ; 8 bordures marquées et anneaux de focus ;
  9 fonds pleins, y compris overlays ; 10 survol du 9 ; 11 texte à faible contraste ; 12 texte à
  fort contraste [R1].
- Atlassian : `color.text.subtlest` « Use for tertiary text, such as meta-data, breadcrumbs,
  input field placeholder and helper text » ; `color.border` « Use to visually group or separate
  UI elements, such as flat cards or side panel dividers » ; `color.border.input` « Use for
  borders of form UI elements, such as text fields, checkboxes, and radio buttons » ;
  `color.blanket` « Use for the screen overlay that appears with modal dialogs » [A1].
- Primer : « Step 9 is considered the minimum contrast value for text against steps 0 through
  4 » [P2].

### 2.3 Contraintes WCAG 2.2 qui fixent les crans « durs »

- 1.4.3 (AA) : texte à 4,5:1 minimum ; le texte d'un « inactive user interface component » n'a
  pas d'exigence [W1]. Donc texte secondaire (mention) à 4,5:1 sur tous les fonds où il se pose,
  texte désactivé libre.
- 1.4.6 (AAA) : 7:1 [W1].
- 1.4.11 (AA) : 3:1 pour l'« information visuelle requise pour identifier les composants et
  leurs états », sauf composants inactifs [W1]. Donc un cran de bordure de champ à 3:1, mais les
  filets décoratifs (carte, séparateur) sont libres.

Il faut donc au minimum, côté sombre de l'échelle : un cran à 3:1 (bordure de contrôle), un à
4,5:1 sur le fond le plus foncé où l'on écrit (texte secondaire), un très sombre (texte principal).

## 3. Recommandation pour Alveole

### 3.1 Chiffre

**12 crans opaques en clair (blanc compris) + 3 translucides**, et un mode sombre futur bâti avec
la même grille de 12 rôles (échelle distincte, pas une inversion des numéros). C'est la
fourchette de toutes les références (§2.1), et c'est le nombre de rôles distincts de la grille
Radix, la seule qui documente un usage par cran.

### 3.2 Proposition de grille (clair)

Les numéros actuels sont gardés quand le cran sert déjà ; « nouveau » signale un cran à créer.
Valeurs à arbitrer à partir des fourchettes de `echelle-neutre.md` §7.2 et §8.4.

| #   | Cran Alveole       | Rôle sémantique (token)                                       | Contrainte                         |
| --- | ------------------ | ------------------------------------------------------------- | ---------------------------------- |
| 1   | 1000               | fond de page, surface (carte, modale), texte inversé          | -                                  |
| 2   | 975                | fond secondaire (`alt`), survol sur blanc                     | L 96,7-98,5                        |
| 3   | 950                | fond de composant (`contrast`)                                | -                                  |
| 4   | 925                | pressé / sélectionné, fond et bordure désactivés              | L 90-94,6                          |
| 5   | 900                | filet non interactif (carte, séparateur)                      | 1,28-1,43:1                        |
| 6   | 850                | bordure de contrôle discrète (aujourd'hui sans rôle)          | 1,43-1,57:1                        |
| 7   | nouveau (vers 575) | bordure de champ, bordure forte                               | **≥ 3:1** sur 1000 et 975 (1.4.11) |
| 8   | 625                | texte désactivé, icônes décoratives                           | libre (1.4.3 exception)            |
| 9   | 425                | texte secondaire (`mention`)                                  | **≥ 4,5:1** sur 950 (1.4.3)        |
| 10  | 200                | texte courant, bordure `plain`                                | -                                  |
| 11  | 100                | fond plein sombre (tooltip, badge inversé, `inverse-surface`) | -                                  |
| 12  | 50                 | titres, texte principal                                       | -                                  |

Translucides (dérivés du 50, sur le modèle `Neutral100A`-`500A` d'Atlassian et `grayA` de Radix) :
survol subtil (le `transparent-hover` actuel, 4 %), pressé subtil (8 % environ), overlay de
modale (≈ 50 %, comme Base Web `backgroundOverlay` et l'ordre de grandeur de `Neutral500A`).

À retirer de l'échelle après migration des rôles dépréciés : 75, 125, 150, 175 et 525 (aucun rôle
actif, §1.2). Avant toute suppression, chiffrer la casse chez les consommateurs : `Colors.Neutre`
est exporté publiquement par `@alveole/theme`.

### 3.3 Règles d'usage associées

- Les composants ne lisent que des tokens sémantiques (`CustomPalette.light...`) : c'est déjà le
  cas dans `packages/components` (aucune lecture directe de `Colors.Neutre` relevée), à garder.
- Primer l'écrit comme règle : « Base color tokens don't respect color modes and should never be
  used directly in code or design » [P2]. C'est ce qui rend un mode sombre possible sans toucher
  aux composants.

## 4. Documenter les couleurs : bonnes pratiques

### 4.1 Ce que font les références

| Élément affiché                    | Primer [P2]                                           | Atlassian [A2]                                                                                             | Radix [R1]                            |
| ---------------------------------- | ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| Séparation primitives / sémantique | 3 niveaux : base, fonctionnel, composant              | palette (`color.palette.*`) puis tokens                                                                    | échelle seule, usage par cran         |
| Nom complet du token               | oui (`bgColor-default`)                               | oui (`color.text.subtlest`)                                                                                | numéro de cran                        |
| Valeur                             | primitives via Storybook                              | **clair et sombre** côte à côte, avec états hovered/pressed                                                | hex par cran                          |
| Usage en une phrase                | oui, par rôle                                         | oui, champ `description` de chaque token                                                                   | oui, par cran                         |
| Contraste                          | règle écrite (cran 9 sur 0-4, 7:1 en contraste élevé) | -                                                                                                          | règle écrite (11 et 12 pour le texte) |
| Statut (actif, déprécié)           | -                                                     | oui (`state`, version d'introduction)                                                                      | -                                     |
| Do / don't                         | règles en prose (« never be used directly »)          | dans les descriptions (« Do not use to indicate keyboard focus or hover alone », `color.blanket.selected`) | -                                     |

Le champ `description` d'Atlassian est **dans le code du token** (`schema/themes/atlassian-light/
color/text.tsx`, attribut `description`, avec `state` et `introduced`) [A1] : la doc est générée
depuis la source, pas écrite à côté.

### 4.2 Proposition pour `apps/docs`

1. **Deux pages.** « Palette » : les échelles `Colors` en bandes horizontales (cran, hex,
   contraste sur blanc et sur 50), marquée « ne pas utiliser directement » comme chez Primer.
   « Tokens de couleur » : `CustomPalette.light` groupé par rôle (fonds, bordures, texte,
   système).
2. **Une ligne par token** plutôt qu'une pastille de 120 px : swatch, **chemin complet**
   (`background.default-grey`, pour lever l'ambiguïté actuelle de la feuille seule), primitive
   référencée (`Neutre 900`), hex, usage en une phrase, contraste.
3. **Usage dans la source.** Porter la phrase d'usage dans `Palette.ts` en JSDoc (le fichier en a
   déjà pour `@deprecated`) et la lire au build, comme Atlassian ; ne pas la dupliquer dans
   `apps/docs`.
4. **Contraste calculé, pas saisi.** Pour un texte : ratio sur `background.default-grey` et sur
   `alt-grey`/`contrast-grey`, avec verdict 4,5:1. Pour une bordure : ratio sur son fond, verdict
   3:1 seulement si le rôle est interactif (1.4.11). Désactivé : afficher « exempté » [W1]. Le
   helper `withMinimumContrast` de `packages/theme/src/helpers` existe déjà pour le calcul.
5. **Statut visible.** Déprécié barré avec son remplaçant (le texte est déjà dans les
   `@deprecated`), et l'ordre actuel des sections conservé.
6. **Mode sombre.** Colonne prévue clair/sombre comme Atlassian ; ne pas l'afficher tant que
   `dark` est déprécié.
7. **Do / don't** courts, en tête de page, illustrés : un filet `default-grey` sur un champ (non,
   1.4.11) contre la bordure de champ ; une primitive dans un composant (non) contre un token.

## Sources

- [R1] Radix, « Understanding the scale » :
  https://raw.githubusercontent.com/radix-ui/website/main/data/colors/docs/palette-composition/understanding-the-scale.mdx
  ; page rendue https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale
- [R2] Radix, paquet `@radix-ui/colors@3.0.0` (échelles `gray`, `grayA`, `grayDark`), cité dans
  `docs/research/echelle-neutre.md`
- [P1] Primer, primitives de base claires :
  https://raw.githubusercontent.com/primer/primitives/main/src/tokens/base/color/light/light.json5
- [P2] Primer, « Color » : https://primer.style/foundations/color/overview
- [A1] Atlassian, paquet `@atlaskit/tokens@20.8.2` : `dist/esm/artifacts/palettes-raw/palette.js`
  (noms `color.palette.Neutral*` et `DarkNeutral*`), `dist/esm/artifacts/tokens-raw/atlassian-light.js`
  (valeurs et descriptions). Source : https://www.npmjs.com/package/@atlaskit/tokens
- [A2] Atlassian, « All design tokens » : https://atlassian.design/components/tokens/all-tokens
- [B1] Base Web, paquet `baseui@18.2.0`, `tokens/color-primitive-tokens.js` (`gray50`-`gray900`,
  `gray*Dark`). Source : https://www.npmjs.com/package/baseui
- [B2] Base Web, `themes/light-theme/color-semantic-tokens.ts` :
  https://raw.githubusercontent.com/uber/baseweb/main/src/themes/light-theme/color-semantic-tokens.ts
  ; dark : `themes/dark-theme/color-semantic-tokens.js` du paquet
- [M1] Material, `color_spec_2021.ts` :
  https://raw.githubusercontent.com/material-foundation/material-color-utilities/main/typescript/dynamiccolor/color_spec_2021.ts
- [W1] WCAG 2.2, critères 1.4.3, 1.4.6, 1.4.11 : https://www.w3.org/TR/WCAG22/
- Alveole : `packages/theme/src/constants/Color.ts`, `packages/theme/src/constants/Palette.ts`,
  `apps/docs/app/theme/colors.tsx`, `packages/storybook/src/screens/ThemePaletteScreen.tsx`,
  `packages/storybook/src/components/ColorSwatch.tsx`, `docs/research/echelle-neutre.md`

Non vérifié : la page rendue atlassian.design/foundations/color et baseweb.design n'ont pas pu
être lues (rendu côté client) ; les affirmations reposent sur le code des paquets.
