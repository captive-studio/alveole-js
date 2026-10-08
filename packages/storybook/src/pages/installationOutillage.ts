import type { EtapeDInstallation } from './installation';

/**
 * Suite de la page Installation : les options (thème dynamique, catalogue) et l'outillage (Jest),
 * puis la vérification. Separees des etapes de base pour garder chaque fichier lisible.
 */
export const ETAPES_D_OUTILLAGE: readonly EtapeDInstallation[] = [
  {
    titre: '7. Thème dynamique (facultatif)',
    paragraphes: [
      'Quand les couleurs dépendent de données chargées à l’exécution (une société, un client), fusionner alveole.config avec la palette calculée grâce à deepMerge (@alveole/theme), puis passer le résultat au ThemeProvider. deepMerge ignore les valeurs absentes : une palette partielle ne remplace que ses clés.',
    ],
    extraits: [
      {
        langage: 'tsx',
        fichier: 'providers/ClientThemeProvider.tsx',
        source: `import { deepMerge, ThemeProvider, type DeepPartial, type Palette } from '@alveole/theme';
import React from 'react';
import config from '../alveole.config';

export const ClientThemeProvider = ({
  clientPalette,
  children,
}: {
  clientPalette?: DeepPartial<Palette>;
  children: React.ReactNode;
}) => {
  const color = React.useMemo(() => deepMerge(config.palette, clientPalette), [clientPalette]);

  return <ThemeProvider color={color}>{children}</ThemeProvider>;
};`,
      },
    ],
  },
  {
    titre: '8. Configurer Jest',
    paragraphes: [
      '@alveole/components et Tamagui sont publiés en ESM et importent des fichiers .css : Jest doit les transformer au lieu de les ignorer, et remplacer les .css par un stub.',
      'Certains modules natifs chargés par les composants (expo-asset pour le favicon de PageHead, matchMedia pour Reanimated) n’existent pas dans l’environnement de test : les simuler dans jest.setup.js.',
    ],
    extraits: [
      {
        langage: 'typescript',
        fichier: 'jest.config.js',
        source: `const webPreset = require('jest-expo/web/jest-preset');

const [babelModule, babelOptions] = webPreset.transform['\\\\.[jt]sx?$'];

module.exports = {
  ...webPreset,
  setupFiles: [...(webPreset.setupFiles ?? []), '<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    ...webPreset.moduleNameMapper,
    '\\\\.css$': '<rootDir>/jest.cssStub.js',
  },
  transform: {
    ...webPreset.transform,
    '\\\\.[jt]sx?$|\\\\.mjs$': [babelModule, babelOptions],
  },
  // On transforme tout node_modules, sauf les plugins Babel eux-mêmes.
  transformIgnorePatterns: ['/node_modules/react-native-reanimated/plugin/', '/node_modules/@react-native/babel-preset/'],
};`,
      },
      {
        langage: 'typescript',
        fichier: 'jest.cssStub.js',
        source: 'module.exports = {};',
      },
      {
        langage: 'typescript',
        fichier: 'jest.setup.js',
        source: `jest.mock('expo-asset', () => ({
  Asset: { fromModule: () => ({ uri: 'test-file-stub' }) },
}));

if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = () => ({
    matches: false,
    media: '',
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}`,
      },
    ],
  },
  {
    titre: '9. Monter le catalogue dans l’application (facultatif)',
    paragraphes: [
      '@alveole/storybook sert à afficher, dans l’application elle-même, le catalogue des composants Alveole et ceux du projet. Deux routes suffisent : la liste et la fiche d’un composant. Les écrans Couleurs, Typographies et Constantes s’ajoutent de la même façon.',
      'Le catalogue n’a d’intérêt qu’en développement : y donner accès par un bouton affiché sous __DEV__.',
    ],
    extraits: [
      {
        langage: 'tsx',
        fichier: 'app/ui-kit/index.tsx',
        source: `import * as AlveoleStories from '@alveole/components/stories';
import { StoriesScreen, toStoryModules } from '@alveole/storybook';

const stories = toStoryModules(AlveoleStories);

export default function UIKitIndexScreen() {
  return (
    <StoriesScreen
      stories={stories}
      title="UI Kit - Composants"
      getStoryHref={story => \`/ui-kit/components/\${encodeURIComponent(story.default.title)}\`}
    />
  );
}`,
      },
      {
        langage: 'tsx',
        fichier: 'app/ui-kit/components/[component].tsx',
        source: `import * as AlveoleStories from '@alveole/components/stories';
import { StoryDetailScreen, findStoryByTitle, toStoryModules } from '@alveole/storybook';
import { useLocalSearchParams } from 'expo-router';

const stories = toStoryModules(AlveoleStories);

export default function UIKitComponentScreen() {
  const { component } = useLocalSearchParams<{ component: string }>();

  return <StoryDetailScreen story={findStoryByTitle(stories, component)} notFoundMessage="Composant introuvable" />;
}`,
      },
    ],
  },
  {
    titre: '10. Vérifier',
    paragraphes: [
      'Afficher un premier composant pour valider l’installation, puis lancer le lint et le typecheck de l’application.',
    ],
    extraits: [
      {
        langage: 'tsx',
        fichier: 'app/index.tsx',
        source: `import { Button } from '@alveole/components';

export default function Home() {
  return <Button variant="primary" title="Alveole est installé" onPress={() => {}} />;
}`,
      },
      {
        langage: 'bash',
        source: 'npx eslint .\nnpx tsc --noEmit',
      },
    ],
  },
];
