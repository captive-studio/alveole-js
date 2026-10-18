# Recherche : migration Tamagui 2.7.7 vers 3.0.3

Date : 2026-10-18. Sources primaires uniquement : guide de migration officiel lu au tag `v3.0.3`,
guide des valeurs plates au même tag, code source au tag, registre npm, release GitHub `v3.0.0`,
logs CI de la PR Renovate #647 (run `39131207129`).

- Guide : https://github.com/tamagui/tamagui/blob/v3.0.3/code/tamagui.dev/data/docs/guides/how-to-upgrade.mdx
  (publié sur https://tamagui.dev/docs/guides/how-to-upgrade). Les numéros de ligne « l. » ci-dessous
  renvoient à ce fichier.
- Valeurs plates : https://github.com/tamagui/tamagui/blob/v3.0.3/code/tamagui.dev/data/docs/guides/flat-values.mdx
- Types core : https://github.com/tamagui/tamagui/blob/v3.0.3/code/core/web/src/types.tsx
- Release : https://github.com/tamagui/tamagui/releases/tag/v3.0.0
- Registre : https://registry.npmjs.org/tamagui/3.0.3, `/@tamagui/core/3.0.3`, `/@tamagui/sheet/3.0.3`,
  `/@tamagui/babel-plugin`

## Résumé

La v3 n'est pas une montée de version de dépendance : c'est une nouvelle syntaxe de style.
Le guide l'écrit sans détour (l. 44-48) : « There is no runtime compatibility path for
sigil-prefixed values or V2 condition objects such as `hoverStyle` ». Les objets de condition
(`hoverStyle`, `pressStyle`, `focusStyle`, `focusVisibleStyle`, `enterStyle`, `exitStyle`,
`disabledStyle`) et les tokens `$xxx` disparaissent au profit de valeurs plates
(`bg="background hover:background-hover"`).

Pour Alveole, quatre chantiers dominent :

1. **Objets de condition** : `Box` et `Typography` déclarent leurs props avec
   `Pick<TamaguiViewProps, 'exitStyle' | 'focusStyle' | 'pressStyle' | 'disabledStyle'>` et passent
   `hoverStyle` à Tamagui. Ces deux lignes produisent à elles seules l'essentiel des 1 497
   erreurs TS2739 de la CI. S'y ajoute `focusVisibleStyle`, pivot de l'ADR 0017.
2. **Toast** : l'API impérative (`ToastProvider`, `ToastViewport`, `useToastController`,
   `useToastState`) est supprimée (§18).
3. **Config** : `@tamagui/config/v3` n'existe plus, ce qui casse toutes les suites Jest et la
   config d'`apps/docs`. Le chemin recommandé est `@tamagui/config/v5`, pas v6.
4. **Outillage** : `@tamagui/babel-plugin` est supprimé (pas de 3.x publiée), et `Sheet.Frame`
   devient `Sheet.Container` + `Sheet.Background`.

La plage peer `^2.7.7 || ^3.0.0` proposée par Renovate n'est pas tenable honnêtement : le code
d'Alveole ne peut pas compiler contre les deux (voir plus bas). Effort estimé : élevé, nettement
supérieur à la v2, dominé par la réécriture des styles conditionnels et la vérification visuelle.

## Versions requises

| Exigence                                                                                                 | Source                                                                                                                       | État du dépôt                                                                                                             |
| -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| React 19                                                                                                 | guide l. 15-18 ; `peerDependencies: { react: ">=19" }` de `tamagui`, `@tamagui/core`, `@tamagui/toast` 3.0.3 (registre npm)  | 19.2.3 : conforme                                                                                                         |
| React Native 0.81+ (New Architecture pour le runtime natif optionnel et les dégradés natifs, l. 185-191) | guide l. 15-18                                                                                                               | 0.86.3 : conforme                                                                                                         |
| TypeScript 5+                                                                                            | guide l. 15-18                                                                                                               | non mesuré ici                                                                                                            |
| **`react-native-safe-area-context` (nouveau peer)**                                                      | `tamagui@3.0.3` et `@tamagui/sheet@3.0.3` le déclarent en peer `*` ; `tamagui@2.7.7` ne déclarait que `react` (registre npm) | déjà peer `*` de `@alveole/components` (`packages/components/package.json` l. 115) et dépendance d'`apps/docs` (5.7.0)    |
| **`SafeAreaProvider` doit envelopper `TamaguiProvider`**                                                 | guide l. 1608-1613 : sinon `NO_INSETS_ERROR` au démarrage                                                                    | à vérifier dans `apps/docs` et à documenter pour les apps consommatrices (`packages/storybook/src/pages/installation.ts`) |
| `react-native-web`                                                                                       | peer `*` de `@tamagui/sheet@3.0.3`                                                                                           | 0.21.4                                                                                                                    |
| Une seule copie de `@tamagui/core`, `@tamagui/web`, `tamagui` ; tous les `@tamagui/*` bumpés ensemble    | guide l. 120-131                                                                                                             | voir `@tamagui/babel-plugin` ci-dessous                                                                                   |
| Expo : aucune version minimale publiée dans le guide ni dans les peers                                   | guide ; registre npm                                                                                                         | sans objet                                                                                                                |

## Changements cassants

| Changement                                                                                                                                                                                                                                                                  | Source                                                                                                   | Concerné ?                           | Fichiers                                                                                                                                                                                                                                                                                                                                                                                           |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Objets de condition V2 (`hoverStyle`, `pressStyle`, `focusStyle`, `focusVisibleStyle`, `disabledStyle`, `enterStyle`, `exitStyle`) supprimés, sans compatibilité ; remplacés par des clauses `hover:`, `press:`, `focus:`, `focus-visible:`, `disabled:`, `enter:`, `exit:` | guide l. 42-82 ; flat-values l. 174 (liste des modificateurs) et l. 381 (grep de contrôle)               | **Oui, massivement**                 | `packages/components/src/core/Box/Box.tsx` l. 13 et 60, `core/Typography/Typography.tsx` l. 34, `ui/Button/ButtonContent.tsx`, `ui/ListItem/ListItem.tsx`, `ui/Sidebar/SidebarItem.tsx`, `ui/Accordion/AccordionItem.tsx`, `ui/RadioGroup/RadioGroupCard.tsx`, `ui/Toast/Toast.tsx`, `packages/storybook/src/components/UIKitTopBar.tsx`, `__tests__/helpers/renderWeb.tsx` (27 fichiers au total) |
| `focusVisibleStyle` : cas particulier du point précédent. Le type `focusVisible` ne subsiste qu'en état interne (`forceStyle`, `PseudoGroupState`)                                                                                                                          | `types.tsx` l. 375 et 769 au tag v3.0.3 ; aucune autre occurrence de `focusVisibleStyle` dans le fichier | **Oui, critique (ADR 0017)**         | `ui/Checkbox/CheckboxContainer.tsx` l. 49, `ui/RadioGroup/RadioInput.tsx` l. 45, `ui/Switch/Switch.tsx` l. 72, styles associés (`*.styles.ts`), tests `Checkbox.test.web.tsx`, `Switch.test.web.tsx`, `packages/theme/src/constants/Focus.web.test.ts` l. 48                                                                                                                                       |
| Tokens à sigil `$xxx` supprimés ; `$true` retiré des configs par défaut                                                                                                                                                                                                     | guide l. 44-48, §4 l. 817-846                                                                            | Oui                                  | `ui/Switch/Switch.tsx` l. 62 (`getTokens().size.$true`) ; tous les tokens `$` passés aux props Tamagui (à recenser avec le grep de flat-values l. 385-387)                                                                                                                                                                                                                                         |
| `@tamagui/config/v3` et `/v4` supprimés ; v5 et v5-subtle conservés en packs figés ; v6 par défaut                                                                                                                                                                          | guide l. 193-249, tableau l. 219-232 ; l. 304-321 recommande de rester en v5                             | **Oui**                              | `apps/docs/tamagui.config.ts`, `packages/components/__tests__/helpers/TamaguiTestProvider.tsx`, `packages/storybook/__tests__/helpers/renderScreen.tsx`, doc `packages/storybook/src/pages/installation.ts`                                                                                                                                                                                        |
| Aucune config n'embarque de driver d'animation ; Sheet avec le driver CSS exige `createAnimations` de `@tamagui/animations-css/extras`, sinon Sheet lève une exception                                                                                                      | guide l. 234-236 et 251-262                                                                              | Oui                                  | `@tamagui/animations-css` est déclaré (`apps/docs/package.json` l. 32, peer de components) mais jamais importé : les animations venaient de `config/v3`. Concerne `ui/BottomSheet/BottomSheet.tsx` et la config d'`apps/docs`                                                                                                                                                                      |
| `@tamagui/babel-plugin` supprimé, remplacé par `@tamagui/cli/metro` ou `/vite`                                                                                                                                                                                              | guide l. 159 et 264-276 ; registre : `latest` = 2.7.7, aucune 3.x                                        | **Oui**                              | `apps/docs/babel.config.js`, `apps/docs/package.json` ; doc `packages/storybook/src/pages/installation.ts`, `migrationV2.ts`. Renovate a laissé `@tamagui/babel-plugin@2.7.7` dans le lock : deux majeures cohabitent                                                                                                                                                                              |
| Toast impératif supprimé : `ToastProvider` + `ToastViewport` → `<Toast><Toast.Viewport><Toast.List/></Toast.Viewport></Toast>` ; `useToastController().show` → `toast()` ; `useToastState` → `useToasts()`                                                                  | guide §18 l. 1410-1462                                                                                   | **Oui**                              | `ui/Toast/Toast.tsx` l. 1, `ui/Toast/Toasts.tsx` l. 1, `ui/Toast/ToastBridge.tsx` l. 1 (augmentation `declare module '@tamagui/toast'`)                                                                                                                                                                                                                                                            |
| `Sheet.Frame` → `Sheet.Container` (layout) + `Sheet.Background` (surface) ; plus de clipping implicite ; plus de fondu intégré ; `Sheet.Handle` sans opacité par défaut ; `onAnimationComplete` → `onTransition`                                                            | guide §2 l. 501-542, §14 l. 1269-1324                                                                    | **Oui**                              | `ui/BottomSheet/BottomSheet.tsx` l. 58-93, `__tests__/helpers/tamaguiSheetMock.tsx`                                                                                                                                                                                                                                                                                                                |
| Racines `Avatar`, `Tabs`, `Group` sans habillage visuel par défaut (compile, mais rend différemment)                                                                                                                                                                        | guide l. 150-176                                                                                         | Probable, visuel seulement           | `ui/Avatar/Avatar.tsx`, `ui/Tabs/Tabs.tsx`, `ui/Tabs/TabsTab.tsx` : à vérifier sur les clichés                                                                                                                                                                                                                                                                                                     |
| Fond actif : `backgroundActive` → `background-press` (Checkbox, Switch, Tabs, ToggleGroup)                                                                                                                                                                                  | guide §15 l. 1326-1352                                                                                   | Visuel à vérifier                    | Switch, Checkbox, Tabs ; aucune occurrence de `backgroundActive` dans le dépôt                                                                                                                                                                                                                                                                                                                     |
| Tailles de contrôles nommées (`xs`..`xl`) ; `undefined` explicite ne retire plus un défaut                                                                                                                                                                                  | guide §5 l. 848-924                                                                                      | À vérifier                           | Switch, RadioGroup, Slider, Avatar, Tabs si `size` est passé aux composants Tamagui                                                                                                                                                                                                                                                                                                                |
| `lineHeight` numérique devient un ratio (web et natif)                                                                                                                                                                                                                      | guide §7 l. 954-1002                                                                                     | Probable                             | `core/Typography/Typography.tsx` (`lineHeight` passé à Tamagui), styles `lineHeight: 20` de `Toast.tsx` et autres : un `20` devient « 20 fois la taille »                                                                                                                                                                                                                                          |
| Grammaire `transition` unique ; `animateOnly`, forme tableau, `onDidAnimate` supprimés                                                                                                                                                                                      | guide §13 l. 1202-1267, §14                                                                              | À vérifier                           | `core/animation/animer.ts`, `core/AnchorHeading/AnchorHeading.web.tsx` (5 sites `transition`)                                                                                                                                                                                                                                                                                                      |
| FocusScope : wrapper `display: contents`, enfants-fonction supprimés                                                                                                                                                                                                        | guide §8 l. 1004-1034                                                                                    | À vérifier                           | `ui/Popover/Popover.tsx`                                                                                                                                                                                                                                                                                                                                                                           |
| Dialog / Popover / Select : modèle Adapt commun ; `Dialog.Content size` supprimé ; RemoveScroll désactivé en non modal                                                                                                                                                      | guide §9 l. 1036-1075                                                                                    | Faible (aucun `Adapt` dans le dépôt) | `ui/Popover/Popover.tsx`, composants Dialog                                                                                                                                                                                                                                                                                                                                                        |
| `createTamagui({ defaultProps })`, `webContainerType` supprimés                                                                                                                                                                                                             | guide §17 l. 1380-1408, l. 106-107                                                                       | Non                                  | aucune occurrence                                                                                                                                                                                                                                                                                                                                                                                  |
| `focusable`, `fullscreen`, `themeInverse`, `selectable` sur `Text`, `delayMs` d'Avatar, `styleable`, `useProps`, `animations-react-native` sur web                                                                                                                          | guide §3 l. 544-600, l. 251-256                                                                          | Non                                  | les occurrences `selectable` (DataTable) et `delayMs` (`useDelaiDAffichage.ts`) sont des noms propres au dépôt                                                                                                                                                                                                                                                                                     |

### Le cas `focusVisibleStyle` (ADR 0017)

L'ADR 0017 et `Focus.web.test.ts` l. 48 reposent sur un constat v2 : Tamagui impose sa bague
de focus en `!important`, et seule la prop `focusVisibleStyle` peut la remplacer. En v3 cette
prop n'existe plus ; son équivalent est la clause `focus-visible:` sur chaque propriété
(flat-values l. 174). Deux inconnues, que les sources lues ne tranchent pas :

- la bague par défaut de Tamagui existe-t-elle toujours en v3, et toujours en `!important` ?
- une clause `outlineColor="... focus-visible:..."` produit-elle une règle capable de la battre ?

Ces deux points se tranchent en navigateur (jsdom ne résout pas `:focus-visible`), pas par
lecture.

## Plage peer `^2.7.7 || ^3.0.0`

Une lib peut déclarer deux majeures quand son code n'utilise que l'intersection des deux API.
Ce n'est pas le cas ici :

- **Types** : `BoxProps` et `TypographyProps` dérivent de `TamaguiViewProps` / `TamaguiTextProps`
  (`Pick<..., 'exitStyle' | ...>`). Contre la v3 ces clés n'existent plus ; contre la v2 les
  remplacer par des clauses plates ne compile pas. Les `.d.ts` publiés d'Alveole embarquent l'une
  ou l'autre forme.
- **Runtime** : la v3 ignore et transmet les objets de condition (« v3 forwards an unrecognized
  `hoverStyle` prop rather than applying it », guide l. 1561-1563) ; la v2 ne comprend pas les
  clauses `hover:`. Aucun composant stylé ne peut viser les deux.
- **Toast** : `useToastController` n'existe qu'en v2, `toast()` n'existe qu'en v3.
- **Config** : `@tamagui/config/v3` n'existe qu'en v2.

Conclusion : la plage doit devenir `^3.0.0` seul, ce qui fait de la migration un breaking change
d'Alveole (bump majeur, décision de Stéphane) pour les trois apps consommatrices. La plage
double de Renovate annoncerait une compatibilité v2 que le paquet publié ne tiendra pas.

## Lien erreurs CI et changements cassants

Run `39131207129`, PR #647, trois jobs en échec.

| Job                                                  | Erreur                                                                                                                                                                                                                        | Cause                                                                                                   |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Source checks (typecheck) et Web (build des paquets) | 1 497 × TS2739 « missing the following properties from type `Pick<ViewProps, "exitStyle" \| "focusStyle" \| "pressStyle" \| "disabledStyle">` » sur presque chaque `<Box>` / `<Typography>`                                   | objets de condition supprimés ; racine unique : `Box.tsx` l. 13 et son équivalent dans `Typography.tsx` |
| idem                                                 | TS2339 « Property `hoverStyle` does not exist » (`Box.tsx` l. 60, `Typography.tsx` l. 34, `ButtonContent.tsx` l. 45) ; TS2322 sur `CheckboxContainer.tsx` l. 49, `RadioInput`, `Toast.tsx` l. 57 (`enterStyle` / `exitStyle`) | objets de condition, dont `focusVisibleStyle`                                                           |
| idem                                                 | TS2305 / TS2724 : `ToastProvider`, `ToastViewport`, `useToastController`, `useToastState` absents (« Did you mean `useToasts`? »)                                                                                             | Toast impératif supprimé (§18)                                                                          |
| idem                                                 | TS2307 `@tamagui/config/v3` introuvable                                                                                                                                                                                       | config v3 supprimée                                                                                     |
| idem                                                 | TS2345 sur `ListItem.tsx` l. 33 (`GestureResponderEvent`), `ProgressBarLoop.tsx` l. 60 (`LayoutChangeEvent` vs `OnLayout`)                                                                                                    | types d'événements resserrés ; non documenté dans le guide, à creuser                                   |
| Test Unit workspaces                                 | 196 (components) + 23 (storybook) × « Cannot find module `@tamagui/config/v3` » ; `packages/theme` passe (83/83)                                                                                                              | config v3 supprimée : les suites ne démarrent pas, aucun test métier n'a tourné                         |
| Web, audit et clichés                                | échec à « Build workspace packages » (mêmes erreurs TS)                                                                                                                                                                       | les clichés et l'audit d'accessibilité n'ont pas tourné : aucune information visuelle à ce stade        |

Les erreurs actuelles ne disent donc rien des régressions visuelles (Avatar, Tabs, `lineHeight`,
fond actif, Sheet) : elles n'apparaîtront qu'une fois le typecheck vert.

## Questions ouvertes

- **Bague de focus** : voir le cas `focusVisibleStyle` ci-dessus ; à mesurer en navigateur avant
  de réécrire l'ADR 0017.
- **Codemod** : `npx @tamagui/codemod-flat-values --source-semantics v2-pixels` (guide l. 52-63)
  peut convertir une partie des sites. Sur le corpus Bento, 20,4 % des sites restaient à revoir à
  la main (l. 109-115). Le passer en mode rapport sur `packages/components/src` chiffrerait le
  chantier sans rien modifier.
- **Config cible** : v5 figée (recommandée par le guide l. 304-321) ou v6. Alveole utilise ses
  propres couleurs via `@alveole/theme` ; reste à mesurer ce que la config Tamagui fournit encore
  (thème `light`, tokens `size`).
- **Compilation d'`apps/docs`** : remplacer `@tamagui/babel-plugin` par `@tamagui/cli/metro`, ou
  supprimer l'optimisation en production. Non évalué.
- **Types d'événements** (`GestureResponderEvent`, `LayoutChangeEvent`) : changement absent du
  guide, origine à trouver dans le diff `v2.7.7..v3.0.3` de `code/core/web/src/types.tsx`.
- **Calendrier** : la v3.0.0 est très récente ; attendre des correctifs 3.x avant de migrer est
  une option à arbitrer.
