const path = require('path');
const nativePreset = require('jest-expo/ios/jest-preset');
const androidPreset = require('jest-expo/android/jest-preset');
const webPreset = require('jest-expo/web/jest-preset');

const TEST_MATCH = '**/?(*.)+(spec|test).[tj]s?(x)';
const WEB_TEST_MATCH = '**/?(*.)+(spec|test).web.[tj]s?(x)';
const ANDROID_TEST_MATCH = '**/?(*.)+(spec|test).android.[tj]s?(x)';

const ignoredPaths = ['/dist/', '/build/', '/.expo/', '/coverage/'];

// `react-syntax-highlighter` et sa chaîne `refractor` / `hast` sont publiés en ESM. Sans
// transformation, tout test qui importe `Highlight` casse à l'import au lieu de s'exécuter.
const transformIgnorePatterns = [
  'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|@testing-library/react-native|@tamagui/.*|tamagui|lucide-react-native|react-native-svg|standard-navigation|react-syntax-highlighter|refractor|hastscript|property-information|space-separated-tokens|comma-separated-tokens|character-[a-z-]+|parse-entities|stringify-entities|decode-named-character-reference|is-[a-z-]+|web-namespaces|zwitch|html-void-elements|devlop|ccount|bail|trough|unified|vfile[a-z-]*|unist-util-[a-z-]+|hast-util-[a-z-]+)',
  // Le mapper ci-dessous résout Lucide sur son entrée CommonJS, déjà compilée.
  // Repasser ses milliers d'icônes dans Babel coûte cher à froid, sans changer leur code.
  '/node_modules/lucide-react-native/dist/cjs/',
];

// Alias communs aux deux plateformes. Ils canonicalisent ces paquets sur la copie résolue
// depuis ce package, quel que soit l'endroit où npm les hoiste (racine ou ici) : plusieurs
// workspaces déclarent leurs propres copies pour leur typecheck/tests, et des instances
// dupliquées cassent React ("Incompatible React versions", hooks invalides) ou la config
// Jest elle-même.
const sharedModuleNameMapper = {
  '^@alveole/core$': '<rootDir>/../core/src/index.ts',
  '^@alveole/theme$': '<rootDir>/../theme/src/index.ts',
  '^@/(.*)$': '<rootDir>/$1',
  '^react$': require.resolve('react'),
  '^react-dom$': require.resolve('react-dom'),
  '^lucide-react-native$': require.resolve('lucide-react-native'),
};

// `watchPlugins` vient des presets Expo mais n'est pas une option de projet : Jest la
// refuse avec un avertissement de validation à chaque exécution.
const project = (preset, overrides) => {
  const { watchPlugins, ...rest } = preset;
  // Les options de projet ne sont pas héritées de la config racine de Jest.
  // Sans ce chemin ici, les deux plateformes utilisent os.tmpdir() malgré le cache déclaré.
  // eslint-disable-next-line no-undef
  return { ...rest, cacheDirectory: path.join(__dirname, '.jest-cache'), transformIgnorePatterns, ...overrides };
};

/** @type {import('jest').Config} */
module.exports = {
  projects: [
    project(nativePreset, {
      displayName: 'native',
      testMatch: [TEST_MATCH],
      setupFilesAfterEnv: [...(nativePreset.setupFilesAfterEnv ?? []), '<rootDir>/__tests__/setup.js'],
      testPathIgnorePatterns: [...(nativePreset.testPathIgnorePatterns ?? []), ...ignoredPaths],
      moduleNameMapper: {
        ...(nativePreset.moduleNameMapper ?? {}),
        ...sharedModuleNameMapper,
        '^react-native$': require.resolve('react-native'),
        '^react-native/(.*)$': path.join(path.dirname(require.resolve('react-native/package.json')), '$1'),
        '^test-renderer$': require.resolve('test-renderer'),
        '^expo-modules-core$': require.resolve('expo-modules-core'),
        '^expo-modules-core/(.*)$': path.join(path.dirname(require.resolve('expo-modules-core/package.json')), '$1'),
      },
    }),
    // Le preset natif est celui d'iOS : quand un composant a une variante `.ios.tsx`, c'est
    // elle qu'il résout, et le fichier `.tsx` générique, celui que voient Android et toutes
    // les plateformes sans variante, n'est alors exercé par aucun projet. DateInput est le
    // seul composant dans ce cas aujourd'hui, et une régression de locale y est passée
    // inaperçue jusqu'à ce qu'on la cherche. Ce projet rend ce fichier atteignable.
    project(androidPreset, {
      displayName: 'android',
      testMatch: [ANDROID_TEST_MATCH],
      setupFilesAfterEnv: [
        ...(androidPreset.setupFilesAfterEnv ?? []),
        '<rootDir>/__tests__/setup.js',
        '<rootDir>/__tests__/mocks/datetimepicker.js',
      ],
      testPathIgnorePatterns: [...(androidPreset.testPathIgnorePatterns ?? []), ...ignoredPaths],
      moduleNameMapper: {
        ...(androidPreset.moduleNameMapper ?? {}),
        ...sharedModuleNameMapper,
        '^react-native$': require.resolve('react-native'),
        '^react-native/(.*)$': path.join(path.dirname(require.resolve('react-native/package.json')), '$1'),
        '^test-renderer$': require.resolve('test-renderer'),
        '^expo-modules-core$': require.resolve('expo-modules-core'),
        '^expo-modules-core/(.*)$': path.join(path.dirname(require.resolve('expo-modules-core/package.json')), '$1'),
      },
    }),
    // Les composants ont des variantes `.web.tsx` que le preset natif ne résout jamais :
    // leur comportement propre n'était couvert par aucun test unitaire, seulement par
    // l'audit d'accessibilité de bout en bout. Ce projet les rend dans jsdom via
    // react-native-web. Le preset web met les extensions `web.*` en tête de résolution.
    //
    // L'environnement est `jest-environment-jsdom` 30.5.1 alors que Jest est en 29.7.0, et
    // cet écart de version majeure est voulu : la 30 embarque jsdom 26, la 29 embarque
    // jsdom 20, qui ne résout pas les propriétés CSS personnalisées dans
    // `getComputedStyle`. Les tests de style de la barre latérale y lisent `''` au lieu de
    // `var(--…)`. Aligner les deux versions « pour faire propre » casse donc cinq tests,
    // dans SidebarGroup et SidebarItem.
    project(webPreset, {
      displayName: 'web',
      testMatch: [WEB_TEST_MATCH],
      setupFilesAfterEnv: [...(webPreset.setupFilesAfterEnv ?? []), '<rootDir>/__tests__/setup.web.js'],
      testPathIgnorePatterns: [...(webPreset.testPathIgnorePatterns ?? []), ...ignoredPaths],
      moduleNameMapper: {
        ...(webPreset.moduleNameMapper ?? {}),
        ...sharedModuleNameMapper,
      },
    }),
  ],

  watchman: false,
  collectCoverage: false,

  // Seuils en cliquet : ils valent la couverture mesurée au moment où ils ont été posés,
  // arrondie à l'entier inférieur. Ils ne sont pas un objectif de qualité mais un garde-fou
  // contre l'érosion : une modification qui ajoute du code non testé fait baisser le taux
  // et échoue. Les relever après avoir gagné de la couverture fait partie du travail ;
  // les baisser demande une raison explicite.
  coverageThreshold: {
    global: {
      statements: 26,
      branches: 22,
      functions: 23,
      lines: 27,
    },
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.test.*',
    '!src/**/*.stories.tsx',
    '!src/**/*.stories.sources.ts',
    '!src/**/index.ts',
  ],
};
