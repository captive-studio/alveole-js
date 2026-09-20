# @alveole/theme

Thème partagé (tokens, typographies, helpers) pour les apps React Native / web.

## Installation

```bash
npm i @alveole/theme
```

Peer deps requis : `react`, `react-native`, `expo-font`, `expo-system-ui`, `@tamagui/core`.

## Utilisation rapide

```tsx
import { ThemeProvider, useTheme, makeStyles } from '@alveole/theme';

export default function App() {
  return (
    <ThemeProvider>
      <Screen />
    </ThemeProvider>
  );
}

function Screen() {
  const { spacing } = useTheme();
  return <Box style={{ margin: spacing('2W') }}>Contenu</Box>;
}
```

## Générer des styles

```tsx
// Exemple.styles.tsx
import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ spacing, text, color }) => ({
  container: { padding: spacing('3W') },
  title: text.Titres['H3 - MD'],
  label: { color: color.Neutre[700] },
}));
```

```tsx
// Exemple.tsx
import { useStyles } from './Exemple.styles';

function Exemple() {
  const styles = useStyles();
  return <Box style={styles.container} />;
}
```

## Spacing

Les clés de spacing suivent une nomenclature `V` (verticals, multiples de 2px) et `W` (horizontals, multiples de 8px) :

| Clé    | px  |
| ------ | --- |
| `0V`   | 0   |
| `0,5V` | 2   |
| `1V`   | 4   |
| `1,5V` | 6   |
| `1W`   | 8   |
| `3V`   | 12  |
| `2W`   | 16  |
| `3W`   | 24  |
| `4W`   | 32  |
| `5W`   | 40  |
| `6W`   | 48  |
| `8W`   | 64  |
| `12W`  | 96  |
| `15W`  | 120 |

```tsx
const { spacing, externalPadding } = useTheme();

spacing('3W'); // 24
externalPadding(); // 16 sur mobile, 24 sur desktop
```

## Typographies

Les styles de texte sont organisés en trois catégories :

```tsx
const { text } = useTheme();

// Titres alternatifs (Geist SemiBold)
text['Titres alternatifs'].XS; // 48px
text['Titres alternatifs'].XL; // 80px

// Titres (Geist SemiBold — tailles adaptées mobile/desktop)
text.Titres['H1 - XL']; // Geist SemiBold, 40px desktop / 32px mobile
text.Titres['H3 - MD']; // 28px desktop / 24px mobile
text.Titres['H6 - XXS']; // 20px desktop / 18px mobile

// Corps de texte
text['Corps de texte'].SM.Regular; // Geist Regular, 14px
text['Corps de texte'].MD.SemiBold; // Geist SemiBold, 16px
text['Corps de texte'].LG.Medium; // Geist Medium, 18px
```

## Fonts

Les fonts sont chargées automatiquement par `ThemeProvider`. Une seule famille est utilisée : **Geist** (titres et corps de texte).

Sur le web, les fonts sont injectées via des `@font-face` CSS standards (`font-family: Geist; font-weight: 500`). Sur native, elles utilisent le système expo-font.

```tsx
const { font } = useTheme();

font['Geist-Regular']; // 'Geist-Regular' (native) ou utilisé via font-weight (web)
font['Geist-Bold'];
```

### fontStyle helper

Pour créer des styles typés avec la bonne font selon la plateforme :

```tsx
import { fontStyle } from '@alveole/theme';

const style = {
  ...fontStyle('Geist-Bold'), // { fontFamily: 'Geist', fontWeight: '600' } sur web
  fontSize: 16, // { fontFamily: 'Geist-Bold' } sur native
};
```

## Radius

```tsx
const { radius } = useTheme();

radius('sm'); // 4
radius('md'); // 6
radius('lg'); // 10
radius('full'); // 99999
```

## Breakpoints & variante

```tsx
const { variant, isVariant } = useTheme();

variant; // 'mobile' | 'tablet' | 'desktop'
isVariant('mobile'); // boolean
```

| Variante  | Largeur       |
| --------- | ------------- |
| `mobile`  | < 768px       |
| `tablet`  | 768px – 991px |
| `desktop` | ≥ 992px       |

## Couleurs

```tsx
const { color } = useTheme();

color.Neutre[700];
color.Watusi[50];
color.alpha(color.Neutre[900], 0.5); // 'rgba(55, 58, 63, 0.5)'
```

## Personnaliser la palette

```tsx
<ThemeProvider
  color={{
    Neutre: { 100: '#F7F7F7' },
    Watusi: { 50: '#FEF5F2' },
  }}
>
  <App />
</ThemeProvider>
```

> (Recommandé) Vous pouvez définir un fichier `alveole.config.js` à la racine pour centraliser la surcharge :

```js
const { Colors } = require('@alveole/theme');

/** @type {import('@alveole/theme').Palette} */
const palette = {
  primary: Colors.VertPrairie['sun-475'],

  background: {
    button: {
      primary: {
        default: Colors.VertPrairie['sun-475'],
        hover: Colors.VertPrairie['sun-475-hover'],
      },
    },
  },
};

module.exports = { palette };

// Utiliser dans le provider :
// import config from '@/alveole.config.js';
// <ThemeProvider color={config.palette}>
```

## Variables CSS (web)

Sur le web, `ThemeProvider` injecte automatiquement des variables CSS pour les couleurs, l'espacement et les fonts :

```css
/* Spacing */
var(--spacing-2W)
var(--spacing-3W)

/* Colors */
var(--color-Neutre-200)
var(--color-Watusi-50)
```

## Références

- Typage du thème : `src/type/Theme.ts`
- Palette : `src/constants/Palette.ts`
- Typographies : `src/constants/Typography.ts`
- Spacing : `src/constants/Spacing.ts`
- Radius : `src/constants/Radius.ts`
- Fonts : `src/constants/Font.ts`
