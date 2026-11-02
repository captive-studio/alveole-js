# Recherche : comment afficher les nuances de couleur dans le catalogue

Date : 2026-11-02. Sources primaires uniquement : code d'Alveole (`main` au commit `d55783255`),
code source des pages de doc des références lu par l'API `gh` (dépôts `primer/design`,
`primer/primitives`, `uber/baseweb`), HTML servi par atlassian.design (rendu serveur lisible).

Complète `docs/research/palette-neutre-et-documentation-couleurs.md` (section 4, qui portait sur
la page des tokens) : ici, la question est la page **Nuances** (les échelles primitives).

## Résumé

- Alveole affiche ses 22 échelles en **liste verticale**, une ligne par cran : pastille 32 px,
  nom d'échelle et numéro, hex, contraste sur blanc, liens vers les tokens qui citent le cran.
  Aucune vue d'ensemble de l'échelle, aucune copie, pas de mode sombre.
- Primer montre chaque échelle en **bande continue** de blocs colorés empilés, le texte posé sur
  la couleur, avec cinq ratios de contraste contre les tokens réels du thème, et un sélecteur de
  thème.
- Atlassian montre la palette en **grille de pastilles groupées par teinte**, nom copiable, hex
  et RGB, neutres clairs et sombres séparés, alpha à part ; le lien primitive vers token est sur
  la page des tokens (colonnes valeur claire / valeur sombre).
- Base Web liste ses primitives en **lignes simples** (pastille 100 x 50, nom, hex) et montre les
  tokens sémantiques clair et sombre côte à côte, avec le nom de la primitive résolue.

## 1. État actuel d'Alveole

### 1.1 Chaîne de données

- Source : `packages/theme/src/constants/Color.ts`, objet `Colors` (l. 1-300), 22 échelles
  (`VertPrairie`, `Lilas`, ..., `Neutre` l. 225, `BleuCaptive` l. 243, `LightBlueVivid` l. 286).
  Certaines « échelles » n'ont qu'un ou deux crans (`Focus`, l. 86).
- Extraction au build (ADR `docs/adr/0035-la-doc-des-couleurs-lit-palette-ts-au-build.md`) :
  `scripts/generer-catalogue-des-couleurs.mjs` (49 lignes) écrit
  `packages/storybook/src/couleurs/catalogueDesCouleurs.generated.ts`, fichier généré non
  versionné, lancé par `generate:sources` (`packages/storybook/package.json`, l. 22).
- Type `Nuance` (`packages/storybook/src/couleurs/catalogueDesCouleurs.ts`) : `echelle`,
  `numero`, `hex`, `tokens` (chemins des tokens actifs qui citent le cran), `tokensDeprecies`.
- Regroupement : `packages/storybook/src/screens/echellesDuCatalogue.ts` (l. 7-11), une échelle
  par titre, dans l'ordre du source.

### 1.2 Rendu

- Route : `apps/docs/app/theme/nuances.tsx` (l. 8-10) rend `ThemeNuancesScreen`. Page sœur
  `apps/docs/app/theme/tokens-semantiques.tsx` (rend `ThemePaletteScreen`).
- Écran : `packages/storybook/src/screens/ThemeNuancesScreen.tsx`, ajouté au commit `59b49afda`.
  - Un titre `H5 - XS` par échelle (l. 80), puis une `LigneDeNuance` par cran (l. 81-83).
  - Ligne (l. 28-60), en `flexDirection: 'row'` : pastille **32 x 32** avec filet
    `border.default-grey` (l. 34-42) ; colonne de 160 px avec `Neutre 900`, hex en monospace et
    « x,x:1 sur blanc » (l. 43-47, calcul `contrastRatio` l. 18) ; colonne de liens vers
    `/theme/tokens-semantiques#<chemin>` (l. 21-26, 48-57), « sans usage » si aucun token, et
    bloc « Déprécié » en couleur `default-warning` pour les tokens dépréciés.
  - Couleurs de l'écran lues sur `color.light` en dur (l. 30, 40, 53) : pas de variante sombre.

### 1.3 Ce qui en découle à l'écran

- Une échelle de 13 crans occupe 13 lignes empilées : on ne voit jamais la rampe d'un seul coup
  d'œil, et on ne compare pas deux échelles côte à côte.
- La pastille (32 px) est petite par rapport au texte ; la couleur est secondaire dans la ligne.
- Un seul contraste, sur blanc ; rien sur le fond sombre ni sur les fonds gris du thème.
- Pas de copie au clic (le `ColorSwatch` de la page tokens en a une, cf. recherche précédente
  §1.3), pas de distinction primitive « à ne pas utiliser directement ».
- Point fort propre à Alveole : le lien **cran vers tokens qui le citent**, et l'état « sans
  usage ». Aucune des trois références ne montre ce sens-là sur sa page de palette.

## 2. Primer (GitHub)

- Page « Base scales » : texte et images statiques expliquant les rôles des crans neutres (0-5
  fonds, 7-8 bordures, 9-10 texte), puis la section « All color scales » qui embarque la story
  Storybook `color-base-scales--all-scales`, avec l'avertissement « Base color values should only
  be used to construct functional and component/pattern design tokens, never used directly in
  code » et « Use the theme menu to see how the base scales change per theme. »
  https://github.com/primer/design/blob/main/content/foundations/color/base-scales.mdx
- Disposition : chaque échelle est une colonne de blocs empilés sans espace (coins arrondis au
  premier et au dernier seulement), colonnes en grille `repeat(auto-fit, minmax(320px, 1fr))`,
  bloc de 72 px de haut minimum.
  https://github.com/primer/primitives/blob/main/docs/storybook/stories/StorybookComponents/ColorScale/ColorScale.css
  ; ordre des échelles (neutre 14 crans, autres 10, noir, blanc avec filet) :
  https://github.com/primer/primitives/blob/main/docs/storybook/stories/Color/Base/Scales.stories.tsx
- Infos par cran, dans `ColorScale.tsx` : nom de la variable (`base-color-neutral-3`) et hex
  **écrits sur la couleur**, en noir ou blanc selon le meilleur contraste ; cinq badges de
  contraste calculés contre les valeurs réelles du thème courant : `fgColor-default`,
  `fgColor-muted` (pastille « Aa »), `borderColor-default` (carré vide), `bgColor-default`,
  `bgColor-muted` (carré plein). Le calcul est refait quand l'attribut `data-color-mode` change
  (`MutationObserver`), donc en mode sombre aussi.
  https://github.com/primer/primitives/blob/main/docs/storybook/stories/StorybookComponents/ColorScale/ColorScale.tsx
- Tokens fonctionnels sur une autre page : tableaux « Sample / Token / Output value », nom copiable
  (`InlineCode ... copyClipboard cssVar`), groupés foreground, background, border, shadow, puis
  patterns (button, control...).
  https://github.com/primer/design/blob/main/content/foundations/primitives/color.mdx ;
  https://github.com/primer/primitives/blob/main/docs/storybook/stories/Color/Functional/FunctionalTables.stories.tsx

## 3. Atlassian Design System

- Page « Color palette » : groupes par teinte (Lime, Red, Orange, ..., Magenta), puis « Light mode
  neutrals » (Solid `Neutral0`-`Neutral1200`, Alpha `Neutral100A`-`Neutral500A`) et « Dark mode
  neutrals » (Solid `DarkNeutral-100`-`DarkNeutral1200`, Alpha). Chaque pastille porte son nom,
  « Hex » et « RGB ». Les variantes translucides apparaissent dans la teinte (`Red200A40`).
  https://atlassian.design/foundations/color/color-palette
- Le nom de chaque pastille est un `<button>` muni d'une icône de copie (HTML servi par la page
  ci-dessus) : copie au clic.
- La page explique la correspondance clair / sombre : « Neutral100 in the light neutral ramp
  should equate to DarkNeutral100 in the dark neutral ramp. » (même URL)
- La page « Color » renvoie vers la palette seulement « If you aren't using design tokens » et
  décrit les rôles (neutral, brand, information...), les niveaux d'emphase (subtlest à boldest)
  et les états. https://atlassian.design/foundations/color
- Lien primitive vers token : sur « All tokens », chaque token montre son nom, une description,
  la version d'introduction, et deux colonnes « Light value » / « Dark value » qui affichent la
  **primitive** (`Lime100` / `Lime1000`), états hovered et pressed regroupés sous le token de
  base. https://atlassian.design/components/tokens/all-tokens
- Non vérifié : la disposition exacte en grille (largeur, taille des pastilles) et la présence
  d'un contraste sur la palette ; le HTML servi ne le montre pas et le code de la page n'est pas
  dans le paquet `@atlaskit/tokens@20.9.0`.

## 4. Base Web (Uber)

- Trois couches documentées : primitives (`green100`), sémantiques (`contentPrimary`), composant
  (`buttonPrimaryText`) ; « It's rarely necessary to use primitive color tokens directly ».
  https://github.com/uber/baseweb/blob/main/documentation-site/pages/guides/colors.mdx
- Page « Tokens » : `ColorPreview`, une **ligne par primitive** sur toute la largeur : pastille
  100 x 50 px, nom, hex aligné à droite, soulignement de la couleur elle-même ; liste plate de
  `TokensExports.colors`, sans regroupement visuel par échelle autre que l'ordre.
  https://github.com/uber/baseweb/blob/main/documentation-site/pages/components/tokens.mdx
- Page « Theming », section Colors : composant `Color` qui pose deux pastilles **clair et sombre
  côte à côte**, chacune sur le fond `backgroundPrimary` de son thème, avec la valeur hex et le
  **nom de la primitive** retrouvée par recherche inverse (`getTokenFromCode`), sous le titre
  `theme.colors.<nom>`.
  https://github.com/uber/baseweb/blob/main/documentation-site/components/theming/colors.jsx ;
  https://github.com/uber/baseweb/blob/main/documentation-site/components/theming/common.jsx ;
  https://github.com/uber/baseweb/blob/main/documentation-site/pages/guides/theming.mdx
- Pas de contraste ni de copie dans ces composants (lecture du code ci-dessus).

## 5. Tableau comparatif (page des primitives)

| Critère                   | Alveole                        | Primer                                 | Atlassian                           | Base Web                          |
| ------------------------- | ------------------------------ | -------------------------------------- | ----------------------------------- | --------------------------------- |
| Disposition               | liste verticale, 1 ligne/cran  | bandes verticales continues, en grille | pastilles groupées par teinte       | liste plate, 1 ligne/primitive    |
| Taille de la couleur      | 32 x 32                        | bloc pleine largeur, 72 px min         | pastille (taille non vérifiée)      | 100 x 50                          |
| Texte sur la couleur      | non                            | oui, noir/blanc auto                   | non vérifié                         | non                               |
| Nom                       | `Neutre 900`                   | `base-color-neutral-9`                 | `Neutral900`                        | `gray900`                         |
| Valeur                    | hex                            | hex                                    | hex et RGB                          | hex                               |
| Contraste                 | 1 ratio, sur blanc             | 5 ratios contre tokens du thème        | non vérifié                         | non                               |
| Lien vers les tokens      | cran vers tokens qui le citent | non (sens inverse, rôles en prose)     | non (sens token vers primitive)     | non (sens token vers primitive)   |
| Copie                     | non                            | non sur la palette, oui sur les tokens | oui (nom)                           | non                               |
| Mode sombre               | non                            | sélecteur de thème, ratios recalculés  | rampe sombre distincte affichée     | clair/sombre côte à côte (tokens) |
| Primitives vs sémantiques | deux pages, liées              | deux pages, avertissement explicite    | deux pages, palette « sans tokens » | deux pages                        |
| Translucides              | sans objet                     | non                                    | groupe Alpha à part                 | non                               |

## 6. Écarts entre Alveole et les références

1. **Lecture de la rampe** : les trois références rendent une échelle visible d'un bloc (bande ou
   grille) ; Alveole la déroule en lignes, ce qui sépare visuellement des crans voisins.
2. **Poids de la couleur** : la couleur est le plus petit élément de la ligne Alveole ; chez Primer
   elle est le fond du bloc.
3. **Contraste** : Alveole mesure sur blanc seul ; Primer mesure contre les tokens réellement
   utilisés (texte, bordure, fonds), ce qui dit à quoi le cran peut servir.
4. **Copie** : absente sur la page Nuances, présente chez Atlassian.
5. **Mode sombre** : sans objet tant que `CustomPalette.dark` est déprécié, mais les trois
   références prévoient l'affichage.
6. **Avertissement d'usage** : Primer et Base disent explicitement de ne pas utiliser les
   primitives dans le code ; la page Alveole ne le dit pas.
7. **Avance d'Alveole** : le lien cran vers tokens et l'état « sans usage » n'existent chez aucune
   référence ; c'est une information d'audit propre à Alveole.

## 7. Options et questions à arbitrer

- **Disposition** : (a) bandes verticales en grille façon Primer, (b) bandes horizontales (une
  échelle par ligne, crans en colonnes, comparaison entre échelles par colonne), (c) liste
  actuelle avec pastille agrandie. Question : la page sert-elle à voir la rampe ou à auditer les
  usages ?
- **Où mettre les tokens qui citent un cran** : dans la bande (compteur ou survol), dans un
  panneau au clic, ou sous la bande. Le rendu en bande laisse peu de place aux liens actuels.
- **Contraste** : sur blanc seul, contre les tokens de fond du thème (façon Primer), ou aucun
  sur cette page (le reporter aux tokens). Quel fond de référence pour Alveole ?
- **Texte sur la couleur** (noir/blanc auto) ou à côté : lisibilité contre sobriété.
- **Échelles d'un ou deux crans** (`Focus`, etc.) : même traitement que les rampes, ou groupe à
  part ?
- **Copie au clic** : nom, hex, ou les deux.
- **Ordre des échelles** : ordre du source (actuel), par teinte, ou neutres d'abord.
- **Avertissement « ne pas utiliser directement »** en tête de page, oui ou non.

## Sources

- Alveole : `packages/theme/src/constants/Color.ts`, `scripts/generer-catalogue-des-couleurs.mjs`,
  `packages/storybook/src/couleurs/catalogueDesCouleurs.ts`,
  `packages/storybook/src/screens/echellesDuCatalogue.ts`,
  `packages/storybook/src/screens/ThemeNuancesScreen.tsx`, `apps/docs/app/theme/nuances.tsx`,
  `apps/docs/app/theme/tokens-semantiques.tsx`, ADR 0035.
- Primer : https://github.com/primer/design (`content/foundations/color/base-scales.mdx`,
  `content/foundations/primitives/color.mdx`) ; https://github.com/primer/primitives
  (`docs/storybook/stories/Color/Base/Scales.stories.tsx`,
  `docs/storybook/stories/StorybookComponents/ColorScale/ColorScale.tsx` et `.css`,
  `docs/storybook/stories/Color/Functional/FunctionalTables.stories.tsx`).
- Atlassian : https://atlassian.design/foundations/color/color-palette ,
  https://atlassian.design/foundations/color , https://atlassian.design/components/tokens/all-tokens
- Base Web : https://github.com/uber/baseweb (`documentation-site/pages/guides/colors.mdx`,
  `documentation-site/pages/components/tokens.mdx`, `documentation-site/pages/guides/theming.mdx`,
  `documentation-site/components/theming/colors.jsx`, `documentation-site/components/theming/common.jsx`).
