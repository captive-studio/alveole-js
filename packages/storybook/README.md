# @alveole/storybook

Composants réutilisables pour exposer un catalogue de stories et de tokens de thème.

Le package reprend les grandes parties du `ui-kit` de `groove-application/app/ui-kit`, mais sous une forme réutilisable et indépendante d'Expo Router.

## Prérequis

Le package est prévu pour être utilisé avec :

- `@alveole/components`
- `@alveole/theme`
- `react`
- `react-native`

Il doit être rendu dans une app déjà enveloppée par `ThemeProvider`.

## Exports disponibles

Le package exporte :

- `StoriesScreen`
- `StoryDetailScreen`
- `ThemeConstantsScreen`
- `ThemeConstantDetailScreen`
- `ThemePaletteScreen`
- `ThemeTypographyScreen`
- `JsonBlock`
- les types `StorybookMeta`, `StorybookModule`, `StorybookFlag`, `StorybookFlagKey`
- les helpers de `utils`

## Ecriture recommandee des stories

Le package `@alveole/storybook` est pense pour consommer directement les stories ecrites comme dans `packages/components`.

Le pattern recommande est :

- un `export default` qui satisfait le type `Story`
- des `export const` pour chaque exemple rendu

Exemple proche de l'ecriture actuelle de [Box.stories.tsx](/Users/corentincouq/Documents/alveole/packages/components/src/core/Box/Box.stories.tsx) :

```tsx
import { Story } from '../../type';
import { Typography } from '../Typography';
import { Box } from './Box';

export default {
  title: 'Box',
  tags: ['Kit'],
  experimental: false,
  description: 'Description du composant',
  component: Box,
  styleFn: () => 'Aucun style applique',
} satisfies Story;

export const BoxDefault = () => (
  <Box tag="box">
    <Typography>Contenu par defaut</Typography>
  </Box>
);

export const BoxPadded = () => (
  <Box p={16}>
    <Typography>Box avec padding</Typography>
  </Box>
);
```

Le `default` porte les metadonnees de la story. Les autres exports sont les variantes affichees par `StoryDetailScreen`.

Concretement, `@alveole/storybook` n'introduit pas un nouveau format de story. Il reutilise celui que tu ecris deja dans `packages/components/src/**/*.stories.tsx`.

## Structure attendue par le package

Quand tu fais :

```tsx
import * as Stories from '@alveole/components/stories';
```

chaque module exporte se retrouve sous une forme equivalente a :

```tsx
import type { StorybookModule } from '@alveole/storybook';

const ButtonStory = {
  default: {
    title: 'Button',
    tags: ['Kit'],
    experimental: false,
    description: 'Boutons de l application',
    figmaURL: 'https://figma.com/...',
    styleFn: () => ({}),
  },
  Primary: () => <MyButton label="Primary" />,
  Secondary: () => <MyButton label="Secondary" />,
} satisfies StorybookModule;
```

Autrement dit :

- `default` doit contenir les metadonnees
- les autres exports doivent etre des composants React affichables
- il ne faut pas rendre `StoriesScreen` ou `StoryDetailScreen` a l'interieur d'une story unitaire
- le bon point d'entree est un ecran catalogue qui consomme `@alveole/components/stories`

## Exemple minimal pour les stories

```tsx
import * as Stories from '@alveole/components/stories';
import { StoriesScreen, StoryDetailScreen, type StorybookModule } from '@alveole/storybook';
import React from 'react';

const storyList = Object.values(Stories) as StorybookModule[];

export const StoryCatalogPage = () => {
  const [selectedStory, setSelectedStory] = React.useState<StorybookModule | null>(null);

  if (selectedStory) {
    return <StoryDetailScreen story={selectedStory} />;
  }

  return (
    <StoriesScreen
      stories={storyList}
      title="UI Kit - Components"
      description="Catalogue des composants"
      onSelectStory={setSelectedStory}
    />
  );
};
```

## Exemple avec Expo Router

Le package ne crée pas les routes. Il fournit seulement les écrans. À toi de brancher la navigation.

```tsx
import * as Stories from '@alveole/components/stories';
import { StoriesScreen, type StorybookModule } from '@alveole/storybook';
import { router } from 'expo-router';

const storyList = Object.values(Stories) as StorybookModule[];

export default function UIKitStoriesRoute() {
  return (
    <StoriesScreen
      stories={storyList}
      onSelectStory={story => {
        router.push(`/ui-kit/components/${encodeURIComponent(story.default.title)}`);
      }}
    />
  );
}
```

Puis dans la route de détail :

```tsx
import * as Stories from '@alveole/components/stories';
import { StoryDetailScreen, type StorybookModule } from '@alveole/storybook';
import { useLocalSearchParams } from 'expo-router';

export default function UIKitStoryDetailRoute() {
  const { component } = useLocalSearchParams<{ component: string }>();

  const story = (Object.values(Stories) as StorybookModule[]).find(entry => entry.default.title === component) ?? null;

  return <StoryDetailScreen story={story} />;
}
```

## Exemple pour les constantes du thème

```tsx
import * as ThemeConstants from '@alveole/theme';
import { ThemeConstantsScreen } from '@alveole/storybook';

export default function ThemeConstantsPage() {
  return (
    <ThemeConstantsScreen constants={ThemeConstants} title="UI Kit - Constants" description="Constantes du thème" />
  );
}
```

## Exemple pour la palette

```tsx
import { CustomPalette } from '@alveole/theme';
import { ThemePaletteScreen } from '@alveole/storybook';

export default function ThemePalettePage() {
  return <ThemePaletteScreen palette={CustomPalette} />;
}
```

## Exemple pour la typographie

```tsx
import { CustomTypography } from '@alveole/theme';
import { ThemeTypographyScreen } from '@alveole/storybook';

export default function ThemeTypographyPage() {
  return <ThemeTypographyScreen typography={CustomTypography} />;
}
```

## Props principales

### `StoriesScreen`

- `stories`: liste des stories
- `title`: titre de page
- `description`: description de page
- `emptyMessage`: message affiché si aucun résultat
- `createLabel`: libellé du bouton d’action
- `onCreatePress`: callback du bouton d’action
- `onSelectStory`: callback au clic sur une story

### `StoryDetailScreen`

- `story`: story sélectionnée
- `notFoundMessage`: message si la story est absente

### `ThemeConstantsScreen`

- `constants`: objet de constantes
- `title`: titre de page
- `description`: description de page
- `onSelectConstant`: callback au clic sur une constante

### `ThemeConstantDetailScreen`

- `name`: nom de la constante
- `value`: valeur de la constante

### `ThemePaletteScreen`

- `palette`: objet de palette
- `title`: titre de page
- `description`: description de page

### `ThemeTypographyScreen`

- `typography`: objet de tokens typo
- `title`: titre de page
- `description`: description de page

## Notes

- Le package n’embarque pas de moteur Storybook officiel.
- Il ne dépend pas d’Expo Router, mais il est pensé pour s’y brancher facilement.
- `StoryDetailScreen` ouvre le lien Figma via `Linking.openURL`.
- Les vues de détail affichent les objets sous forme JSON via `JsonBlock`.
