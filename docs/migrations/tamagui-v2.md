# Migration : Tamagui 1 → Tamagui 2

Version majeure des paquets `@alveole/*` (2.0). Alveole passe de Tamagui 1.144 à Tamagui 2.7.7
(ALV-117) et rend son catalogue comme en v1 (ALV-118). Les applications montent Tamagui en même
temps : leurs propres usages de Tamagui subissent les mêmes changements qu'Alveole.

## 1. Versions

Les paquets `@alveole/*` sortent à une **version unique** ([ADR 0029](../adr/0029-paquets-publies-et-installes-a-version-unique.md)) :
`@alveole/components`, `core`, `theme`, `storybook` et `eslint-config` au même numéro, en version
exacte, **y compris la clé `allowScripts`** qui autorise le `postinstall` de
`@alveole/components`. Une clé restée sur une ancienne version désactive en silence la copie des
fichiers PDF.

```json
"allowScripts": {
  "@alveole/components@2.0.0": true
}
```

Les peer dependencies Tamagui d'Alveole passent de `^1.129.0 <3.0.0` à `^2.7.7`. Monter **tous**
les paquets Tamagui de l'application au même numéro exact, `dependencies` et `devDependencies`
(`@tamagui/babel-plugin`, `@tamagui/cli`) compris :

```bash
git grep -nE '"(tamagui|@tamagui/[a-z-]+)"' -- package.json
```

## 2. Ce qui casse au typecheck

| Avant (Tamagui 1)                                        | Après (Tamagui 2)                        |
| -------------------------------------------------------- | ---------------------------------------- |
| `animation="quicker"` sur un composant Tamagui           | `transition="quicker"`                   |
| `onHoverIn` / `onHoverOut` (Tamagui, et `Box` d'Alveole) | `onMouseEnter` / `onMouseLeave`          |
| `disablePassBorderRadius`                                | supprimé : retirer                       |
| `href` sur un `Text` Tamagui                             | n'est plus typé : utiliser `Link` ou `A` |

`Pressable` de React Native garde `onHoverIn` / `onHoverOut` : seuls les composants Tamagui et la
`Box` d'Alveole, qui en hérite ses props, sont concernés.

```bash
git grep -nE "[^a-zA-Z]animation=|onHover(In|Out)|disablePassBorderRadius"
```

`dataSet` n'est plus traduit en attributs `data-*` par Tamagui v2. Sur un composant Tamagui, poser
l'attribut directement (`data-x="…"`) ; sur un `Pressable` React Native, `dataSet` marche encore.

## 3. Ce qui change de rendu sans casser

Ces changements ne font échouer ni le typecheck ni les tests jsdom. Ils se voient à l'écran.

**La police de l'app est remise sur chaque vue.** Tamagui v2 émet une règle
`.font_*, .is_View { font-family; line-height… }` :

- un style de texte posé sur une vue ne descend plus à ses enfants : le poser sur le texte
  lui-même ;
- un texte sans hauteur de ligne prend celle de la police par défaut de l'app (23 px avec
  `@tamagui/config` v3) au lieu de `normal`.

C'est la cause de la majorité des écarts du catalogue : à chercher en priorité. Les `Typography`
d'Alveole posent maintenant `lineHeight: normal` par défaut sur le web ; le code propre à
l'application n'en profite pas.

**Plus de `position: relative` par défaut sur les vues.** Un enfant en `position: absolute` se cale
sur un ancêtre lointain : barres, reflets et overlays s'étalent sur toute la page. Poser
`position: 'relative'` sur le conteneur, ou `settings.defaultPosition: 'relative'` dans le
`createTamagui` de l'application.

**`flex: 1` devient `flex: 1 1 0px` sur le web** (la base restait `auto` en v1). Dans un parent sans
hauteur fixée, la vue s'écrase sous son contenu. Utiliser `flexGrow: 1`, ou
`settings.styleCompat: 'legacy'`.

**Composants Tamagui modifiés.**

- `Image` / `Avatar.Image` rendent un vrai `<img>` : icône cassée si l'image ne charge pas, et `alt`
  exigé par axe.
- `Switch` ne compte plus le padding ni la bordure dans la taille de sa piste.

## 4. Ce qui change dans Alveole

Visible des applications, sans rien à réécrire :

| Composant        | Changement                                                                                                |
| ---------------- | --------------------------------------------------------------------------------------------------------- |
| `Typography`     | hauteur de ligne `normal` par défaut sur le web ; toute hauteur explicite la remplace                     |
| `Avatar`         | la photo reste transparente tant qu'elle n'a pas chargé ; `alt` = `fallbackText`, sinon vide (décorative) |
| `Switch`         | le pouce reste logé dans sa piste                                                                         |
| `ProgressBar`    | la barre indéterminée reste dans son rail                                                                 |
| `Skeleton`       | le reflet reste sur son squelette                                                                         |
| `Badge`          | le cran typographique est porté par le libellé                                                            |
| `DocumentViewer` | le panneau enfant reste au-dessus de la barre d'outils                                                    |
| `Breadcrumbs`    | la page courante reste alignée sur les liens                                                              |
| `UpdateRequired` | l'écran de mise à jour garde la hauteur de son contenu                                                    |

**Ne change pas** : la prop `tag` de `Box` et de `Typography` (Alveole la traduit en `render` pour
Tamagui), et donc les éléments DOM rendus (`<box>`, `<typography>`, `<data-table>`, les noms
passés à `tag`). Un sélecteur CSS de l'application sur ces éléments reste valable.

## 5. Relevé par application

Relevé du 2026-10-18, après `git pull` de chaque dépôt.

### cae

- Alveole `1.10.0` : faire d'abord la migration 1.x → 2.0 du guide du catalogue.
- Tamagui `1.144.4` (13 paquets + `@tamagui/babel-plugin`, `@tamagui/cli`), config
  `@tamagui/config/v4`.
- `allowScripts` : `@alveole/components@1.10.0`.
- Imports directs de `tamagui` dans 10 fichiers (2 de tests) : `TamaguiProvider`, `Label`,
  `Slider`, `Sheet`, `Dialog`, `Accordion`, `Square`, `@tamagui/portal`.
- `animation=` à renommer : `SalarieMissionAgendaPage` (9), `ui/base/Sheet/Sheet.tsx` (1).
- À regarder à l'écran : `Image` (logos clients), `Switch` d'Alveole.

### groove

- Alveole `2.0.0-alpha.6`.
- Tamagui `1.144.4` (dont `@tamagui/tooltip`), config `@tamagui/config/v4`.
- `allowScripts` : resté sur `@alveole/components@2.0.0-alpha.1`, à aligner.
- Imports directs de `tamagui` dans 14 fichiers : `TooltipSimple`, `Square`, `Accordion`,
  `Slider`, `TamaguiProvider`.
- `animation=` à renommer : `Accordion/AccordionItem`, `PricerAccordion/PricerAccordionItem`,
  `PricerCard`, `PricerCardSection` (8).
- `onHoverIn` / `onHoverOut` sur une `Box` : `ResourceTable/ResourceTableContent.tsx`.

### dashboard

- Alveole `2.0.0-alpha.6`, pas de clé `allowScripts`.
- Tamagui `1.144.4` (dont `@tamagui/portal`), config **`@tamagui/config/v3`** : la
  hauteur de ligne par défaut de 23 px s'y applique.
- Imports directs de `tamagui` dans 32 fichiers, dont 30 tests (`TamaguiProvider`).
- `onHoverIn` / `onHoverOut` sur des composants Tamagui ou `Box` dans 6 fichiers :
  `DatastoresTable`, `DateCell`, `DeploymentsTable`, `DomainsTable`, `AdminResourceMapScreen`,
  `AppOverview/WorkloadStatusIcon` (sauf sa ligne sur `Pressable`, qui ne change pas).
- Le correctif CSS `debordementDesInstances.web.ts` cible `workloads-section` et `data-table` : ces
  éléments sont toujours rendus, le correctif reste valable.

## 6. Vérification

- Capturer chaque écran en v1 et en v2, et comparer au pixel en repérant la première ligne qui
  diffère.
- Ne juger la typographie que sur des captures prises là où les polices sont installées (conteneur
  CI, [ADR 0011](../adr/0011-regression-visuelle-greffee-sur-l-audit.md)). En local, les écarts de
  police ou de graisse sont invisibles.
- Tester un réglage global (`styleCompat`, `defaultPosition`) sur tout l'écran avant de corriger
  cas par cas : il dit combien d'écarts il explique.
