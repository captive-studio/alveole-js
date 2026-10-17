# Recherche : migration Tamagui 1.144.4 vers 2.7.7

Date : 2026-10-17. Sources primaires uniquement : guide de migration officiel lu au tag `v2.7.7`,
code source au tag `v2.7.7`, registre npm, release GitHub `v2.0.0`.

- Guide : https://github.com/tamagui/tamagui/blob/v2.7.7/code/tamagui.dev/data/docs/guides/how-to-upgrade.mdx
  (publié sur tamagui.dev sous `/docs/guides/how-to-upgrade` ; l'URL `/docs/guides/version-two` répond 404)
- Annonce : https://github.com/tamagui/tamagui/blob/v2.7.7/code/tamagui.dev/data/blog/version-two.mdx
- Types core : https://github.com/tamagui/tamagui/blob/v2.7.7/code/core/web/src/types.tsx
- Release : https://github.com/tamagui/tamagui/releases/tag/v2.0.0

## Mesuré depuis

Après déblocage de l'installation, la CI de la PR #612 (run `39039692335`) a corrigé deux
points de cette note. Le plan qui en découle est la spec Jira ALV-110.

- **`tag` coûte bien plus que deux fichiers.** Environ 170 erreurs TypeScript dans
  `packages/components`, dont environ 75 % liées à `tag` : `Box` et `Typography` héritent leur
  prop `tag` des types de Tamagui, qui la retirent en v2, donc les quelque 130 `<Box tag>` et
  `<Typography tag>` du dépôt cassent tous. Le correctif reste localisé : que `Box` et
  `Typography` déclarent `tag` eux-mêmes (ALV-113).
- **La sémantique de `tag` est connue.** En 1.144.4, sur le web, la valeur de `tag` devient le
  type de l'élément rendu (`<sidebar-item>`, `<box>`, `<nav>`), voir
  `@tamagui/web/dist/cjs/createComponent.js` l. 215. Ce n'est ni un attribut ni une classe. Les
  tests web d'Alveole et une feuille de style du dashboard ciblent ces éléments : le DOM rendu
  doit rester identique (ADR 0024).
- S'y ajoutent, absents de cette note : 17 suites Jest web qui ne chargent plus Tamagui, publié
  en `.mjs` (ALV-111), et des types de refs web et de handlers refusés par la v2 (ALV-115).

## Résumé

Le dépôt est déjà au niveau des prérequis (React 19.2.3, React Native 0.86.3). L'essentiel du
travail tient en quatre points :

1. le pin de peer deps `^1.129.0 <2.0.0` de `@alveole/components` interdit la v2 : sa levée est
   un breaking change d'Alveole pour les apps consommatrices (bump majeur, à décider) ;
2. la prop `tag` disparaît au profit de `render`, et `Box` / `Typography` la transmettent à la
   `View` / `Text` Tamagui ;
3. `animation` devient `transition` (5 occurrences) ;
4. `activationMode` des Tabs passe par défaut à `manual` : sans effet, le dépôt le fixe déjà.

`@tamagui/config/v3` existe toujours en 2.7.7, donc les configs de test et d'`apps/docs` ne sont
pas obligées de changer. Effort global estimé : faible à moyen, dominé par la vérification
visuelle (défauts de layout) plutôt que par le code.

## Peer deps requises

| Exigence                                                                  | Source                                                                                                                                                                                            | État du dépôt                      |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| React 19+                                                                 | guide, section « Prerequisites » ; `peerDependencies: { react: ">=19" }` de `tamagui@2.7.7`, `@tamagui/core@2.7.7`, `@tamagui/toast@2.7.7` (https://registry.npmjs.org/tamagui/2.7.7)             | 19.2.3 : conforme                  |
| React Native 0.81+ avec New Architecture                                  | guide, « Prerequisites »                                                                                                                                                                          | 0.86.3 : conforme                  |
| TypeScript 5+                                                             | guide, « Prerequisites »                                                                                                                                                                          | à vérifier, non mesuré ici         |
| react-native-web                                                          | aucune contrainte dans les `peerDependencies` npm ; la release v2.0.0 indique « remove all react-native peer dependencies from tamagui » (https://github.com/tamagui/tamagui/releases/tag/v2.0.0) | 0.21.4 : pas de contrainte publiée |
| Une seule copie de `@tamagui/core`, `@tamagui/web`, `tamagui` en monorepo | guide, « Add resolutions »                                                                                                                                                                        | à ajouter via `overrides` npm      |

## Breaking changes qui touchent le dépôt

| Breaking change (source : guide sauf mention)                                                                                                                                                                                                                               | Fichiers impactés                                                                                                                                                                                                                                                                | Effort                                                             |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Pins à remonter en 2.x (« Update Dependencies »)                                                                                                                                                                                                                            | `packages/components/package.json` (deps 1.144.4 et 13 peer deps `^1.129.0 <2.0.0`), `packages/storybook/package.json`, `apps/docs/package.json` (dont `@tamagui/babel-plugin`), `packages/theme/package.json` (`@tamagui/core: *`)                                              | Faible en code, mais bump majeur d'Alveole pour les consommateurs  |
| `tag` remplacé par `render` (« Prop Renames ») ; `render?:` présent et aucune prop `tag` dans `types.tsx` au tag                                                                                                                                                            | `packages/components/src/core/Box/Box.tsx` (l. 54), `packages/components/src/core/Typography/Typography.tsx` (l. 31). Les dizaines d'appels `<Box tag="...">` passent par la prop Alveole et ne changent pas si `Box` garde son API                                              | Faible : 2 fichiers, mais voir incertitude sur la sémantique       |
| `animation` remplacé par `transition`, `AnimationProp` par `TransitionProp`                                                                                                                                                                                                 | `ui/Accordion/AccordionItem.tsx` (3), `ui/Switch/Switch.tsx` (1), `ui/BottomSheet/BottomSheet.tsx` (1)                                                                                                                                                                           | Faible                                                             |
| Animations retirées des configs v5 (`@tamagui/config/v5-css`, etc.) ; `./v3` et `./v4` restent exportés par `@tamagui/config@2.7.7` (https://registry.npmjs.org/@tamagui/config/2.7.7)                                                                                      | `apps/docs/tamagui.config.ts`, `packages/components/__tests__/helpers/renderWeb.tsx`, `renderNative.tsx`, `packages/storybook/__tests__/helpers/renderScreen.tsx` (tous en `config/v3`) ; doc d'installation `packages/storybook/src/pages/installation.ts` (montre `config/v4`) | Nul si on reste en v3 ; moyen si passage v5                        |
| Défauts v5 : `flexBasis` `auto` vers `0`, `position` `relative` vers `static` (« Flex and position defaults »)                                                                                                                                                              | Seulement en cas de passage à config v5 ; tout composant qui pose des enfants absolus                                                                                                                                                                                            | Moyen (vérification visuelle)                                      |
| Tabs : `activationMode` par défaut `manual`, `Tabs.Trigger` déprécié au profit de `Tabs.Tab`                                                                                                                                                                                | `ui/Tabs/Tabs.tsx` fixe déjà `activationMode="manual"`, `TabsTab.tsx` utilise déjà `Tabs.Tab`                                                                                                                                                                                    | Nul                                                                |
| Toast : la checklist demande « Update Toast from `ToastProvider` wrapper to `Toaster` sibling », mais `ToastProvider`, `ToastViewport`, `useToastController`, `useToastState` restent exportés (https://github.com/tamagui/tamagui/blob/v2.7.7/code/ui/toast/src/Toast.tsx) | `ui/Toast/Toast.tsx`, `Toasts.tsx`, `ToastBridge.tsx` (augmentation `declare module '@tamagui/toast'`)                                                                                                                                                                           | Faible : API conservée, migration vers `Toaster` optionnelle       |
| Imports natifs explicites pour les portails (`@tamagui/native/setup-teleport`), avant `expo-router/entry` (« Native Setup »)                                                                                                                                                | Sheet, Popover, Toast natifs : `ui/BottomSheet`, `ui/Popover`, `ui/Toast` ; entrée d'`apps/docs` ; doc d'installation                                                                                                                                                            | Faible, mais impacte la doc d'installation des apps consommatrices |
| Props d'accessibilité RN remplacées par ARIA (« Accessibility Props »)                                                                                                                                                                                                      | Seules les props passées à des composants Tamagui comptent. Les occurrences trouvées (`Toast.tsx` l. 30, `BottomSheet.tsx` l. 69) sont sur `Pressable` React Native, donc hors périmètre                                                                                         | Nul a priori                                                       |
| `createTamagui` : réglages racine déplacés dans `settings`                                                                                                                                                                                                                  | Aucun réglage racine utilisé : `createTamagui(config)` seul dans les 4 fichiers de config                                                                                                                                                                                        | Nul                                                                |
| `focusVisibleStyle`                                                                                                                                                                                                                                                         | Toujours typé dans `types.tsx` au tag (l. 1986, 2011) ; utilisé dans `RadioInput.tsx`, `CheckboxContainer.tsx`, `Switch.tsx`                                                                                                                                                     | Nul côté API                                                       |
| Snapshots : couleurs d'ombre en `color-mix()` (checklist)                                                                                                                                                                                                                   | Tests de rendu qui figent des ombres, à mesurer                                                                                                                                                                                                                                  | Faible                                                             |

Non concernés (aucune occurrence) : `Stack`, `themeInverse`, `space`, `onHoverIn/Out`, `Group`,
`Popover.Sheet`, `Spacer`, `useTheme(props)` Tamagui (les `useTheme` du dépôt viennent de
`@alveole/theme`), renommage des media queries (aucune media Tamagui utilisée).

## Points incertains

- **Sémantique de `tag` vs `render`.** Le guide présente `render` comme le remplaçant de `tag`
  pour choisir l'élément HTML (`render="nav"`). Les valeurs du dépôt (`"box"`, `"typography"`,
  `"sheet"`...) ne sont pas des éléments HTML : il faut vérifier au navigateur ce que `tag`
  produit aujourd'hui (nom de classe, attribut, élément) avant de choisir entre `render`, un
  `data-*` ou la suppression. Non vérifié dans le code source v1.
- **Toast.** La checklist du guide parle de migration vers `Toaster`, alors que le code au tag
  exporte toujours `ToastProvider`. Statut de dépréciation non documenté explicitement.
- **TypeScript 5+.** Version du dépôt non mesurée dans cette recherche.
- **Babel plugin / extraction statique** d'`apps/docs` : le guide dit « Not much has changed »
  sans détailler Babel ; à valider par un build réel.
- **Défauts de layout** même en restant en config v3 : le guide les rattache à config v5, l'annonce
  dit que « Default flex and position styles align with the latest React Native versions »
  (version-two.mdx l. 591) sans préciser si c'est conditionné à v5. À mesurer au navigateur.
- **Apps consommatrices** : le relèvement des peer deps les force à migrer elles aussi
  (`TamaguiProvider`, config, imports natifs). Non chiffré ici.
