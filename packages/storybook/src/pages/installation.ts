import type { HighlightProps } from '@alveole/components';
import { ETAPES_D_OUTILLAGE } from './installationOutillage';

/**
 * Le texte de la page Installation. Comme la Philosophie, il est range en donnees : ajouter une
 * etape ne demande pas de toucher au JSX. Chaque etape doit pouvoir etre suivie telle quelle par
 * une personne ou par une IA, donc le code montre est complet et copiable.
 */
export type ExtraitDeCode = {
  langage: HighlightProps['language'];
  fichier?: string;
  source: string;
};

export type EtapeDInstallation = {
  titre: string;
  paragraphes: readonly string[];
  extraits?: readonly ExtraitDeCode[];
};

const ETAPES_DE_BASE: readonly EtapeDInstallation[] = [
  {
    titre: '1. Prérequis',
    paragraphes: [
      'Alveole s’installe dans une application Expo (Expo Router) qui utilise Tamagui 1.x. Les composants sont rendus sur iOS, Android et web.',
      'Les dépendances natives requises par @alveole/components (expo-router, expo-web-browser, react-native-svg, react-native-safe-area-context, tamagui et les paquets @tamagui/*…) sont déclarées en peerDependencies : les installer avec `npx expo install` pour obtenir les versions compatibles avec le SDK Expo.',
    ],
  },
  {
    titre: '2. Installer les paquets',
    paragraphes: [
      'Tous les paquets @alveole/* doivent avoir exactement le même numéro de version, sans ^ ni ~. Ils sont publiés ensemble et s’appuient les uns sur les autres : mélanger les versions provoque des erreurs de types ou de rendu difficiles à diagnostiquer.',
      'Pour monter de version, changer tous les paquets @alveole/* en même temps, y compris la clé allowScripts.',
      'Le script postinstall de @alveole/components copie pdf.min.mjs et pdf.worker.min.mjs dans public/ : le visualiseur PDF en a besoin sur le web. npm ne l’exécute que s’il est autorisé dans allowScripts, avec le même numéro de version que les paquets.',
      'Ces deux fichiers sont régénérés à chaque installation : les ajouter au .gitignore du projet.',
    ],
    extraits: [
      {
        langage: 'bash',
        source:
          'npm install --save-exact @alveole/components@1.10.0 @alveole/core@1.10.0 @alveole/storybook@1.10.0 @alveole/theme@1.10.0\nnpm install --save-dev --save-exact @alveole/eslint-config@1.10.0',
      },
      {
        langage: 'json',
        fichier: 'package.json',
        source: `{
  "dependencies": {
    "@alveole/components": "1.10.0",
    "@alveole/core": "1.10.0",
    "@alveole/storybook": "1.10.0",
    "@alveole/theme": "1.10.0"
  },
  "devDependencies": {
    "@alveole/eslint-config": "1.10.0"
  },
  "allowScripts": {
    "@alveole/components@1.10.0": true
  }
}`,
      },
      {
        langage: 'plaintext',
        fichier: '.gitignore',
        source: '# Copiés par le postinstall de @alveole/components\npublic/pdf.min.mjs\npublic/pdf.worker.min.mjs',
      },
    ],
  },
  {
    titre: '3. Configurer ESLint',
    paragraphes: [
      'L’application doit utiliser la configuration ESLint d’Alveole. Elle connaît les conventions des composants et évite les erreurs de lint qu’une configuration maison signalerait à tort. ESLint 9 ou 10 sont acceptés.',
    ],
    extraits: [
      {
        langage: 'typescript',
        fichier: 'eslint.config.js',
        source: `const { defineConfig } = require('eslint/config');
const alveoleConfig = require('@alveole/eslint-config');

module.exports = defineConfig([
  ...alveoleConfig,
  {
    settings: {
      react: {
        version: '19.2',
      },
    },
  },
]);`,
      },
    ],
  },
  {
    titre: '4. Configurer Tamagui',
    paragraphes: [
      'Les composants Alveole reposent sur Tamagui 1.x. L’application déclare sa configuration Tamagui, la référence dans package.json et active le plugin Babel, qui extrait le CSS en production.',
    ],
    extraits: [
      {
        langage: 'typescript',
        fichier: 'tamagui.config.ts',
        source: `import { defaultConfig } from '@tamagui/config/v4';
import { createTamagui } from 'tamagui';

const config = createTamagui(defaultConfig);

export type Conf = typeof config;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}

export default config;`,
      },
      {
        langage: 'typescript',
        fichier: 'babel.config.js',
        source: `module.exports = function (api) {
  api.cache(() => process.env.NODE_ENV);
  const isDev = process.env.NODE_ENV !== 'production';

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        '@tamagui/babel-plugin',
        {
          components: ['tamagui'],
          config: './tamagui.config.ts',
          disableDebugAttr: isDev,
          disableServerOptimization: isDev,
          ...(isDev ? {} : { cssPath: './.tamagui/app.css', emitSingleCSSFile: true }),
        },
      ],
    ],
  };
};`,
      },
      {
        langage: 'json',
        fichier: 'package.json',
        source: `{
  "tamagui": {
    "config": "./tamagui.config.ts"
  }
}`,
      },
    ],
  },
  {
    titre: '5. Brancher le ThemeProvider',
    paragraphes: [
      'ThemeProvider (@alveole/theme) charge les polices et fournit les couleurs et typographies à tous les composants. Il se place à la racine, dans app/_layout.tsx, au-dessus du TamaguiProvider de l’application.',
      'Par défaut, ThemeProvider affiche un indicateur de chargement le temps de charger les polices. Une application qui a son propre splash screen passe loader={false} et masque son splash dans onReady.',
      'Toasts (@alveole/components) est nécessaire pour afficher les notifications ; PageMetaProvider gère les balises <meta> sur le web.',
    ],
    extraits: [
      {
        langage: 'tsx',
        fichier: 'app/_layout.tsx',
        source: `import { PageMetaProvider, Toasts } from '@alveole/components';
import { ThemeProvider } from '@alveole/theme';
import { Slot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TamaguiProvider } from 'tamagui';
import tamaguiConfig from '../tamagui.config';
import config from '../alveole.config';

export default function RootLayout() {
  return (
    <ThemeProvider color={config.palette}>
      <SafeAreaProvider>
        <TamaguiProvider defaultTheme="light" config={tamaguiConfig}>
          <PageMetaProvider meta={[]}>
            <Toasts>
              <Slot />
            </Toasts>
          </PageMetaProvider>
        </TamaguiProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}`,
      },
    ],
  },
  {
    titre: '6. Personnaliser les couleurs',
    paragraphes: [
      'Les couleurs se surchargent dans un fichier alveole.config.ts à la racine du projet, importé par le layout et passé au ThemeProvider via la prop color.',
      'La palette est partielle : seules les clés fournies remplacent celles d’Alveole. Les valeurs viennent de préférence des nuanciers exportés par @alveole/theme (Colors.RougeGroseille, Colors.BleuCaptive…) ; la rubrique Thème › Couleurs liste les clés disponibles.',
      'La clé light cible les jetons sémantiques du thème clair (artwork, background, border, text) ; les clés de premier niveau (primary, background.button, stepper…) ciblent les couleurs propres aux composants.',
    ],
    extraits: [
      {
        langage: 'typescript',
        fichier: 'alveole.config.ts',
        source: `import { Colors, type DeepPartial, type Palette } from '@alveole/theme';

const palette: DeepPartial<Palette> = {
  light: {
    background: {
      'action-high-primary': Colors.RougeGroseille['main-465'],
      'action-high-primary-hover': Colors.RougeGroseille['200'],
      'alt-primary': Colors.RougeGroseille['975'],
    },
    border: {
      'action-high-primary': Colors.RougeGroseille['main-465'],
    },
    text: {
      'title-primary': Colors.RougeGroseille['main-465'],
      'active-primary': Colors.RougeGroseille['main-465'],
    },
  },

  primary: Colors.RougeGroseille['main-465'],

  background: {
    button: {
      primary: {
        default: Colors.RougeGroseille['main-465'],
        hover: Colors.RougeGroseille['200'],
      },
    },
  },

  stepper: {
    current: Colors.RougeGroseille['625'],
    success: Colors.RougeGroseille['main-465'],
  },
};

export default { palette };`,
      },
    ],
  },
];

export const ETAPES_D_INSTALLATION: readonly EtapeDInstallation[] = [...ETAPES_DE_BASE, ...ETAPES_D_OUTILLAGE];
