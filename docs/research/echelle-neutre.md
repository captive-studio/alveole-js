# Recherche : l'échelle de gris (Neutre) d'Alveole

Date : 2026-10-27. Sources primaires uniquement : code d'Alveole (`main` au commit `64e88e31b`),
code source et paquets publiés des références, spécifications W3C. Toutes les valeurs OKLCH, L*,
WCAG et APCA du document sont calculées localement (script Python, formules OKLab de Björn
Ottosson, CIELAB D65, WCAG 2 « relative luminance », APCA 0.0.98G-4g). Aucune valeur n'est
reprise d'un outil en ligne.

- Alveole : `packages/theme/src/constants/Color.ts` (échelles), `Palette.ts` (rôles)
- Radix Colors : paquet `@radix-ui/colors@3.0.0` (`slate.css`, `gray.css`) ; docs source
  https://raw.githubusercontent.com/radix-ui/website/main/data/colors/docs/palette-composition/understanding-the-scale.mdx
  et `.../composing-a-palette.mdx`
- Tailwind CSS : paquet `tailwindcss@4.1.11`, fichier `theme.css`
- Material 3 : https://github.com/material-foundation/material-color-utilities (`typescript/palettes/core_palette.ts`,
  `typescript/dynamiccolor/color_spec_2021.ts`)
- Primer (GitHub) : paquet `@primer/primitives@10.3.4`, `dist/css/functional/themes/light.css`
- DSFR : paquet `@gouvfr/dsfr@1.13.0`, `dist/core/core.css`
- WCAG 2.2 : https://www.w3.org/TR/WCAG22/ ; APCA : https://github.com/Myndex/apca-w3 (README)
- Non couverts faute de source primaire extractible : Geist/Vercel (doc rendue côté client, pas de
  paquet de tokens publié identifié), Linear, Stripe.

## Résumé

L'échelle Neutre n'a **pas de défaut de luminosité palier par palier** : ses numéros suivent la
convention DSFR (numéro ≈ L* CIELAB × 10) et ses valeurs collent au gris du DSFR à 0,5 point près.
Elle est **teintée bleu** (teinte OKLCH ≈ 262°, cohérente avec BleuCaptive à 256-259°), avec une
chroma environ **deux fois plus forte que Radix slate** sur les fonds et bordures, du même ordre
que Primer. L'écart perçu avec le prototype vient surtout de trois choix de **rôles**, pas de
l'échelle : un fond plus sombre (975, L 97,6 contre 98,5), une bordure nettement plus foncée et
bleutée (900, L 91,5 C 0,013 contre `#ebebeb` L 94,0 neutre), et un texte principal moins profond
(50, L 20,0 contre 14,5 ; le texte courant `default-grey` est même le 200, L 34,7). Défauts
structurels réels : une **incohérence de chroma** entre 975 (presque neutre) et 950 (bleuté), et
un **trou** entre 850 (L 87) et 625 (L 67,5) où il manque un palier de bordure forte.

## 1. Neutre pur ou teinté : qui fait quoi

| Système     | Gris purs                                     | Gris teintés                                                          | Justification publiée                                                                                                                                                                                                                                          |
| ----------- | --------------------------------------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Radix       | `gray`                                        | `slate` (bleu), `mauve` (violet), `sage` (vert), + `olive`, `sand`    | « `gray` is pure gray […] `slate` is based on a blue hue » ; « choose the gray scale which is saturated with the hue closest to your accent hue. The difference is subtle, but this will create a more colorful and harmonius vibe » (composing-a-palette.mdx) |
| Tailwind v4 | `neutral` (C = 0), `zinc` (C ≤ 0,006 environ) | `slate` (C jusqu'à 0,046, h ≈ 257), `gray` (C jusqu'à 0,034), `stone` | Pas de texte de justification dans `theme.css`, seulement les valeurs : `--color-neutral-500: oklch(55.6% 0 0)`, `--color-slate-500: oklch(55.4% 0.046 257.417)`                                                                                               |
| Material 3  | non                                           | `neutral` et `neutral-variant` toujours teintés de la couleur source  | `n1 = fromHueAndChroma(hue, Math.min(chroma / 12, 4))`, `n2 = fromHueAndChroma(hue, Math.min(chroma / 6, 8))` (core_palette.ts, chroma HCT)                                                                                                                    |
| Primer      | non                                           | gris bleutés                                                          | `--bgColor-muted: #f6f8fa`, `--borderColor-default: #d1d9e0`, `--fgColor-muted: #59636e` (light.css) : h ≈ 244-251, C 0,003 à 0,022                                                                                                                            |
| DSFR        | `grey` pur                                    | non                                                                   | `--grey-975-75: #f6f6f6`, `--grey-425-625: #666` (core.css)                                                                                                                                                                                                    |

Radix met aussi en garde : « be careful when using saturated grays for your app background,
especially in dark mode. Colorful UI components may clash with your saturated gray background »
(composing-a-palette.mdx).

Lecture : les deux écoles coexistent dans des systèmes majeurs. Un gris teinté vers la primaire
est une pratique documentée (Radix, Material, Primer) ; un gris pur est le choix « simple » qui
s'accorde à tout (Radix `gray`, Tailwind `neutral`, DSFR).

## 2. Méthode de construction

- **Espace perceptuel.** Tailwind v4 définit toute sa palette en `oklch()` (`theme.css`).
  Material utilise HCT, où le « tone » est le L* CIELAB (`color_spec_2021.ts` fixe les rôles par
  tone : `surface` et `background` à 98 en clair, `on_surface` à 10, `outline` à 50,
  `on_surface_variant` à 30).
- **Chroma.** Chez Tailwind slate, la chroma est quasi constante de 400 à 950 (0,040 à 0,046) et
  chute vers 0,003 au palier 50. Chez Radix slate, elle monte des fonds (0,0013) jusqu'au palier 9
  (0,0165) puis redescend vers le texte (0,0097). Profil commun : **chroma faible aux extrémités
  claires**, maximale au milieu. Material fixe une chroma constante (4 ou 8 HCT) sur toute la
  palette tonale.
- **Teinte.** Faible dérive tolérée : Tailwind slate va de 248° à 266°, Radix slate de 248° à 286°.
- **Paliers et rôles (Radix, 12 paliers)** : 1-2 fonds d'app et fonds subtils ; 3-5 fonds de
  composants (normal, survol, pressé/sélectionné) ; 6-8 bordures (6 non interactive, 7 interactive,
  8 forte et focus) ; 9-10 aplats solides ; 11 texte peu contrasté, 12 texte contrasté
  (understanding-the-scale.mdx).
- **DSFR**, dont Alveole hérite (commentaire « Ancienne variable issue du DSFR » dans
  `Palette.ts`, nommage 975/950/925/850/625/425/200, suffixes `sun`/`moon`) : le numéro encode la
  clarté. Mesuré : `#f6f6f6` L* 96,9 (975), `#e5e5e5` L* 90,9 (925), `#929292` L* 60,6 (625),
  `#666` L* 43,2 (425). La relation numéro ≈ L* × 10 est une observation sur les valeurs, pas une
  règle trouvée écrite dans la source.

## 3. Contraste : WCAG 2 et APCA

- WCAG 2.2 SC 1.4.3 : texte « contrast ratio of at least 4.5:1 » (3:1 en grand corps) ;
  SC 1.4.11 : composants et graphiques non textuels « at least 3:1 ».
- APCA (README apca-w3, statut « beta ») : valeur Lc par taille et graisse. Texte courant visé
  vers Lc 75 ; « For sub-fluent text (i.e. not primary content) Lc values can be lowered by Lc 15,
  but in no case less than Lc 30 ».
- Radix garantit « Lc 60 and Lc 90 APCA contrast ratio » pour les paliers 11 et 12 sur le palier 2.
- Conséquence pour le texte secondaire : un gris autour de L OKLCH 50 sur un fond à 97-98 donne
  ≈ 5,5:1 WCAG et Lc ≈ 74-76. C'est le point d'équilibre commun à toutes les références
  mesurées (Radix slate 11, Primer `fgColor-muted`, DSFR 425, Alveole 425, prototype `#6b6b6b`).
  WCAG 2 n'interdit rien en dessous de la limite 4.5:1, tandis qu'APCA pénalise plus fortement les
  gris clairs sur fond clair, d'où des secondaires qui restent vers L 50 et pas plus clairs.
- Les bordures décoratives (non interactives) ne sont pas soumises au 3:1 de 1.4.11 ; aucune
  référence ne les y astreint (Radix slate 6 : 1,34:1).

## 4. Luminosité des fonds d'app

| Référence  | Fond de page                                           | Fond secondaire / panneau | Bordure courante                                                              |
| ---------- | ------------------------------------------------------ | ------------------------- | ----------------------------------------------------------------------------- |
| Radix      | blanc ou 1 `#fcfcfd` (L 99,1)                          | 2 `#f9f9fb` (98,3)        | 6 `#d9d9e0` (88,7)                                                            |
| Material 3 | `background`/`surface` tone 98                         | `surface_variant` tone 90 | `outline` tone 50                                                             |
| Primer     | `#ffffff` (100)                                        | `#f6f8fa` (97,8)          | `#d1d9e0` (88,1), en partie à 70 % d'opacité (`borderColor-muted: #d1d9e0b3`) |
| DSFR       | `#fff`                                                 | 975 `#f6f6f6` (97,3)      | 900 `#ddd` (89,8)                                                             |
| Prototype  | `#fafafa` (98,5)                                       |                           | `#ebebeb` (94,0)                                                              |
| Alveole    | 1000 `#fff` (`default-grey`) / 975 (`alt-grey`) (97,6) | 950 (95,8)                | 900 `#DEE3EC` (91,5)                                                          |

Fourchette observée : fond de page entre L 98 et 100, panneaux entre 96 et 98. Le fond à 97,6
d'Alveole est dans la fourchette basse, celui du prototype dans la haute.

## 5. Analyse de l'échelle Neutre

Fond de référence pour les colonnes WCAG/APCA : Neutre 975.

| palier | hex       | L OKLCH | C      | h          | L*    | WCAG/blanc | WCAG/975 | APCA/975 |
| ------ | --------- | ------- | ------ | ---------- | ----- | ---------- | -------- | -------- |
| 1000   | `#FFFFFF` | 100,0   | 0      |            | 100,0 | 1,00       | 1,07     | 0        |
| 975    | `#F6F7F8` | 97,6    | 0,0017 | (≈ neutre) | 97,2  | 1,07       | 1,00     | 0        |
| 950    | `#EFF1F6` | 95,8    | 0,0070 | 269        | 95,1  | 1,13       | 1,05     | 0        |
| 925    | `#E6EAF1` | 93,6    | 0,0104 | 262        | 92,6  | 1,21       | 1,12     | 0        |
| 900    | `#DEE3EC` | 91,5    | 0,0134 | 262        | 90,1  | 1,29       | 1,20     | 9,4      |
| 850    | `#CED5E1` | 87,1    | 0,0182 | 261        | 85,1  | 1,48       | 1,38     | 17,6     |
| 625    | `#8D97AC` | 67,5    | 0,0331 | 265        | 62,3  | 2,94       | 2,74     | 51,0     |
| 525    | `#747E91` | 59,1    | 0,0314 | 263        | 52,6  | 4,09       | 3,81     | 63,2     |
| 425    | `#5F6571` | 50,6    | 0,0205 | 264        | 42,7  | 5,86       | 5,46     | 74,4     |
| 200    | `#373A3F` | 34,7    | 0,0096 | 261        | 24,3  | 11,42      | 10,64    | 91,5     |
| 175    | `#323439` | 32,5    | 0,0093 | 268        | 21,7  | 12,46      | 11,61    | 93,5     |
| 150    | `#2D2F32` | 30,4    | 0,0061 | 258        | 19,3  | 13,43      | 12,52    | 95,0     |
| 125    | `#282A2D` | 28,4    | 0,0062 | 258        | 17,0  | 14,39      | 13,42    | 96,3     |
| 100    | `#232427` | 26,0    | 0,0058 | 271        | 14,2  | 15,52      | 14,47    | 97,6     |
| 75     | `#1D1E20` | 23,5    | 0,0041 | 264        | 11,2  | 16,68      | 15,55    | 98,8     |
| 50     | `#151617` | 20,0    | 0,0025 | 248        | 7,2   | 18,12      | 16,89    | 100,0    |

Prototype, pour comparaison (fond `#fafafa`) : fond L 98,5 ; bord `#ebebeb` L 94,0 ; secondaire
`#6b6b6b` L 52,8 (5,11:1, Lc 73,6) ; texte `#0a0a0a` L 14,5 (18,97:1). Tous à C = 0.

### Constats

1. **Luminosité régulière et conforme à sa convention.** Pour les paliers clairs et moyens, L* ×
   10 retombe sur le numéro à moins de 0,5 près (975 → 97,2 ; 900 → 90,1 ; 850 → 85,1 ; 525 →
   52,6 ; 425 → 42,7). 625 est un peu clair (62,3). Comparé au gris DSFR, les écarts de L OKLCH
   sont inférieurs à 1,5 point sur tous les paliers communs. Pas de palier « faux » en clarté.
2. **Teinte cohérente avec la marque.** h ≈ 261-265° sur tous les paliers où la chroma est
   significative ; BleuCaptive est à 244-259°. C'est exactement l'appariement que recommande
   Radix (gris saturé vers la teinte d'accent). La dérive dans les sombres (248-271°) est sans
   effet visible à C < 0,01.
3. **Chroma plus forte que Radix, comparable à Primer et Tailwind gray.** Bordure 900 : C 0,0134
   contre 0,0068 pour Radix slate 5 de clarté voisine, 0,013 pour Primer `#d1d9e0`, 0,010 pour
   Tailwind gray-300. Palier 625 : C 0,033 contre 0,0165 (Radix slate 9) et 0,040 (Tailwind
   slate-400). Neutre est donc entre Tailwind `gray` et `slate`, deux fois plus bleu que Radix
   `slate`.
4. **Incohérence de chroma dans les fonds.** 975 est quasi neutre (C 0,0017, teinte non
   significative), puis 950 saute à 0,0070 (×4) pour une différence de clarté de 1,8. Un fond 975
   bordé de 900/850 juxtapose donc une surface quasi grise et des traits nettement bleutés.
5. **Trou entre 850 et 625.** ΔL = 19,6 en un pas, contre 1,8 à 4,4 entre les paliers clairs.
   L'équivalent de Radix 7-8 (L 85 et 79), c'est-à-dire la bordure forte interactive et le focus,
   n'existe pas. Même trou plus loin entre 425 et 200 (ΔL 15,9).
6. **Paliers sombres très serrés.** 200 à 50 couvrent L 34,7 à 20,0 en 7 paliers (ΔL ≈ 2-3) :
   c'est une rampe de surfaces sombres (mode sombre, style DSFR `moon`), pas une rampe de texte.
7. **Rôles plus sombres que le prototype.** Fond `alt-grey` 975 : −0,9 point de L. Bordure
   `default-grey` 900 : −2,5 points de L et C 0,013 au lieu de 0. Texte `title-grey`/`label-grey`
   50 : L 20 au lieu de 14,5, et le texte courant `default-grey` est 200 (L 34,7, 10,6:1). Le
   secondaire `mention-grey` 425 est en revanche quasi identique au prototype (L 50,6 contre 52,8,
   même Lc). L'ensemble produit moins d'amplitude entre fond et texte et des lignes plus marquées,
   ce qui est cohérent avec l'impression d'une page « moins lumineuse ». Le lien entre cette
   impression et la teinte bleue est une hypothèse non vérifiée ici, aucune source primaire
   consultée ne la quantifie.

### Autres échelles, en bref

- **BleuCaptive** : teinte 244-259°, 975 à C 0,011 (bleu visible), `sun-172` (`#002764`) L 29,2,
  C 0,116. Cohérente avec Neutre.
- **SlateGrey** : teinte 197-245°, donc plus cyan que Neutre et que BleuCaptive en clair (975 à
  h 197, 950 à h 217) ; chroma 0,004 à 0,038. Deux gris teintés différents coexistent.
- **Échelles 50-950 « style Tailwind »** (Lilas, Cerise, GrisPolaire, Mariner…) : numérotation
  distincte de celle des échelles DSFR (975…75), ce qui fait deux conventions dans le même fichier.

## 6. Pistes (à arbitrer)

- **Garder l'échelle, revoir les rôles.** Fond de page en 1000 ou dans un nouveau palier vers L
  98,5 ; bordure par défaut en 925 (L 93,6) au lieu de 900 ; texte courant en 50 plutôt que 200.
  Aucun hex modifié, seulement `Palette.ts`.
- **Ajuster certains paliers.** Rendre la chroma progressive dans les clairs (975 un peu teinté
  ou 950/925/900 moins teintés, par exemple diviser par deux pour rejoindre Radix slate) ; ajouter
  un palier vers 775-800 (L ≈ 80) pour la bordure forte et le focus ; éventuellement un palier
  vers 300 pour le trou 425-200.
- **Remplacer.** Adopter une échelle de référence (Radix `slate` ou `gray`, Tailwind `slate` ou
  `neutral`) avec ses rôles documentés, au prix d'une renumérotation et d'une migration de
  `Palette.ts`, et de la perte de la correspondance avec la convention DSFR.
- **Pur ou teinté** est un choix de style, documenté des deux côtés : un gris pur maximise la
  neutralité et la lumière perçue du prototype ; un gris teinté vers 260° prolonge la marque
  BleuCaptive.

## 7. Combien de fonds, et pour quels rôles

Sources ajoutées pour cette section (thème clair uniquement) :

- Radix : `@radix-ui/colors@3.0.0` (`slate.css`) ; rôles dans `understanding-the-scale.mdx` (cité en tête)
- Primer : `@primer/primitives@10.3.4` (`dist/css/functional/themes/light.css`) ; rôles dans
  https://raw.githubusercontent.com/primer/primitives/main/src/tokens/functional/color/bgColor.json5 (`$description`)
- Material 3 : `@material/material-color-utilities@0.4.0`, `dynamiccolor/color_spec_2021.js`
  (tons en L* CIELAB, contraste standard) ; liste des rôles dans
  https://raw.githubusercontent.com/material-components/material-web/main/docs/theming/color.md
- DSFR : `@gouvfr/dsfr@1.13.0`, `dist/core/core.css` (valeurs) et `src/dsfr/component/*/style/_scheme.scss` (usages)
- Atlassian : `@atlaskit/tokens@20.8.2`, `dist/esm/artifacts/tokens-raw/atlassian-light.js` (valeurs et `description`)
- Carbon : `@carbon/themes@11.84.0`, `lib/index.js` (régions `themes/white.js` et `themes/g10.js`)
- Fluent 2 : `@fluentui/tokens@1.0.0-alpha.24` (dépendance de `@fluentui/react-theme@9.2.2`),
  `lib/alias/lightColor.js` et `lib/global/colors.js`. Le paquet ne contient aucune description de rôle.
- Tailwind : `tailwindcss@4.1.11`, `theme.css` ne définit **que des échelles** (`--color-gray-50`…),
  aucun token sémantique de fond. Rien à recenser.

L OKLCH calculé localement (`python3 -I`, même méthode qu'en tête). Couleurs à alpha composées sur
blanc. Les tons Material sont convertis en gris neutre de même L* (la palette neutre M3 porte une
légère chroma, ignorée ici).

### 7.1 Inventaire

**Radix (slate)**. Rôles : « Steps 1 and 2 are designed for app backgrounds and subtle component
backgrounds. You can use them interchangeably » (fond d'app, carte, sidebar, bloc de code, tableau
zébré) ; « Step 3 is for normal states. Step 4 is for hover states. Step 5 is for pressed or
selected states. » La doc ajoute qu'on peut prendre **le blanc** comme fond d'app en clair.

| Palier | Valeur    | L    | Rôle                         |
| ------ | --------- | ---- | ---------------------------- |
| 1      | `#fcfcfd` | 99,1 | fond d'app ou de carte       |
| 2      | `#f9f9fb` | 98,3 | idem, interchangeable avec 1 |
| 3      | `#f0f0f3` | 95,6 | fond de composant, repos     |
| 4      | `#e8e8ec` | 93,2 | survol                       |
| 5      | `#e0e1e6` | 91,0 | pressé ou sélectionné        |

**Primer**. Page blanche, zones secondaires grises.

| Token                                         | Valeur                            | L                  | Rôle documenté                                                                                        |
| --------------------------------------------- | --------------------------------- | ------------------ | ----------------------------------------------------------------------------------------------------- |
| `bgColor-default`                             | `#ffffff`                         | 100                | « pages and main content areas »                                                                      |
| `bgColor-muted`                               | `#f6f8fa`                         | 97,8               | « secondary content areas and subtle grouping »                                                       |
| `bgColor-inset`                               | = `muted`                         | 97,8               | « recessed content areas like wells or sunken panels » (même valeur que `muted` en clair dans 10.3.4) |
| `bgColor-disabled`                            | `#eff2f5`                         | 96,0               | éléments désactivés                                                                                   |
| `bgColor-neutral-muted`                       | `#818b981f`                       | 95,7 (sur blanc)   | tags, labels                                                                                          |
| `control-bgColor-rest` / `-hover` / `-active` | `#f6f8fa` / `#eff2f5` / `#e6eaef` | 97,8 / 96,0 / 93,5 | contrôles (boutons)                                                                                   |
| `control-bgColor-selected`                    | = `rest`                          | 97,8               |                                                                                                       |
| `overlay-bgColor`, `card-bgColor`             | `#ffffff`                         | 100                | superpositions, cartes                                                                                |
| `bgColor-emphasis`                            | `#25292e`                         | (sombre)           | « high-emphasis dark background »                                                                     |

**Material 3** (spec 2021, contraste standard). Page **non blanche** (tone 98), conteneurs plus
sombres, le seul blanc est `surface-container-lowest`.

| Rôle                                           | Tone | Gris équivalent | L    |
| ---------------------------------------------- | ---- | --------------- | ---- |
| `surface-container-lowest`                     | 100  | `#ffffff`       | 100  |
| `background`, `surface`, `surface-bright`      | 98   | `#f9f9f9`       | 98,2 |
| `surface-container-low`                        | 96   | `#f3f3f3`       | 96,4 |
| `surface-container`                            | 94   | `#eeeeee`       | 94,9 |
| `surface-container-high`                       | 92   | `#e8e8e8`       | 93,1 |
| `surface-container-highest`, `surface-variant` | 90   | `#e2e2e2`       | 91,3 |
| `surface-dim`                                  | 87   | `#dadada`       | 88,8 |

Le survol et la sélection ne sont pas des tokens de fond chez Material (couches d'état
superposées), donc absents ici.

**DSFR**. Page blanche, encarts gris.

| Token                                             | Valeur    | L    | Survol / actif (L)                  | Usages relevés dans les `_scheme.scss`                    |
| ------------------------------------------------- | --------- | ---- | ----------------------------------- | --------------------------------------------------------- |
| `default-grey` (et `raised`, `overlap`, `lifted`) | `#fff`    | 100  | `#f6f6f6` (97,3) / `#ededed` (94,6) | fond par défaut, élévations                               |
| `alt-grey`                                        | `#f6f6f6` | 97,3 | `#dfdfdf` (90,4) / `#cfcfcf`        | card (variante), footer, table                            |
| `contrast-grey`                                   | `#eee`    | 94,9 | `#d2d2d2` (86,4) / `#c1c1c1`        | input, select, tag, badge, callout, tile, notice, summary |

À noter : chez le DSFR, **le survol du blanc a exactement la valeur du fond `alt`** (`#f6f6f6`).
C'est ce que reproduit Alveole avec 975 pour `alt-grey` et `default-grey-hover`.

**Atlassian**. Page blanche ; une zone « enfoncée » grise qui reçoit des cartes blanches.

| Token                                     | Valeur      | L                    | Rôle documenté                                                                       |
| ----------------------------------------- | ----------- | -------------------- | ------------------------------------------------------------------------------------ |
| `elevation.surface`                       | `#FFFFFF`   | 100                  | « primary background for the UI » ; survol `#F0F1F2` (95,8), pressé `#DDDEE1` (90,1) |
| `elevation.surface.sunken`                | `#F8F8F8`   | 97,9                 | « secondary background… grouping items, such as Jira cards in columns »              |
| `elevation.surface.raised`                | `#FFFFFF`   | 100                  | « cards that can be moved »                                                          |
| `elevation.surface.overlay`               | `#FFFFFF`   | 100                  | modales, menus                                                                       |
| `elevation.surface.container`             | `#17171708` | 97,8 (sur blanc)     | « neutral container surface » ; survol 95,8                                          |
| `color.background.neutral.subtle.hovered` | `#0515240F` | 95,8                 | survol d'éléments sans fond                                                          |
| `color.background.input`                  | `#FFFFFF`   | 100                  | champs ; survol `#F8F8F8` (97,9)                                                     |
| `color.background.selected`               | `#E9F2FE`   | 95,8 (C 0,019, bleu) | sélection                                                                            |

**Carbon**. Deux thèmes clairs qui inversent les rôles **avec le même gris**.

| Token                                    | `white`                | `g10`     | L                       |
| ---------------------------------------- | ---------------------- | --------- | ----------------------- |
| `background` (page)                      | `#ffffff`              | `#f4f4f4` | 100 / 96,7              |
| `layer01` (panneau, carte)               | `#f4f4f4`              | `#ffffff` | 96,7 / 100              |
| `layer02`                                | `#ffffff`              | `#f4f4f4` |                         |
| `layerHover01`                           | `#e8e8e8`              | `#e8e8e8` | 93,1                    |
| `layerSelected01`, `layerAccent01`       | `#e0e0e0`              | `#e0e0e0` | 90,7                    |
| `backgroundHover` / `backgroundSelected` | gris 141 à 12 % / 20 % | idem      | 95,9 / 93,2 (sur blanc) |

**Fluent 2** (rôles déduits des noms seulement, aucune description dans le paquet).

| Token                                     | Valeur            | L                  | Survol                   | Sélectionné    |
| ----------------------------------------- | ----------------- | ------------------ | ------------------------ | -------------- |
| `colorNeutralBackground1`                 | blanc             | 100                | grey 96 `#f5f5f5` (97,0) | grey 92 (94,0) |
| `colorNeutralBackground2`                 | grey 98 `#fafafa` | 98,5               | grey 94 (95,5)           | grey 90 (92,5) |
| `colorNeutralBackground3`                 | grey 96 `#f5f5f5` | 97,0               | grey 92 (94,0)           | grey 88        |
| `colorNeutralBackground4` à `6`           | grey 94, 92, 90   | 95,5 / 94,0 / 92,5 |                          |                |
| `colorSubtleBackgroundHover` / `Selected` | grey 96 / 92      | 97,0 / 94,0        |                          |                |

### 7.2 Synthèse

**Nombre de niveaux.** Hors blanc, les systèmes qui documentent leurs rôles convergent sur
**deux fonds neutres statiques** : un gris très clair pour « zone secondaire / regroupement /
panneau » (Primer `muted`, DSFR `alt`, Atlassian `sunken`, Carbon `layer01`, Radix 2) et un gris
plus marqué pour « fond de composant » (DSFR `contrast` sur les champs et tags, Radix 3, Primer
`control-rest`, Carbon `field01` `#f4f4f4`). S'y ajoutent **deux états** : survol et
pressé/sélectionné. Material (6 conteneurs) et Fluent (6 fonds) sont plus fins mais sans rôle
écrit pour chaque palier. Le « inset » (zone en retrait) existe comme nom chez Primer et Atlassian,
mais Primer lui donne la même valeur que `muted` en clair.

**Rôles qui reviennent partout** : page (blanc, sauf Material 98,2 et Carbon g10 96,7), surface
superposée (modale, menu : toujours blanc), zone secondaire grise, survol, sélection.

**Écarts de luminosité (L OKLCH)**

|              | Page        | Zone secondaire | Survol (depuis le blanc) | Sélection / pressé          |
| ------------ | ----------- | --------------- | ------------------------ | --------------------------- |
| Radix        | 100 ou 99,1 | 98,3            | 3 → 4 : 95,6 → 93,2      | 91,0                        |
| Primer       | 100         | 97,8            | contrôle 97,8 → 96,0     | 93,5                        |
| Material     | 98,2        | 96,4 à 91,3     | (couches d'état)         |                             |
| DSFR         | 100         | 97,3            | 97,3                     | 94,6                        |
| Atlassian    | 100         | 97,9            | 95,8                     | 90,1 (sélection bleue 95,8) |
| Carbon white | 100         | 96,7            | 95,9                     | 93,2                        |
| Fluent       | 100         | 98,5 / 97,0     | 97,0                     | 94,0                        |
| Alveole      | 100         | 97,6            | 97,6                     | 93,6 (925)                  |

Zone secondaire : entre 96,7 et 98,5, écart au blanc de 1,5 à 3,3 points. Survol depuis le
blanc : entre 95,8 et 97,3, soit 2,7 à 4,2 points ; Alveole (2,4) et le DSFR (2,7) sont les plus
discrets. Sélection : 90 à 94,6.

**Page grise sous cartes blanches : faut-il un gris plus clair ?** Aucune source consultée ne le
dit. Le seul point de comparaison direct va plutôt dans l'autre sens : Carbon utilise **le même
`#f4f4f4`** comme encart sur page blanche (`white`, `layer01`) et comme page sous cartes blanches
(`g10`, `background`). Atlassian, qui documente le cas « cartes dans des colonnes », met ces
colonnes à `sunken` 97,9 et les cartes en blanc ; Radix déclare 1 et 2 interchangeables pour fond
d'app et fond de carte. Pas de règle écrite au-delà.

### 7.3 Ce que ça implique pour « remplacer 975 par plus lumineux »

Le 975 d'Alveole porte **deux rôles** : `alt-grey` (zone secondaire, 97,6) et
`default-grey-hover` (survol du blanc). C'est l'héritage direct du DSFR, où les deux valent
`#f6f6f6`. Le monter vers 98,3 à 98,5 (Radix 2, Fluent 2, prototype) rapprocherait `alt-grey` du
haut de la fourchette observée, mais ramènerait le survol à 1,5 à 1,7 point du blanc, sous tous
les survols relevés (2,7 à 4,2). Options, sans arbitrage :

1. **Éclaircir 975 et déplacer le survol** : `default-grey-hover` passe sur 950 (95,8, proche
   d'Atlassian et Carbon) ou sur un nouveau palier intermédiaire ; `default-grey-active` reste 925.
2. **Garder 975 tel quel et ajouter un palier plus clair** (vers 98,5) dédié à `alt-grey` : le
   survol ne bouge pas, au prix d'un palier de plus et d'un écart à la numérotation DSFR.
3. **Garder 975 et changer l'usage** : page blanche, et 975 réservé aux zones secondaires
   (comme Primer `muted` 97,8 et Atlassian `sunken` 97,9, qui en sont à 0,2-0,3 point). La
   différence perçue avec le prototype viendrait alors des autres rôles (bordure, texte, cf. §5).
4. **Inverser à la Carbon g10** : page en 975, cartes et panneaux en blanc. Aucune source ne
   demande alors un gris plus clair ; le survol sur la page devrait être redéfini (il ne peut plus
   valoir la couleur de la page).

## 8. Combien de bordures, et pour quels rôles

Décisions déjà prises et prises en compte ici : page grise, cartes blanches ; `alt-grey` passe à
`#F9FBFC` (L 98,7) ; les survols passent de 975 à 950 (`#EFF1F6`, L 95,8).

Sources ajoutées pour cette section (thème clair uniquement, mêmes paquets qu'au §7) :

- Radix : `slate.css` ; rôles des paliers 6 à 8 dans `understanding-the-scale.mdx` (cité en tête),
  section « Steps 6–8: Borders »
- Primer : `dist/css/functional/themes/light.css` et `dist/docs/functional/themes/light.json`
  (valeurs) ; rôles dans
  https://raw.githubusercontent.com/primer/primitives/main/src/tokens/functional/color/borderColor.json5 (`$description`)
- Material 3 : `dynamiccolor/color_spec_2021.js` (`outline` tone 50, `outline_variant` tone 80 en
  clair) ; usages dans les tokens de composants de material-web,
  https://raw.githubusercontent.com/material-components/material-web/main/tokens/versions/v0_192/
  (`_md-comp-outlined-text-field.scss`, `_md-comp-outlined-card.scss`, `_md-comp-divider.scss`)
- DSFR : `dist/core/core.css` (valeurs) ; usages dans `src/dsfr/component/*/style/_scheme.scss`
  (appels `border <rôle> grey` et `box-shadow(plain grey, …, bottom-2-in)`)
- Atlassian : `tokens-raw/atlassian-light.js` (valeurs et `description`)
- Carbon : `lib/index.js` (régions `white.js` et `g10.js`) ; rôles dans
  https://raw.githubusercontent.com/carbon-design-system/carbon-website/main/src/data/guidelines/color-tokens.js (`role`)
- Fluent 2 : `lib/alias/lightColor.js` et `lib/global/colors.js` ; aucun rôle écrit, déduit des noms
- WCAG 2.2, critère 1.4.11 : https://www.w3.org/TR/WCAG22/#non-text-contrast et
  https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html

Calculs locaux (`python3 -I`, même méthode qu'en tête) : L OKLCH, contraste WCAG 2 contre le blanc
et contre `#F9FBFC`. Les couleurs à alpha sont composées sur chacun des deux fonds (la colonne L
donne la valeur sur blanc, avec la valeur sur `#F9FBFC` entre parenthèses quand elle diffère).

### 8.1 Ce qu'exige WCAG 1.4.11

Texte du critère (niveau AA) : « The visual presentation of the following have a contrast ratio
of at least 3:1 against adjacent color(s): User Interface Components: Visual information required
to identify user interface components and states, except for inactive components or where the
appearance of the component is determined by the user agent and not modified by the author ».

Ce que précise le document « Understanding » :

- **Seule l'information nécessaire pour identifier le composant compte.** « If a control has
  visible content (such as text or a sufficiently contrasting icon) […] then a border or other
  indication of the overall boundary of the hit area is not required, as is therefore not subject
  to non-text contrast requirements. » Un bouton avec libellé n'a donc pas besoin d'une bordure à
  3:1.
- **Le champ de saisie est le cas type où la bordure compte** : l'exemple de réussite est « A
  standard text input with a grey border (#767676) and white adjacent color outside the
  component ». Un champ sans bordure, distingué par son fond, doit avoir ce fond à 3:1 du fond
  adjacent.
- **Désactivé exclu** : « this requirement does not apply to inactive user interface components ».
- **Survol non exigé contre le repos** : « there is not a new requirement […] that mouse hover
  indicators contrast with the default state ».
- **Focus** : l'indicateur de focus doit contraster à 3:1 avec le fond adjacent (section
  « Relationship with Focus Visible »).
- **Bordures décoratives** (séparateurs, contours de cartes non interactives) : hors champ, ce ne
  sont ni des composants ni des « parts of graphics required to understand the content ».

### 8.2 Inventaire

**Radix (slate)**. « Steps 6, 7, and 8 are designed for borders. Step 6 is designed for subtle
borders on components which are not interactive. For example sidebars, headers, cards, alerts,
and separators. Step 7 is designed for subtle borders on interactive components. Step 8 is
designed for stronger borders on interactive components and focus rings. »

| Palier | Valeur    | L    | /blanc | /F9FBFC | Rôle                                                |
| ------ | --------- | ---- | ------ | ------- | --------------------------------------------------- |
| 6      | `#d9d9e0` | 88,7 | 1,40   | 1,35    | non interactif : sidebar, header, carte, séparateur |
| 7      | `#cdced6` | 85,3 | 1,57   | 1,51    | interactif, discret                                 |
| 8      | `#b9bbc6` | 79,4 | 1,91   | 1,84    | interactif, fort ; anneau de focus                  |

Aucun palier gris de Radix n'atteint 3:1 avant le 9 (couleur pleine) ; la doc ne parle pas de
contraste pour les bordures.

**Primer**.

| Token                                                     | Valeur           | L           | /blanc | /F9FBFC | Rôle documenté                                                      |
| --------------------------------------------------------- | ---------------- | ----------- | ------ | ------- | ------------------------------------------------------------------- |
| `borderColor-muted` (= `neutral-muted`)                   | `#d1d9e0` à 70 % | 91,7 (91,3) | 1,28   | 1,25    | « Subtle border for secondary elements and light separators »       |
| `borderColor-default` (= `control-borderColor-rest`)      | `#d1d9e0`        | 88,1        | 1,43   | 1,38    | « Default border color for most UI elements » ; repos des contrôles |
| `borderColor-translucent`                                 | `#1f2328` à 15 % | 90,1 (89,0) | 1,34   | 1,34    | « overlays and layered elements »                                   |
| `borderColor-emphasis` (= `control-borderColor-emphasis`) | `#818b98`        | 63,3        | 3,45   | 3,33    | « Strong border for emphasis and visual weight »                    |
| `borderColor-neutral-emphasis`                            | `#59636e`        | 49,5        | 6,11   | 5,89    | « Strong neutral semantic border »                                  |
| `borderColor-disabled` (= `control-borderColor-disabled`) | `#818b98` à 10 % | 96,4 (95,2) | 1,11   | 1,11    | « disabled interactive elements »                                   |
| `focus-outlineColor`                                      | `#0969da` (bleu) |             |        |         | focus                                                               |

Primer sépare donc le repos des contrôles (`control-borderColor-rest`, 1,43) d'une variante
`control-borderColor-emphasis` à 3,45:1. Les paquets consultés ne disent pas quel composant
utilise laquelle.

**Material 3**. Deux rôles seulement.

| Rôle              | Tone | Gris équivalent | L    | /blanc | /F9FBFC | Usage dans les tokens de composants           |
| ----------------- | ---- | --------------- | ---- | ------ | ------- | --------------------------------------------- |
| `outline-variant` | 80   | `#c6c6c6`       | 82,7 | 1,71   | 1,65    | carte « outlined » (`outline-color`), divider |
| `outline`         | 50   | `#777777`       | 56,9 | 4,48   | 4,31    | champ « outlined » au repos (`outline-color`) |

Survol du champ : `on-surface` (texte) ; désactivé : `on-surface` à 12 % d'opacité ; focus :
`primary`.

**DSFR**. Le champ n'a **pas de contour gris** : fond `contrast-grey` (`#eee`) et filet bas de
2 px `plain grey` (`input-base/_scheme.scss`, `select/_scheme.scss`).

| Token                     | Valeur    | L    | /blanc | /F9FBFC | Usages relevés                                              |
| ------------------------- | --------- | ---- | ------ | ------- | ----------------------------------------------------------- |
| `border-disabled-grey`    | `#e5e5e5` | 92,2 | 1,26   | 1,21    | tile désactivée                                             |
| `border-default-grey`     | `#ddd`    | 89,8 | 1,36   | 1,31    | card, header, modal, quote, tab, tile, tooltip              |
| `border-contrast-grey`    | `#929292` | 66,0 | 3,11   | 3,00    | table                                                       |
| `border-plain-grey`       | `#3a3a3a` | 34,8 | 11,37  | 10,96   | alert, notice, table, tile ; filet bas des champs et select |
| `border-action-high-grey` | `#161616` | 20,0 | 18,10  | 17,43   | (aucun appel `border action-high grey` trouvé)              |

**Atlassian**.

| Token                                      | Valeur           | L           | /blanc | /F9FBFC | Rôle documenté                                                                        |
| ------------------------------------------ | ---------------- | ----------- | ------ | ------- | ------------------------------------------------------------------------------------- |
| `color.border.disabled`                    | `#051524` à 6 %  | 95,8 (94,6) | 1,13   | 1,13    | « borders of elements in a disabled state »                                           |
| `color.border` (et `code`, `input.search`) | `#0B120E` à 14 % | 89,8 (88,7) | 1,35   | 1,35    | « visually group or separate UI elements, such as flat cards or side panel dividers » |
| `color.border.input`                       | `#8C8F97`        | 65,0        | 3,24   | 3,12    | « borders of form UI elements, such as text fields, checkboxes, and radio buttons »   |
| `color.border.bold`                        | `#7D818A`        | 60,3        | 3,90   | 3,76    | « A neutral border option that passes min 3:1 contrast ratios »                       |
| `color.border.focused`                     | `#4688EC` (bleu) |             |        |         | focus                                                                                 |

Atlassian documente aussi l'exemption : les bordures « subtle » des couleurs sémantiques sont
« decorative […] borders that do not need to meet 3:1 contrast requirements ».

**Carbon** (thème `white` ; `g10` inverse 00/01 et 02/03 comme pour les fonds).

| Token                | `white`          | L    | /blanc | /F9FBFC | Rôle documenté                                                                                    |
| -------------------- | ---------------- | ---- | ------ | ------- | ------------------------------------------------------------------------------------------------- |
| `border-subtle-00`   | `#e0e0e0`        | 90,7 | 1,32   | 1,27    | « Subtle borders paired with $background »                                                        |
| `border-subtle-01`   | `#c6c6c6`        | 82,7 | 1,71   | 1,65    | « Subtle borders paired with $layer-01 »                                                          |
| `border-disabled`    | `#c6c6c6`        | 82,7 | 1,71   | 1,65    | « Disabled border color (excluding border-subtles) »                                              |
| `border-strong-01`   | `#8d8d8d`        | 64,3 | 3,32   | 3,20    | « Medium contrast border », « Border-bottom paired with $field-01 », « 3:1 AA non-text contrast » |
| `border-interactive` | `#0f62fe` (bleu) |      |        |         | « 3:1 AA contrast », « Selected borders », « Active borders »                                     |

Comme le DSFR, Carbon trace le champ par un **filet bas** à 3:1 sur un fond de champ gris.

**Fluent 2** (rôles déduits des noms).

| Token                                                          | Valeur                     | L                  | /blanc | /F9FBFC |
| -------------------------------------------------------------- | -------------------------- | ------------------ | ------ | ------- |
| `colorNeutralStroke3`                                          | grey 94 `#f0f0f0`          | 95,5               | 1,14   | 1,10    |
| `colorNeutralStroke4`                                          | grey 92 `#ebebeb`          | 94,0               | 1,19   | 1,15    |
| `colorNeutralStroke2`, `StrokeSubtle`, `StrokeDisabled`        | grey 88 `#e0e0e0`          | 90,7               | 1,32   | 1,27    |
| `colorNeutralStroke1` (survol / pressé)                        | grey 82 `#d1d1d1` (78, 70) | 86,1 (83,0 / 76,7) | 1,53   | 1,47    |
| `colorNeutralStrokeAccessible` (survol / pressé : grey 34, 30) | grey 38 `#616161`          | 49,3               | 6,19   | 5,97    |
| `colorStrokeFocus2`                                            | noir                       |                    |        |         |

### 8.3 Alveole : tokens `light.border` gris

`packages/theme/src/constants/Palette.ts`, commit `64e88e31b`. Nombre de fichiers de
`packages/components/src` (hors tests et stories) qui lisent le token via `border['…']`.

| Token              | Pointe sur | Valeur    | L    | /blanc | /F9FBFC | Fichiers            |
| ------------------ | ---------- | --------- | ---- | ------ | ------- | ------------------- |
| `disabled-grey`    | Neutre 925 | `#E6EAF1` | 93,6 | 1,21   | 1,16    | 6                   |
| `default-grey`     | Neutre 900 | `#DEE3EC` | 91,5 | 1,29   | 1,24    | 27                  |
| `contrast-grey`    | Neutre 625 | `#8D97AC` | 67,5 | 2,94   | 2,83    | 2 (SelectList, Tag) |
| `plain-grey`       | Neutre 200 | `#373A3F` | 34,7 | 11,42  | 11,00   | 1 (PriceInput)      |
| `action-high-grey` | Neutre 50  | `#151617` | 20,0 | 18,12  | 17,46   | 0                   |

Pour mémoire, tokens colorés : `default-primary` 4, `action-high-primary` 3, `plain-error` 6,
`plain-success` 5, `plain-info` 1 ; `active-primary`, `open-primary`, `plain-primary`,
`plain-warning`, `action-low-primary` 0.

Constats :

- `default-grey` porte **tous les rôles** : séparateurs et cartes (Divider, Card, Sidebar,
  Header, DataTable, Accordion…) **et** contours de champs (`FormControl.inputInner`, fond
  `#FFFFFF`, `Select`, `OtpInput`, `RadioGroup`, `Switch`). À 1,29:1 contre le blanc, ce contour
  ne remplit pas, à lui seul, le rôle de délimitation que l'exemple de l'« Understanding » donne au
  champ (`#767676`, 4,5:1).
- `default-grey` (91,5) est **plus clair que toutes les bordures par défaut relevées** (88,1 à
  90,7, Material 82,7) ; seuls Primer `muted` (91,7) et Fluent `Stroke3`/`Stroke4` (94-95,5) sont
  plus clairs.
- `contrast-grey` (625) est à **2,94:1**, juste sous 3:1 (2,83 sur `#F9FBFC`) ; le DSFR, dont il
  dérive, est à 3,11 / 3,00. C'est le trou 850 → 625 déjà signalé au §5.
- Le survol décidé (950, L 95,8) est plus clair que `default-grey` et que `disabled-grey` : une
  bordure 900 reste visible sur un fond survolé (1,14:1 entre 900 et 950, calcul local).

### 8.4 Synthèse

**Nombre de niveaux.** Hors focus (toujours la couleur d'accent, sauf Fluent en noir) et hors
désactivé, les systèmes qui documentent leurs rôles ont **deux ou trois bordures grises** :

1. **Filet discret** pour séparer et contourner ce qui n'est pas interactif (carte, panneau,
   header, séparateur) : présent partout.
2. **Bordure de contrôle discrète** (repos d'un contrôle dont le libellé suffit à l'identifier) :
   Radix 7, Primer `control-rest` (= `default`), Fluent `Stroke1`. Absente chez Material, DSFR,
   Atlassian et Carbon, qui passent directement au niveau 3.
3. **Bordure forte à 3:1** pour délimiter un champ ou servir d'emphase : Primer `emphasis`,
   Material `outline`, DSFR `contrast`, Atlassian `input` et `bold`, Carbon `strong`, Fluent
   `Accessible`. Seul Radix n'en a pas.

Le désactivé est un token à part chez Primer, DSFR, Atlassian et Carbon, toujours plus clair que
le filet ou égal à lui. Le DSFR et Primer ont en plus une bordure très sombre (`plain`,
`neutral-emphasis`) pour les encadrés et la sémantique.

**Fourchettes (L OKLCH, sur blanc)**

| Rôle                              | Fourchette                                  | Contraste /blanc | Alveole                     |
| --------------------------------- | ------------------------------------------- | ---------------- | --------------------------- |
| Désactivé                         | 92,2 à 96,4 (Carbon 82,7)                   | 1,11 à 1,26      | `disabled-grey` 93,6 (1,21) |
| Filet discret (séparateur, carte) | 88,1 à 91,7 (Material 82,7, Fluent 94-95,5) | 1,28 à 1,43      | `default-grey` 91,5 (1,29)  |
| Contrôle discret                  | 85,3 à 88,1 (Fluent 86,1)                   | 1,43 à 1,57      | aucun                       |
| Fort, 3:1 (champ, emphase)        | 60,3 à 66,0 (Material 56,9, Fluent 49,3)    | 3,11 à 3,90      | `contrast-grey` 67,5 (2,94) |
| Très sombre (encadré, sémantique) | 34,8 à 49,5                                 | 6,1 à 11,4       | `plain-grey` 34,7           |

Sur `#F9FBFC`, les contrastes baissent de 3 à 4 % : DSFR `contrast` tombe pile à 3,00, Carbon
`strong-01` à 3,20, Atlassian `input` à 3,12.

**Concilier filets discrets et 3:1 des champs.** Trois stratégies observées, toutes appuyées sur
l'« Understanding » (seule l'information qui identifie le composant doit être à 3:1) :

- **Deux tokens distincts** : filet à 1,3-1,4:1 pour les cartes, bordure à 3:1+ pour les champs
  (Material `outline-variant` / `outline`, Atlassian `border` / `border.input`).
- **Filet bas fort sur fond gris** : le champ a un fond gris et seul son bord inférieur est à 3:1
  (DSFR `plain` sur `contrast-grey`, Carbon `strong-01` sur `field-01`).
- **Contrôle discret, emphase disponible** : Primer et Radix gardent des contours de contrôle à
  1,4-1,9:1 ; Primer expose en plus `control-borderColor-emphasis` à 3,45:1.

**Position d'Alveole.** L'échelle de valeurs suit le DSFR (900 ≈ `#ddd`, 925 ≈ `#e5e5e5`, 625 ≈
`#929292`, 200 ≈ `#3a3a3a`), mais pas son usage : Alveole contourne ses champs blancs avec
`default-grey` (1,29:1) là où le DSFR met un filet bas `plain` (11:1) sur fond gris, et là où
Material et Atlassian prennent un token à 3:1. `default-grey` est en haut de la fourchette des
filets ; `contrast-grey` est le seul token fort et il est à 2,94:1 ; il n'y a pas de niveau
« contrôle discret ».

### 8.5 Options pour réorganiser les bordures (sans arbitrage)

1. **Séparer filet et champ, à la Material / Atlassian** : `default-grey` reste le filet des
   cartes et séparateurs ; un token de champ (renommer ou réaffecter `contrast-grey`, en le
   descendant sous L 66 pour passer 3:1 sur `#F9FBFC`) devient le contour de `FormControl`,
   `Select`, `OtpInput`, `RadioGroup`, `Switch`. Impact : 6 fichiers environ, aspect des champs
   nettement plus marqué.
2. **Trois niveaux, à la Radix / Primer** : filet (900 ou plus sombre vers 88-89), contrôle
   discret (nouveau palier vers 85-86, comble en partie le trou 850 → 625), fort à 3:1 (625
   corrigé). Les contrôles avec libellé (bouton, tag) prennent le discret, les champs le fort.
3. **Filet bas à la DSFR / Carbon** : champs sur fond gris (950 ou 925) avec bord inférieur
   `plain-grey` ou 625 corrigé, contour latéral supprimé ou laissé au filet. Fidèle à l'héritage
   DSFR, mais change la forme des champs et entre en conflit avec le survol 950 décidé.
4. **Statu quo sur les valeurs, assombrir seulement `default-grey`** vers 88-89 (Radix 6, Primer,
   DSFR) : filets un peu plus visibles sur page `#F9FBFC`, sans régler le 3:1 des champs (1,4:1).
5. **Ménage des tokens** : `action-high-grey` et 5 tokens colorés ne sont lus par aucun fichier de
   `components/src` ; `plain-grey` par un seul. À garder pour la parité DSFR ou à retirer.

Dans toutes les options, `disabled-grey` (93,6) reste dans la fourchette observée et le focus
reste la couleur `Focus[525]` de `packages/theme/src/constants/Focus.ts` (`focusBorder`), hors tokens `border`, comme l'accent chez tous sauf Fluent.
