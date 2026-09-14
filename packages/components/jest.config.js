const path = require('path');
const expoPreset = require('jest-expo/ios/jest-preset');

/** @type {import('jest').Config} */
module.exports = {
  ...expoPreset,
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  setupFilesAfterEnv: [...(expoPreset.setupFilesAfterEnv ?? []), '<rootDir>/__tests__/setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|@testing-library/react-native|@tamagui/.*|tamagui|lucide-react-native|react-native-svg|standard-navigation)',
  ],
  testPathIgnorePatterns: [...(expoPreset.testPathIgnorePatterns ?? []), '/dist/', '/build/', '/.expo/', '/coverage/'],
  // eslint-disable-next-line no-undef
  cacheDirectory: path.join(__dirname, '.jest-cache'),
  collectCoverage: false,

  // Seuils en cliquet : ils valent la couverture mesurée au moment où ils ont été posés,
  // arrondie à l'entier inférieur. Ils ne sont pas un objectif de qualité mais un garde-fou
  // contre l'érosion : une modification qui ajoute du code non testé fait baisser le taux
  // et échoue. Les relever après avoir gagné de la couverture fait partie du travail ;
  // les baisser demande une raison explicite.
  coverageThreshold: {
    global: {
      statements: 6,
      branches: 5,
      functions: 4,
      lines: 7,
    },
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/*.stories.tsx',
    '!src/**/*.stories.sources.ts',
    '!src/**/index.ts',
  ],
  watchman: false,
  moduleNameMapper: {
    ...(expoPreset.moduleNameMapper ?? {}),
    '^@alveole/theme$': '<rootDir>/../theme/src/index.ts',
    '^@/(.*)$': '<rootDir>/$1',
    // Canonicalise ces paquets sur la copie résolue depuis ce package, quel que soit
    // l'endroit où npm les hoiste (racine ou ici) : plusieurs workspaces déclarent leurs
    // propres copies pour leur typecheck/tests, et des instances dupliquées cassent React
    // ("Incompatible React versions", hooks invalides) ou la config Jest elle-même.
    '^react-native$': require.resolve('react-native'),
    '^react-native/(.*)$': path.join(path.dirname(require.resolve('react-native/package.json')), '$1'),
    '^react$': require.resolve('react'),
    '^react-dom$': require.resolve('react-dom'),
    '^test-renderer$': require.resolve('test-renderer'),
    '^lucide-react-native$': require.resolve('lucide-react-native'),
    '^expo-modules-core$': require.resolve('expo-modules-core'),
    '^expo-modules-core/(.*)$': path.join(path.dirname(require.resolve('expo-modules-core/package.json')), '$1'),
  },
};
