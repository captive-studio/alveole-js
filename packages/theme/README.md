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
  return <Box style={{ margin: spacing('100') }}>Contenu</Box>;
}
```

## Générer des styles

```tsx
// Exemple.styles.tsx
import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ spacing }) => ({
  container: { padding: spacing('150') },
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

## Personnaliser la palette

```tsx
<ThemeProvider
  color={{
    Neutre: { 100: '#F7F7F7' },
    Mandarine: { 50: '#FFF3EA' },
  }}
>
  <App />
</ThemeProvider>
```

> (Recommandé) Vous pouvez définir un fichier de configuration à la racine de votre projet `alveole.config.js` afin de surcharger les tokens du thème.

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
// <ThemeProvider color={config.palette}>
```

## Variables CSS (web)

Sur le web, les variables CSS sont injectées automatiquement si besoin par une lib web.

```css
/* Spacing */
var(--spacing-050)
var(--spacing-150)

/* Colors */
var(--color-Neutre-200)
var(--color-Mandarine-50)
```

## Références

- Typage du thème : `src/type/Theme.ts`
- Palette : `src/constants/Palette.ts`
- Typographies : `src/constants/Typography.ts`
