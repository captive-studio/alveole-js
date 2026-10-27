# Migration : `Box` n'accepte que les tokens du thème

Version majeure de `@alveole/components` (ALV-150). Décision : [ADR 0033](../adr/0033-box-n-accepte-que-les-tokens-du-theme.md).

Les props d'espacement, de rayon et de couleur de `Box` n'acceptent plus que les clés du thème.
Pas de codemod ni d'alias : le typecheck signale chaque appel à corriger, c'est la liste de
travail de référence. Ce guide dit comment réécrire chaque erreur sans inventer de règle locale.

| Props                              | Accepté                                                        | Refusé                                       |
| ---------------------------------- | -------------------------------------------------------------- | -------------------------------------------- |
| `p`, `pl`, `pr`, `pt`, `pb`, `gap` | clés V/W de `Spacings` (`'1W'`, `'3V'`…)                       | nombres, anciennes clés numériques (`'050'`) |
| `m`, `ml`, `mr`, `mt`, `mb`        | clés V/W, `'auto'`, pourcentages (`'50%'`)                     | nombres, anciennes clés numériques           |
| `borderRadius`                     | `'sm'`, `'md'`, `'lg'`, `'full'`                               | nombres                                      |
| `backgroundColor`, `borderColor`   | couleur lue dans le thème, `'transparent'`, clause `{ hover }` | chaîne écrite en dur, `string` quelconque    |

Ne changent pas : `borderWidth`, `width`, `height`, `minW`… (nombres et pourcentages), et `style`,
qui reste ouvert.

## 1. Espacements : nombre ou ancienne clé → clé V/W

`V` vaut 4 px et `W` 8 px : `'3V'` = 12, `'2W'` = 16.

| Nombre brut | Ancienne clé | Clé actuelle |
| ----------- | ------------ | ------------ |
| `0`         | `'000'`      | `'0V'`       |
| `2`         | -            | `'0,5V'`     |
| `4`         | `'025'`      | `'1V'`       |
| `6`         | `'0375'`     | `'1,5V'`     |
| `8`         | `'050'`      | `'1W'`       |
| `12`        | `'075'`      | `'3V'`       |
| `16`        | `'100'`      | `'2W'`       |
| `24`        | `'150'`      | `'3W'`       |
| `32`        | `'200'`      | `'4W'`       |
| `40`        | -            | `'5W'`       |
| `48`        | `'300'`      | `'6W'`       |
| `64`        | `'400'`      | `'8W'`       |
| `96`        | `'600'`      | `'12W'`      |
| `120`       | -            | `'15W'`      |

```tsx
// Avant
<Box p={8} mt="100" gap="025">
// Après
<Box p="1W" mt="2W" gap="1V">
```

Les anciennes clés `'500'` (80), `'800'` (128), `'1200'` (193), `'1600'` (256) et au-delà n'ont pas d'équivalent : règle de la
section 2. Elles restent acceptées par `theme.spacing()` et `theme.spacingValue()` (dépréciées,
non cassant) : les migrer au passage, avec la même table.

## 2. Valeurs hors échelle

Un nombre absent de la table ci-dessus :

1. **C'est un espacement entre éléments** : prendre la clé la plus proche. À égale distance,
   la plus petite. Exemple : `20` → `'2W'` (16). Le décalage de 4 px est voulu : l'échelle prime
   sur la maquette, et un écart visible se règle dans la maquette, pas dans l'app.
2. **C'est une dimension imposée par autre chose qu'une maquette** (hauteur d'un en-tête fixe,
   marge de zone sûre, valeur calculée) : la passer par `style`, avec un commentaire qui nomme sa
   source. Exemple : `92` qui compense un en-tête de 92 px →
   `style={{ paddingTop: 92 }} // hauteur du Header`.

Rayons :

| Avant                         | Après                                                    |
| ----------------------------- | -------------------------------------------------------- |
| `4`                           | `'sm'`                                                   |
| `6`                           | `'md'`                                                   |
| `10`                          | `'lg'`                                                   |
| `8` (hors échelle)            | `'md'` : la plus proche, la plus petite à égale distance |
| `1000`, `9999` (pilule, rond) | `'full'`                                                 |

Ne pas déplacer un espacement ou un rayon brut vers `style` pour faire taire le typecheck : la
règle 2 ne vaut que pour une dimension qui ne vient pas du thème.

## 3. Couleurs : chaîne en dur → couleur du thème

Une couleur du thème se lit dans `useTheme().color` et porte le type `ThemeColor`. Une chaîne
écrite en dur (`'#dedede'`) ou une variable typée `string` est refusée.

Trouver la couleur équivalente, **par le rôle d'abord, la valeur ensuite** :

1. Nommer le rôle : fond (`color.light.background`), bordure (`color.light.border`).
2. Chercher la valeur dans les rampes de `@alveole/theme`, puis l'entrée de palette qui la
   référence :

   ```bash
   grep -niE "'#F6F7F8'" node_modules/@alveole/theme/dist/constants/Color.js   # → Neutre 975
   grep -nE "Neutre\['975'\]" node_modules/@alveole/theme/dist/constants/Palette.js
   ```

   `'#dedede'` ne renvoie rien : aucune rampe ne le contient, on passe à l'étape 3.

3. Sans correspondance exacte, prendre dans la famille du rôle la teinte la plus proche à l'œil,
   et la faire valider sur l'écran. Exemples relevés :

| Avant                       | Après                                | Valeur du thème |
| --------------------------- | ------------------------------------ | --------------- |
| `borderColor="#dedede"`     | `color.light.border['default-grey']` | `#DEE3EC`       |
| `backgroundColor="#F5F7FA"` | `color.light.background['alt-grey']` | `#F6F7F8`       |

Cas particuliers :

- **`alpha()`** garde la marque : `color.alpha(color.light.border['plain-grey'], 0.5)` passe.
- **`color._constants`** (les rampes brutes) est typé `string` : passer par l'entrée de palette.
- **Couleur à pseudo-état** : en clause objet, jamais en chaîne :
  `backgroundColor={{ default: repos, hover: survol }}`.
- **Couleur qui vient des données** (couleur d'un client saisie en base) : elle n'appartient pas
  au thème, elle passe par `style={{ backgroundColor: client.couleur }}`.
- **Palette fournie par l'application** : elle est en `PaletteSource` ; la marquer une fois par
  `enCouleursDuTheme(palette)` au lieu d'affirmer `as ThemeColor` à chaque appel.
- **Variable intermédiaire typée `string`** (`const statutColor: string = …`) : retirer
  l'annotation ou la typer `ThemeColor`, la valeur du thème garde sa marque.

## 4. Rechercher les appels à migrer

Le typecheck est la liste complète. Pour s'orienter avant de monter la version :

```bash
git grep -nP "<Box\b[^>]*\b((p[lrtb]?|m[lrtb]?|gap)=(\{\d|\"\d{3,4}\")|borderRadius=\{\d|(background|border)Color=\{?['\"]#)" -- '*.tsx'
```

La recherche ne voit que les attributs écrits sur la ligne de `<Box` : un appel sur plusieurs
lignes n'apparaît qu'au typecheck.

## 5. Casse par application

Relevé du 2026-10-27, après `git pull` (cae `1e59270e`, groove `5246a8c`, dashboard
`origin/main` `a15f36e`), par analyse syntaxique des attributs de `<Box>` dans les `.tsx` :

| Application | Espacements bruts | Anciennes clés | Rayons bruts | Couleurs en dur | Bruts en `style` (non cassant) |
| ----------- | ----------------- | -------------- | ------------ | --------------- | ------------------------------ |
| cae         | 66                | 176            | 1 (`8`)      | 2               | 26 (dont `20`)                 |
| groove      | 0                 | 0              | 0            | 0               | 10 (dont `92`)                 |
| dashboard   | 0                 | 0              | 0            | 0               | 10                             |

- **cae** (Alveole 1.10) porte toute la migration. Espacements bruts : `8`×33, `4`×19, `0`×5,
  `16`×4, `32`×3, `24`×1, `40`×1, tous dans l'échelle. Anciennes clés : `'050'`×57, `'100'`×50,
  `'025'`×47, `'075'`×8, `'200'`×5, `'400'`×5, `'150'`×3, `'000'`×1. Rayon `8` et
  `borderColor={'#dedede'}` dans `server-error.tsx` ; `'#F5F7FA'` en repli dans
  `ui/base/Card/Card.tsx` ; `client.couleur` dans `AdminClientCard.tsx` passe par `style`.
- **groove** a déjà retiré ses valeurs brutes de `Box` (le rayon `1000` compris). Restent les
  couleurs passées par variable (`statutColor`, `validationStepColor`…) : le typecheck dira si
  elles perdent la marque `ThemeColor` en route (section 3).
- **dashboard** : rien à réécrire dans les props de `Box`.

Le relevé ne voit pas les couleurs passées par variable ni les props transmises par
décomposition (`{...props}`) : le typecheck reste l'arbitre.
