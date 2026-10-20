# Migration : Tamagui 2 → Tamagui 3

Version majeure des paquets `@alveole/*`. Alveole passe de Tamagui 2.7.7 à Tamagui 3.0.18
(ALV-128 à ALV-130) et rend son catalogue comme en v2 (ALV-131). Les applications montent Tamagui
en même temps : leurs propres usages de Tamagui subissent les mêmes changements qu'Alveole.

La v3 n'est pas une montée de dépendance mais une nouvelle syntaxe de style. Ce guide couvre ce
qu'Alveole impose et ce que le relevé (section 6) a trouvé dans cae, groove et dashboard. Pour le reste,
le guide officiel fait foi : [How to upgrade](https://tamagui.dev/docs/guides/how-to-upgrade) et
[Flat values](https://tamagui.dev/docs/guides/flat-values). Les sources et la liste complète des
changements cassants sont dans la [note de recherche](../research/tamagui-v3-migration.md).

**Une application encore en Tamagui 1 (cae) fait d'abord le [guide Tamagui v2](tamagui-v2.md)**,
puis celui-ci. Les deux sauts se font dans la même branche, mais dans cet ordre : `animation=`
→ `transition=` et `onHoverIn` → `onMouseEnter` sont des changements de la v2 que la v3 garde.

## 1. Versions

Les paquets `@alveole/*` restent à une **version unique** ([ADR 0029](../adr/0029-paquets-publies-et-installes-a-version-unique.md)),
clé `allowScripts` comprise (voir le guide v2).

Les peer dependencies Tamagui d'Alveole passent à `^3.0.0` **seul** : aucune version d'Alveole ne
fonctionne avec deux majeures de Tamagui. Monter **tous** les `tamagui` et `@tamagui/*` de
l'application au même numéro exact. La v3 exige React 19 et React Native 0.81+, que les trois
applications ont déjà.

```bash
git grep -nE '"(tamagui|@tamagui/[a-z-]+)"' -- package.json
```

**`@tamagui/babel-plugin` n'existe pas en 3.x** : le retirer de `package.json` et de
`babel.config.js`. Le remplaçant est `@tamagui/cli/metro` (ou `/vite`), à évaluer à part ;
Alveole a retiré le plugin de son catalogue sans le remplacer.

`react-native-safe-area-context` devient un peer de `tamagui` et de `@tamagui/sheet`.

## 2. Config et providers

**`@tamagui/config/v3` et `/v4` sont supprimés.** Alveole utilise la config v5 figée, que le
guide officiel recommande, avec le driver d'animation CSS : aucune config v3 n'embarque plus de
driver, et le `Sheet` lève une exception sans lui.

```ts
import { defaultConfig } from '@tamagui/config/v5';
import { animations } from '@tamagui/config/v5-css';
import { createTamagui } from 'tamagui';

export const tamaguiConfig = createTamagui({
  ...defaultConfig,
  animations,
  settings: {
    mediaQueryDefaultActive: defaultConfig.settings.mediaQueryDefaultActive,
    defaultFont: 'body',
    fastSchemeChange: true,
    shouldAddPrefersColorThemes: true,
  },
});
```

La config v5 garde les raccourcis de la v4 (`minW`, `maxW`, `minH`, `maxH`). Une application qui
venait de la config v3 (`miw`, `maw`) voit se réveiller des props jusque-là ignorées.

**`SafeAreaProvider` doit envelopper `TamaguiProvider`**, sinon `NO_INSETS_ERROR` au démarrage.
Dans les tests aussi : un `TamaguiProvider` de test sans `SafeAreaProvider` au-dessus échoue
pareil.

```tsx
<SafeAreaProvider>
  <TamaguiProvider defaultTheme="light" config={tamaguiConfig}>
    {children}
  </TamaguiProvider>
</SafeAreaProvider>
```

## 3. Ce qui casse au typecheck

### Pseudo-états en clauses

`hoverStyle`, `pressStyle`, `focusStyle`, `focusVisibleStyle`, `enterStyle`, `exitStyle` et
`disabledStyle` disparaissent, sans compatibilité, au profit de clauses (`hover:`, `press:`,
`focus:`, `focus-visible:`, `enter:`, `exit:`, `disabled:`). Alveole les retire aussi de `Box` et
`Typography` et expose les clauses telles quelles ([ADR 0031](../adr/0031-pseudo-etats-en-clauses-tamagui.md)) :
la doc officielle s'applique à `Box` sans traduction.

```bash
git grep -nwE "hoverStyle|pressStyle|focusStyle|focusVisibleStyle|enterStyle|exitStyle|disabledStyle"
```

**Une clause ne vit que sur la prop qui porte aussi la valeur de repos.** Si `style` pose la
propriété, Tamagui abandonne la clause en silence. Sortir la propriété survolée de `style` et la
passer en `{ default, hover }` sur sa prop :

```tsx
// Avant
<Box style={styles.row} hoverStyle={styles.rowHover} />;

// Après : backgroundColor quitte styles.row
const { backgroundColor, ...forme } = styles.row;
<Box style={forme} backgroundColor={{ default: backgroundColor, hover: styles.rowHover.backgroundColor }} />;
```

Un `hoverStyle` qui répète le style de repos (survol neutralisé) se supprime simplement.

Le codemod officiel `npx @tamagui/codemod-flat-values --source-semantics v2-pixels` convertit une
partie des sites ; il en laisse environ un sur cinq à reprendre à la main.

### Autres ruptures

| Avant (Tamagui 2)                            | Après (Tamagui 3)                                                                                            |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `unstyled` sur `Label`, `Slider.Track`…      | importer le composant depuis `tamagui/unstyled` (Alveole le fait pour `Label`)                               |
| `Sheet.Frame`                                | `Sheet.Container` (mise en page) + `Sheet.Background` (surface) ; plus de fondu ni de clipping implicites    |
| `onAnimationComplete` (Sheet)                | `onTransition`                                                                                               |
| `ToastProvider`, `useToastController().show` | `<Toast><Toast.Viewport><Toast.List/></Toast.Viewport></Toast>`, `toast()` ; passer par `useToast` d'Alveole |
| tokens `$xxx`, `$true`                       | valeurs plates (voir Flat values)                                                                            |

## 4. Ce qui change de rendu sans casser

Ces changements ne font échouer ni le typecheck ni les tests jsdom. Ils se voient à l'écran.

- **Un `undefined` explicite compte comme une valeur.** `<View p={undefined}>` remet le padding à
  zéro au lieu de laisser celui du style. Alveole a corrigé ce cas dans `Box` ; le code de
  l'application qui passe des props Tamagui conditionnelles (`prop={cond ? x : undefined}`) est
  concerné.
- **Un `style` en tableau imbriqué est posé tel quel sur le DOM** par un composant Tamagui : la
  page tombe. `Box` d'Alveole aplatit son `style` ; un composant Tamagui direct ne le fait pas.
- **`lineHeight` numérique devient un ratio** sur les composants Tamagui, y compris dans
  `style` sur natif : `lineHeight: 20` vaut 20 fois la taille. `Typography` d'Alveole convertit
  les hauteurs numériques de son `style` en longueurs explicites sur natif pour conserver les
  métriques du thème. Sa prop Tamagui `lineHeight={1.5}` reste un ratio.
- **Peau par défaut des composants Tamagui** : les racines `Avatar`, `Tabs`, `Group` perdent leur
  habillage, et les contrôles désactivés prennent `opacity: 0.45`. Alveole neutralise cette
  opacité sur ses propres contrôles (ALV-131) ; un `Switch` ou un `Tabs` Tamagui direct la garde.
- **Animations** : grammaire `transition` unique, `animateOnly` et la forme tableau supprimés.
- **`accessibilityLabel` n'est plus traduit en `aria-label`** sur `Box` ni sur un composant Tamagui
  direct : il arrive brut dans le DOM (`accessibilitylabel="…"`) et le libellé est perdu pour les
  lecteurs d'écran. Le typecheck l'accepte toujours, et seul un test qui cherche le libellé (`getByLabelText`) échoue. Passer
  par `aria-label`. Les composants Alveole qui le relaient (`ButtonIcon`, `Button`, `TextInput`) et
  les composants React Native ne sont pas concernés.

  ```bash
  git grep -nE -B6 'accessibilityLabel=' -- '*.tsx' | grep -E '<(Box|XStack|YStack|View)\b'
  ```

## 5. Ce qui change dans Alveole

| Composant                     | Changement                                                                        |
| ----------------------------- | --------------------------------------------------------------------------------- |
| `Box`, `Typography`           | plus de `hoverStyle` et voisins ; props de style Tamagui avec clauses (section 3) |
| `Toast` / `useToast`          | signature inchangée ; `Toasts` remplace le `ToastProvider` de Tamagui             |
| `BottomSheet`                 | même API, sur l'anatomie v3 du `Sheet`                                            |
| `Checkbox`, `Switch`, `Radio` | bague de focus portée par le thème ; rendu désactivé identique à la v2            |

**Ne change pas** : la prop `tag` de `Box` et `Typography` et les éléments DOM rendus
([ADR 0024](../adr/0024-tag-du-dom-nomme-d-apres-le-composant.md)). Un sélecteur CSS de l'application sur ces éléments reste valable.

## 6. Relevé par application

Relevé du 2026-10-19, après `git pull` de chaque dépôt.

### cae

- Alveole `1.10.0`, Tamagui `1.144.4` : faire d'abord le [guide v2](tamagui-v2.md), dont les
  `animation=` (`SalarieMissionAgendaPage` (9), `ui/base/Sheet/Sheet.tsx`,
  `AdminAbsenceDurationCard`, `AdminDonIndexPage`, `DocumentViewer`) et les `onHoverIn` /
  `onHoverOut` d'`AdresseController`.
- Config `@tamagui/config/v4` (`packages/tamagui/tamagui.config.ts`) → v5 + `v5-css`.
- `@tamagui/babel-plugin` dans `package.json` et `babel.config.js` : à retirer.
- `SafeAreaProvider` déjà au-dessus de `TamaguiProvider` dans `app/_layout.tsx` et dans les deux
  tests `AdresseController.alveole*.test.tsx`.
- `hoverStyle` dans 19 fichiers, à réécrire en clauses : `ui/base/Card` et
  `ui/base/ResourceCard` (qui le relaient en prop publique : changer leur API), `ui/base/Lien`
  (sur `Typography`), `ResourceTable` (Cell, Content, Header), `Sidebar/SidebarItem`,
  `AlveoleListItem`, `AudioRecorder`, `DataTableScopes`, et les cartes `AdminAvenantCard`,
  `AdminContratCard`, `AdminElementPaieCard`, `AdminSalarieCard` (+ `.styles.tsx`),
  `AdminClientShowPageDelegations`, `AdminEmplacementIndexPage`,
  `AdminMissionShowPageEmplacements`, `AdminMissionShowPageHabitations`.
- `Sheet.Frame` dans `ui/base/Sheet/Sheet.tsx` → `Sheet.Container` + `Sheet.Background`.
- `unstyled` sur `Label` (`AdminDelegationCardToggle`, `DroitAccesSwitch`), `Slider.Track`
  (`AudioViewer`) et `Accordion.Trigger` (`SalarieMissionAgendaPage`) : vérifier au typecheck,
  sinon passer par `tamagui/unstyled`.
- Imports directs à vérifier à l'écran : `Dialog` (`ui/base/Dialog`), `Slider`, `Accordion`.
- Raccourcis `minH` / `maxW` déjà actifs en v4 : pas de changement.

### groove

- Alveole `2.0.0-alpha.6`, Tamagui `1.144.4` (dont `@tamagui/tooltip`) : le guide v2 s'applique
  aussi (`animation=` dans `AccordionItem`, `PricerAccordionItem`, `PricerCard`,
  `PricerCardSection`, `DocumentViewer` ; `onHoverIn` / `onHoverOut` dans
  `ResourceTableContent`).
- `allowScripts` resté sur `@alveole/components@2.0.0-alpha.1` : à aligner.
- Config `@tamagui/config/v4` → v5 + `v5-css`. `@tamagui/babel-plugin` à retirer.
- **Pas de `SafeAreaProvider`** dans `app/_layout.tsx` : à ajouter autour de `TamaguiProvider`.
- `hoverStyle`, `pressStyle`, `focusStyle` dans 11 fichiers : `ui/base/Card`,
  `ui/base/ResourceCard`, `ui/base/Lien`, `ResourceTable` (Cell, Content, Header),
  `Sidebar/SidebarItem`, `DataTableScopes`, `Accordion/AccordionItem` (survol et focus qui
  répètent le repos : à supprimer, comme Alveole l'a fait), `PricerAccordionItem`
  (`pressStyle={{ cursor: 'grabbing' }}`), `Verdict/VerdictSlider` (pouce du `Slider`).
- `unstyled` sur `Accordion.Trigger` (`AccordionItem`, `PricerAccordionItem`) : vérifier au
  typecheck.
- Imports directs à vérifier à l'écran : `Dialog` (`ui/base/Dialog`), `Accordion`, `PricerAccordion`, `Slider` (`VerdictSlider`). `TooltipSimple` et `Square` restent exportés par `tamagui` 3.

### dashboard

- Alveole `2.0.0-alpha.6`, Tamagui `1.144.4` (dont `@tamagui/portal`), pas de babel-plugin. Le
  guide v2 s'applique (`onHoverIn` / `onHoverOut` dans 6 fichiers, voir son relevé).
- Config **`@tamagui/config/v3`** (`src/tamagui.config.ts`) → v5 + `v5-css`. Les raccourcis
  changent : **`maxW={240}` de `DomainsTable` était ignoré et s'appliquera**, à vérifier à
  l'écran.
- `SafeAreaProvider` présent dans `app/_layout.tsx`. Dans les tests, 31 fichiers montent
  `TamaguiProvider` ; seuls `AppShell`, `AppSidebar` et `DocScreen` ont un `SafeAreaProvider`, et
  **en dessous** : les remonter au-dessus, et en ajouter aux autres (un helper de rendu commun
  évite 31 copies).
- Aucun pseudo-état à réécrire, aucun import direct de composant Tamagui hors `TamaguiProvider` et `PortalProvider`.
- `accessibilityLabel` sur une `Box` dans `DatastoresTable` et `DomainsTable` : passés en
  `aria-label` (captive-dashboard#367). cae et groove n'en ont aucun.

## 7. Vérification

- Typecheck d'abord : il liste les pseudo-états, `Sheet.Frame`, l'API du Toast et la config.
- Puis capturer chaque écran avant et après, et comparer au pixel. Les pertes de survol (clause
  écrasée par `style`) ne se voient qu'en survolant : les vérifier à la main sur les tableaux, les
  cartes et la sidebar.
- Ne juger la typographie que sur des captures prises là où les polices sont installées (conteneur
  CI, [ADR 0011](../adr/0011-regression-visuelle-greffee-sur-l-audit.md)).
