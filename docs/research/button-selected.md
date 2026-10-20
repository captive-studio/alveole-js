# Recherche : l'état `selected` de Button

Date : 2026-10-20. Sources primaires uniquement : code d'Alveole (branche `docs/research-button-selected`),
code des apps lu sur `origin/main` (`git show`, sans checkout), code source des références
(GitHub raw, registre npm), spécification W3C et APG.

- Primer React, `main` au commit `0d5607c3b29a` :
  https://raw.githubusercontent.com/primer/react/main/packages/react/src/SegmentedControl/SegmentedControlButton.tsx,
  `.../src/Button/ButtonBase.tsx`, `.../src/Button/types.ts`
- Base Web, `main` au commit `ed21081e33f7` :
  https://raw.githubusercontent.com/uber/baseweb/main/src/button/button.tsx,
  https://raw.githubusercontent.com/uber/baseweb/main/src/button-group/button-group.tsx
- Atlassian : paquet publié `@atlaskit/button@25.5.0` (https://registry.npmjs.org/@atlaskit/button/-/button-25.5.0.tgz).
  Les pages atlassian.design sont rendues côté client : leur texte n'a pas pu être extrait, la
  guidance d'usage n'est donc pas citée ici.
- WAI-ARIA 1.2 : https://www.w3.org/TR/wai-aria-1.2/
- APG : https://www.w3.org/WAI/ARIA/apg/patterns/button/ ,
  https://www.w3.org/WAI/ARIA/apg/patterns/radio/

## Résumé

`selected` est aujourd'hui un état **purement visuel** : il ne pose aucun attribut d'accessibilité.
Les quatre usages des apps relèvent de **trois motifs distincts** (bouton à bascule, choix unique
dans un groupe, déclencheur de filtre appliqué), que la doc d'Alveole ramène à un seul (« le
bouton fait partie d'un groupe et c'est lui qui est choisi »). Les références se partagent en deux
camps : Primer et Base traduisent l'état en ARIA (`aria-pressed`, ou `radio` + `aria-checked` dans un
groupe), Atlassian garde un `isSelected` visuel sans ARIA. Par ailleurs, le Button pose un
`aria-selected` invalide sur les boutons `type="submit"`.

## 1. Alveole : ce que fait `selected`

### Faits

- Prop non documentée dans le type : `selected?: boolean` (`packages/components/src/ui/Button/Button.types.ts:28`),
  recopiée dans `EtatDuBouton` (`Button.types.ts:57`), qui ne sert qu'aux styles.
- Le composant la retire des props avant le `Pressable` (`Button.tsx:46`) et ne la traduit en rien :
  `accessibilityState={{ disabled: inerte, expanded }}` (`Button.tsx:64`), `aria-expanded` seul posé
  directement (`Button.tsx:68`).
- Style : « `selected` court-circuite la variante : ces styles valent pour les cinq » ; fond
  `alt-primary`, bordure `default-primary`, texte `action-high-primary` (`Button.styles.ts:94-109`).
- Doc de story : « `selected` : le bouton fait partie d'un groupe et c'est lui qui est choisi » ;
  « `expanded` [...] pose aussi l'état accessible correspondant, ce que `selected` ne fait pas »
  (`Button.stories.tsx:58-60`).
- `active` est déprécié au profit d'`expanded` (`Button.types.ts:32-35`) ; les deux, avec l'appui, ne
  font qu'allumer le visuel `actif` (`Button.tsx:80`). Seul `expanded` pose `aria-expanded`.
- **Anomalie** : `{...(type === 'submit' ? { 'aria-selected': true } : {})}` (`Button.tsx:62`), présent
  depuis la création du composant (commit `11d87a26b ✨ Ajoute le composant Button`). Avec
  react-native-web 0.21.4, `aria-selected` est bien rendu dans le DOM
  (`node_modules/react-native-web/dist/modules/createDOMProps/index.js:319-321`), sur un élément de
  rôle `button` (`Button.tsx:61`).
- WAI-ARIA 1.2 limite `aria-selected` aux rôles `gridcell`, `option`, `row`, `tab` (hérité par
  `columnheader`, `rowheader`, `treeitem`) : https://www.w3.org/TR/wai-aria-1.2/#aria-selected .
  Le rôle `button` n'y figure pas : l'attribut y est invalide.
- react-native-web 0.21.4 rend aussi `aria-pressed` (`createDOMProps/index.js:279-281`) : un
  `aria-pressed` est donc techniquement posable sur le web.

### Usages internes

- `FilterDate` : le déclencheur porte `selected={!vide}` et `expanded={open}`
  (`packages/components/src/ui/FilterDate/FilterDate.tsx:214-216`) ; dans la feuille, chaque année
  et chaque mois est un Button `selected={selection.includes(...)}` (`FilterDate.tsx:153`, `:184`,
  `:259`), soit une sélection **multiple** à bascule.
- `FiltreDeroulant` (story) : déclencheur `selected={choisi !== null}` + `active={ouvert}` (déprécié),
  options dans un `ActionMenu.Item selected` (`packages/storybook/src/components/FiltreDeroulant.tsx:42-51`).

## 2. Usages dans les apps

| Usage                      | Code (`origin/main`)                                                                                                                                                                     | Motif réel                                                                                                      |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| groove, `IndexCRAFilters`  | trois Button `selected={statut === ...}`, re-clic remet `null` (`screens/admin/IndexCRAPage/IndexCRAFilters.tsx:16-27`)                                                                  | choix unique **facultatif** : radio qu'on peut décocher. Chaque bouton se comporte en bouton à bascule exclusif |
| groove, `HomePageFilters`  | `selected={hasSelected}` (filtre non vide), `active={isOpen}`, ouvre une BottomSheet de cases multiples (`screens/app/HomePage/HomePageFilters.tsx:83-127`)                              | **déclencheur de filtre appliqué** (même motif que `FilterDate`)                                                |
| dashboard, `AdminScreens`  | `FILTRES` = Toutes / En erreur / Sans projet, `selected={filtre === valeur}`, `onPress={() => setFiltre(valeur)}` (`frontend/src/screens/AdminScreens/AdminScreens.tsx:12-16`, `:48-50`) | choix unique **obligatoire** (« Toutes » = aucun filtre) : groupe radio / contrôle segmenté                     |
| dashboard, `AppLogsScreen` | `RANGES` = 30 min / 2h / 24h, `selected={range === r.value}` (`frontend/src/screens/AppLogsScreen/AppLogsScreen.tsx:12-16`, `:65-67`)                                                    | choix unique obligatoire : contrôle segmenté                                                                    |

Aucun de ces écrans n'expose l'état à un lecteur d'écran : dans les quatre cas, seul l'œil voit
quel bouton est choisi (conséquence directe de `Button.tsx:64`).

## 3. Références

### WAI-ARIA 1.2 et APG

- `aria-pressed` : état des boutons à bascule ; « If the attribute is not present, the button is
  not a toggle button » ; rôle autorisé : `button` (https://www.w3.org/TR/wai-aria-1.2/#aria-pressed).
- APG, bouton à bascule : spécifier `aria-pressed` ; le libellé ne doit pas changer avec l'état
  (https://www.w3.org/WAI/ARIA/apg/patterns/button/).
- Choix exclusif : motif radio group, `role="radiogroup"` + `role="radio"` + `aria-checked`
  (https://www.w3.org/WAI/ARIA/apg/patterns/radio/).
- `aria-current` : « the current item within a container or set of related elements », autorisé
  sur tous les rôles (https://www.w3.org/TR/wai-aria-1.2/#aria-current). Il vise la navigation
  (page, étape), pas un choix de filtre.
- `aria-selected` : réservé à `gridcell`, `option`, `row`, `tab` (voir plus haut). Un onglet
  (`tab`) est le seul cas « bouton choisi dans un groupe » qui l'utilise, et il commande un panneau.
- Le « bouton de filtre appliqué » n'est pas un motif APG nommé. Ce qu'ARIA offre pour ce
  déclencheur : `aria-expanded` pour l'ouverture ; l'état « filtre actif » passe par le libellé
  (texte ou compteur), aucun attribut ne le porte.

### Primer

- Button : aucune prop `selected` ni `aria-pressed` dans `src/Button/types.ts` et
  `src/Button/ButtonBase.tsx` (recherche `selected|pressed` : seule occurrence, un commentaire sur
  `disabled`, `types.ts:31`).
- Le choix exclusif est un composant dédié, `SegmentedControl` : chaque `SegmentedControlButton`
  porte `selected` et le traduit en `aria-pressed={selected}` (`SegmentedControlButton.tsx:14-15`,
  `:53`).
- Les filtres à options passent par des composants de menu (ActionMenu, SelectPanel), dont la
  sélection est portée par les éléments du menu, pas par le bouton déclencheur (voir aussi
  `FiltreDeroulant.tsx:51`, qui reproduit ce schéma).

### Base Web

- Button `isSelected` : posé en `aria-pressed` si le bouton est autonome ; « Only need to apply
  aria-pressed if it's a standalone button with isSelected prop » (`src/button/button.tsx:168-173`).
- ButtonGroup : `role={isRadio ? 'radiogroup' : 'group'}` (`button-group.tsx:74`) ; les enfants
  reçoivent `aria-checked` et `role` `radio` (mode radio) ou `checkbox` (mode checkbox)
  (`button-group.tsx:145-157`) ; un groupe sans mode ni `selected` ne pose rien, « avoid adding
  aria-pressed to buttons in actionable button group » (`button-group.tsx:60-62`, `:85-89`).
  Le mode radio gère aussi le roving tabindex (`button-group.tsx:98-106`).

### Atlassian

- `isSelected` : « Indicates that the button is selected » (`dist/types/new-button/variants/types.d.ts:23-26`).
- Purement visuel : `button-base.js:152` (`isSelected = propIsSelected && !isDisabled`) et `:170-176`
  (styles `selectedStyles`) ; aucune occurrence d'`aria-pressed` ni d'`aria-checked` dans
  `dist/es2019/new-button` (recherche `grep`).
- Un `FilterButton` dédié existe : « A default-appearance button with a built-in trailing count for
  filter controls. Unselected counts are neutral. Selected counts are information blue [...] »
  (`dist/types/new-button/variants/filter/button.d.ts:14-19`). Atlassian assume donc le motif
  « filtre appliqué » comme un état visuel du déclencheur, signalé aussi par un compteur.

## 4. Analyse et recommandation

Cette section est une recommandation, pas un fait sourcé.

### Verdict par usage

- **`AdminScreens`, `AppLogsScreen`** : usage **détourné**. C'est un choix exclusif obligatoire, que
  Primer sert par `SegmentedControl` et Base par `ButtonGroup mode="radio"`. Des Button isolés n'ont
  ni rôle de groupe, ni état annoncé, ni navigation aux flèches.
- **`IndexCRAFilters`** : **à la frontière**. Le re-clic qui décoche en fait un ensemble de boutons à
  bascule mutuellement exclusifs ; le motif juste est un toggle button (`aria-pressed`) ou un
  contrôle segmenté avec une option « Tous ». L'usage visuel est cohérent, l'accessibilité manque.
- **`HomePageFilters`, `FilterDate` (déclencheur), `FiltreDeroulant`** : usage **légitime du motif**
  « déclencheur de filtre appliqué », qu'Atlassian outille (`FilterButton`). Mais ce n'est pas
  « le bouton choisi dans un groupe » de la doc : la doc ne couvre pas ce cas. L'état devrait
  aussi se lire dans le libellé (valeur choisie ou compteur), comme `libelleDuFiltre` le fait déjà
  dans `FiltreDeroulant`.
- **`FilterDate` (années, mois)** : sélection multiple à bascule, motif toggle button ou
  checkbox group.

### `selected` sur Button : pertinent tel quel ?

Non, sous sa forme actuelle : un même nom recouvre trois motifs, aucun n'est annoncé, et la doc en
décrit un seul (le moins bien servi par un Button). Options, de la plus légère à la plus complète :

1. **Renommer en `pressed` et poser `aria-pressed`** (choix Base pour le bouton autonome). Juste pour
   `IndexCRAFilters` et les années / mois de `FilterDate`. Faux pour le déclencheur de filtre :
   annoncer « pressé » un bouton qui ouvre un menu induit en erreur, alors qu'il porte déjà
   `aria-expanded`.
2. **Garder un état purement visuel pour le déclencheur** (choix Atlassian), sous un nom qui dit le
   motif (par ex. `applied` / filtre actif), l'état accessible passant par le libellé.
3. **Composant dédié pour le choix exclusif** (`SegmentedControl` à la Primer, ou groupe radio à la
   Base), pour `AdminScreens` et `AppLogsScreen`.

Recommandation : combiner 1 + 3 et retirer `selected` de Button. `pressed` (avec `aria-pressed`)
couvre les bascules ; un `SegmentedControl` couvre le choix unique ; le déclencheur de filtre
s'appuie sur `expanded` et un libellé qui porte la valeur, avec, si le design tient à le
distinguer, un état visuel nommé pour ce seul motif (option 2) plutôt qu'un `selected` générique.
C'est un changement cassant pour les quatre écrans cités, à chiffrer avant de trancher.

Indépendamment de ce choix : supprimer `aria-selected` sur `type="submit"` (`Button.tsx:62`),
invalide sur le rôle `button` et sans rapport avec la soumission.
