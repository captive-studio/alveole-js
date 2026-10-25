# Recherche : les composants les plus réutilisés à l'intérieur d'un design system

Date : 2026-10-21. Question : quels composants sont le plus importés **par d'autres composants du
même design system** (fan-in interne, pas l'usage par les apps), pour prioriser dans Alveole ceux
dont la conception doit être irréprochable.

Sources primaires uniquement, code source lu localement (aucun `npm install`, aucun script des
dépôts exécuté) :

- Alveole : `packages/components/src/{ui,core}`, commit `e0549a0221cb` (`main`).
- Primer React : https://github.com/primer/react, clone `--depth 1`, commit
  `fb6001c8720c0424c1ed888ac482a6b8290730a0`, dossier `packages/react/src`.
- Base Web : https://github.com/uber/baseweb, clone `--depth 1`, commit
  `ed21081e33f7db2770922b4e04d16dcf5bbdfa85`, dossier `src`.
- Atlassian : https://bitbucket.org/atlassian/atlassian-frontend-mirror, clone `--depth 1`
  en sparse checkout sur `design-system`, commit `96a958beff9166cc8ed878557a6900db8caed6b4`,
  91 paquets `design-system/*/package.json`.

## Méthode

- **Alveole, Primer, Base Web** : graphe d'imports relatifs entre fichiers source. Un fichier
  appartient au composant du premier dossier sous la racine (`ui/X`, `core/X` pour Alveole ;
  `src/X` pour Primer et Base Web ; pour Primer, chaque fichier de
  `src/internal/components/` compte comme un composant). Sont exclus : tests, stories,
  `__tests__`, mocks, fixtures, `.d.ts`, `.figma.`, et les barils `index` qui ne font que
  réexporter. Fan-in direct = nombre de composants distincts qui importent le composant ;
  fan-in transitif = nombre de composants qui en dépendent par un chemin quelconque.
- **Atlassian** : un paquet = un composant ; arête = `dependencies` ou `peerDependencies`
  `@atlaskit/*` vers un autre paquet du dossier `design-system`.
- Script : voir l'annexe. Commandes :
  `python3 -I fanin.py packages/components/src ui,core`,
  `python3 -I fanin.py <primer>/packages/react/src internal/components,.`,
  `python3 -I fanin.py <baseweb>/src .`, `python3 -I atlas.py <atlas>/design-system`.

Les lignes marquées _infra_ (utils, hooks, styles, tokens, locale…) ne sont pas des composants
visuels ; elles sont listées pour mémoire et sorties des tops.

## Résultats par système

### Alveole (`e0549a0221cb`), 88 dossiers composants

| Composant                                                    | Fan-in direct | Transitif |
| ------------------------------------------------------------ | ------------: | --------: |
| core/Box                                                     |            46 |        51 |
| core/Typography                                              |            37 |        46 |
| ui/LucideIcon                                                |            20 |        38 |
| ui/Button                                                    |            12 |        25 |
| ui/FormControl                                               |            11 |        13 |
| ui/Leading (emplacement leading/trailing)                    |             9 |        30 |
| core/A (lien primitif)                                       |             5 |         9 |
| ui/Spinner                                                   |             4 |        28 |
| ui/Avatar                                                    |             3 |        15 |
| core/Grid                                                    |             3 |        11 |
| ui/Divider                                                   |             3 |         8 |
| core/Image, ui/InputButtonAdornment, core/Alert, ui/Checkbox |             2 |   13 à 15 |
| ui/Popover, ui/BottomSheet, ui/Tag, ui/Sidebar               |             2 |     2 à 3 |

_Infra_ : `core/styleTamagui` 10 (transitif 58), `core/styleNatif` 5 (39), `core/animation` 3,
`ui/pointeur` 2 (27).

### Primer React (`fb6001c8`)

| Composant                                                                                           | Fan-in direct |
| --------------------------------------------------------------------------------------------------- | ------------: |
| Button                                                                                              |            17 |
| Text                                                                                                |            11 |
| ActionList                                                                                          |            10 |
| TooltipV2                                                                                           |             8 |
| Spinner                                                                                             |             8 |
| TextInput                                                                                           |             7 |
| VisuallyHidden                                                                                      |             6 |
| Octicon (icône)                                                                                     |             6 |
| Overlay                                                                                             |             6 |
| Checkbox                                                                                            |             6 |
| Link                                                                                                |             5 |
| Heading                                                                                             |             5 |
| Skeleton, CounterLabel, FormControl, Dialog, AnchoredOverlay, ActionMenu, internal/TextInputWrapper |             4 |

_Infra_ : `utils` 57, `hooks` 47, `internal` (utilitaires hors composants) 16, `FeatureFlags` 14,
`live-region` 7. Primer n'a plus de `Box` interne : la mise en forme est passée aux CSS
Modules, d'où l'absence de primitive de boîte dans ce top. Les barils `experimental`,
`deprecated`, `next` comptent comme importeurs (+1 au plus par ligne). Le transitif sature à
77-79 pour presque tout (cycles via `utils`/`hooks`) : non exploitable, non reporté.

### Base Web (`ed21081e`)

| Composant                               | Fan-in direct |
| --------------------------------------- | ------------: |
| icon                                    |            29 |
| button                                  |            18 |
| input                                   |            12 |
| popover                                 |            10 |
| layer (portail, empilement)             |             8 |
| select                                  |             7 |
| menu                                    |             6 |
| block (boîte), progress-bar, typography |             4 |
| tag, spinner, datepicker                |             3 |
| checkbox, button-dock                   |             2 |

_Infra_ : `styles` 80, `helpers` 76, `utils` 32, `locale` 16, `themes` 5, `tokens` 3. Le
style passe par `styles` (Styletron) plutôt que par `block`, ce qui explique le faible score de
la boîte. Transitif saturé à 87 via `helpers`/`styles` : non reporté.

### Atlassian (`96a958be`, 91 paquets)

| Paquet                                                      | Fan-in direct | Transitif |
| ----------------------------------------------------------- | ------------: | --------: |
| @atlaskit/primitives (Box, Text, Pressable, Inline, Stack…) |            41 |        45 |
| @atlaskit/icon                                              |            34 |        41 |
| @atlaskit/button                                            |            19 |        20 |
| @atlaskit/motion                                            |            17 |        36 |
| @atlaskit/visually-hidden                                   |            14 |        47 |
| @atlaskit/top-layer                                         |            13 |        33 |
| @atlaskit/layering                                          |            12 |        34 |
| @atlaskit/spinner                                           |            10 |        28 |
| @atlaskit/popper                                            |             8 |        32 |
| @atlaskit/tooltip                                           |             8 |        23 |
| @atlaskit/heading                                           |             7 |         9 |
| @atlaskit/popup                                             |             7 |        15 |
| @atlaskit/portal                                            |             6 |        31 |
| @atlaskit/app-provider                                      |             5 |        50 |
| @atlaskit/link                                              |             4 |         9 |

_Infra_ : `tokens` 75, `css` 44, `ds-lib` 42, `theme` 14. `@atlaskit/focus-ring` : 1 seul
dépendant déclaré (la bague passe surtout par `primitives`/`Pressable` et les tokens).

## Croisement

| Rôle                              |                                         Primer |            Base Web |                                              Atlassian | Alveole (fan-in direct)                                                                               | Écart                                                                                                                                           |
| --------------------------------- | ---------------------------------------------: | ------------------: | -----------------------------------------------------: | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Boîte / primitive de mise en page |                                  (CSS Modules) |             block 4 |                                          primitives 41 | core/Box 46                                                                                           | Aligné, socle n°1                                                                                                                               |
| Texte                             |                             Text 11, Heading 5 |        typography 4 |                                 primitives + heading 7 | core/Typography 37                                                                                    | Aligné                                                                                                                                          |
| Icône                             |                                      Octicon 6 |             icon 29 |                                                icon 34 | ui/LucideIcon 20                                                                                      | Aligné, mais l'icône vit dans `ui` et non `core`                                                                                                |
| Bouton                            |                                      Button 17 |           button 18 |                                              button 19 | ui/Button 12                                                                                          | Aligné, top 4 partout                                                                                                                           |
| Spinner                           |                                              8 |                   3 |                                                     10 | ui/Spinner 4 (transitif 28)                                                                           | Aligné                                                                                                                                          |
| Calque / portail / positionnement |                   Overlay 6, AnchoredOverlay 4 | layer 8, popover 10 | top-layer 13, layering 12, popper 8, portal 6, popup 7 | ui/Popover 2, ui/BottomSheet 2                                                                        | **Écart** : pas de couche partagée ; `Select` monte `Sheet` de Tamagui directement (`ui/Select/SelectOptionsList.tsx`) en plus de `BottomSheet` |
| Infobulle                         |                                    TooltipV2 8 |       (via popover) |                                              tooltip 8 | absent                                                                                                | **Absent**                                                                                                                                      |
| Texte pour lecteur d'écran        |                               VisuallyHidden 6 |              (a11y) |                                     visually-hidden 14 | absent (aucun fichier `ui`/`core` ne le fournit)                                                      | **Absent**                                                                                                                                      |
| Champ de saisie                   | TextInput 7, TextInputWrapper 4, FormControl 4 |            input 12 |                                      (textfield, form) | ui/FormControl 11, InputButtonAdornment 2                                                             | Aligné                                                                                                                                          |
| Liste d'actions / menu            |                    ActionList 10, ActionMenu 4 |              menu 6 |                                                 menu 3 | ui/ActionMenu (0), ui/ListItem 1                                                                      | **Écart** : pas de liste d'options commune ; `Select`, `ActionMenu`, `Sidebar` portent chacun leurs lignes                                      |
| Lien                              |                                         Link 5 |              (link) |                                                 link 4 | core/A 5                                                                                              | Aligné                                                                                                                                          |
| Mouvement                         |                                              - |                   - |                                              motion 17 | core/animation 3                                                                                      | Aligné en esprit                                                                                                                                |
| Bague de focus                    |                                          (CSS) |            (styles) |                              primitives / focus-ring 1 | aucune unité partagée : traitée composant par composant (Button, Checkbox, Switch, Tabs, RadioGroup…) | **Écart** (cf. ADR 0017)                                                                                                                        |

## Priorisation recommandée pour Alveole

1. **core/Box** (46) et **core/Typography** (37) : socle que toutes les références placent en
   tête (primitives Atlassian 41). Tout défaut d'API s'y propage à plus de la moitié du
   catalogue ; leurs dépendances `core/styleTamagui` (transitif 58) et `core/styleNatif` (39) en
   font partie.
2. **ui/LucideIcon** (20, transitif 38) : n°1 ou 2 chez Base Web et Atlassian. Vérifier tailles,
   couleur héritée et accessibilité (icône décorative ou étiquetée).
3. **ui/Button** (12, transitif 25) avec **ui/Spinner** (4, transitif 28) : top 4 dans les trois
   références.
4. **ui/Leading** (9, transitif 30) et **ui/FormControl** (11) : spécifiques à Alveole mais déjà
   des points de passage obligés (emplacements, champs).
5. **Couche de superposition** (portail, empilement, positionnement) : 6 à 13 dépendants chez
   chaque référence, éclatée dans Alveole entre `Popover`, `BottomSheet` et un `Sheet` Tamagui
   direct dans `Select`. Candidat à une unité partagée avant que d'autres composants n'en
   ajoutent.
6. **VisuallyHidden** et **Tooltip** : absents, alors que chaque référence les réutilise 6 à 14
   fois. À créer quand un composant en aura besoin plutôt que de réimplémenter localement.
7. **Liste d'options** (ActionList / menu) : 6 à 10 dépendants chez Primer et Base Web ;
   à considérer pour unifier `Select`, `ActionMenu` et `Sidebar`.

## Limites

- Seuls les imports **relatifs** sont suivis ; un composant qui importerait son voisin par le
  nom du paquet publié ne compterait pas (non observé dans Alveole, dont les imports sont
  relatifs).
- La granularité « dossier = composant » regroupe des sous-composants (ex. `primitives`
  Atlassian = Box + Text + Pressable…, `ui/Button` = toute la famille) et sépare des
  utilitaires qui n'en sont pas (marqués _infra_).
- Atlassian est mesuré par déclarations `package.json`, pas par imports : une dépendance
  déclarée mais inutilisée compte, un import de `devDependencies` ne compte pas. Le miroir
  `design-system` ne contient pas tous les paquets `@atlaskit/*` (fan-in vers des paquets hors
  du dossier ignoré).
- Le fan-in transitif n'est exploitable que pour Alveole et Atlassian ; chez Primer et Base Web
  les cycles via `utils`/`helpers` le saturent.
- Le fan-in mesure la réutilisation interne, pas l'usage dans les apps ni la qualité.

## Annexe : scripts

`fanin.py` (imports relatifs) :

```python
import os, re, sys
root = os.path.realpath(sys.argv[1]); containers = sys.argv[2].split(',')
EXCL = re.compile(r'(\.test\.|\.spec\.|\.stories\.|\.story\.|__tests__|__mocks__|__snapshots__|/stories/|/docs/|\.figma\.|/e2e/|\.d\.ts$|/examples?/|/__stories__/|/test-utils?/|/fixtures?/)')
IMP = re.compile(r'''(?:from\s+|import\s*\(\s*|require\(\s*|^import\s+)['"]([^'"]+)['"]''', re.M)
def isfile(path):
    return os.path.isfile(path) or any(os.path.isfile(path + e) for e in ('.ts','.tsx','.js','.jsx'))
def comp(path):
    rel = os.path.relpath(path, root).split(os.sep)
    for c in containers:
        cs = [] if c == '.' else c.split('/')
        if rel[:len(cs)] != cs or len(rel) <= len(cs) or rel[len(cs)].startswith('..'): continue
        if len(rel) == len(cs) + 1 and isfile(path):
            if c == '.': continue
            return '/'.join(cs + [re.sub(r'(\.module)?\.(tsx?|jsx?|css)$', '', rel[-1])])
        if c == '.' and '/'.join(rel).startswith(tuple(x + '/' for x in containers if x != '.')): continue
        return '/'.join(rel[:len(cs)+1])
    return None
edges = {}
for dp, dn, fn in os.walk(root):
    dn[:] = [d for d in dn if d not in ('node_modules', 'generated')]
    for f in fn:
        if not re.search(r'\.(tsx?|jsx?)$', f): continue
        p = os.path.join(dp, f)
        if EXCL.search(p): continue
        src = comp(p)
        if not src or src.endswith("/index"): continue
        for m in IMP.findall(open(p, errors='ignore').read()):
            if not m.startswith('.'): continue
            t = comp(os.path.normpath(os.path.join(dp, m)))
            if t and t != src: edges.setdefault(t, set()).add(src)
def trans(t):
    seen, st = set(), [t]
    while st:
        for s in edges.get(st.pop(), ()):
            if s not in seen: seen.add(s); st.append(s)
    seen.discard(t); return seen
for d, tr, k in sorted(((len(v), len(trans(k)), k) for k, v in edges.items()), reverse=True)[:30]:
    print(f"{d:4d} {tr:4d}  {k}")
```

`atlas.py` (dépendances `package.json`) :

```python
import json, os, sys, glob
root = sys.argv[1]; pk = {}
for f in glob.glob(os.path.join(root, '*/package.json')):
    j = json.load(open(f)); pk[j['name']] = set(list(j.get('dependencies', {})) + list(j.get('peerDependencies', {})))
fan = {}
for n, deps in pk.items():
    for d in deps:
        if d in pk and d != n: fan.setdefault(d, set()).add(n)
def trans(t):
    seen, st = set(), [t]
    while st:
        for s in fan.get(st.pop(), ()):
            if s not in seen: seen.add(s); st.append(s)
    seen.discard(t); return seen
for k in sorted(fan, key=lambda k: -len(fan[k]))[:30]:
    print(f"{len(fan[k]):4d} {len(trans(k)):4d}  {k}")
```
