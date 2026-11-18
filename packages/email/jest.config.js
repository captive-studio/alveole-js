const path = require('path');

/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      { jsc: { parser: { syntax: 'typescript', tsx: true }, transform: { react: { runtime: 'automatic' } } } },
    ],
  },
  // Les paquets @expo-google-fonts, tires par @alveole/theme, sont publies en ESM.
  transformIgnorePatterns: ['node_modules/(?!@expo-google-fonts)'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/coverage/'],
  cacheDirectory: path.join(__dirname, '.jest-cache'),
  // Le theme est lu dans ses sources, comme en typecheck. Ses dependances d'app (react-native,
  // expo) n'ont rien a faire dans un mail : des bouchons suffisent a l'importer sous Node.
  moduleNameMapper: {
    '^@alveole/theme$': '<rootDir>/../theme/src/index.ts',
    '^react-native$': '<rootDir>/__tests__/mocks/react-native.js',
    '^expo-(font|system-ui)$': '<rootDir>/__tests__/mocks/expo.js',
    '\\.(ttf|otf|woff2?)$': '<rootDir>/../theme/src/test/fontFileMock.js',
    '^react$': require.resolve('react'),
    '^react-dom/server$': require.resolve('react-dom/server'),
  },
  watchman: false,
  collectCoverage: false,
  coverageReporters: ['text', 'json-summary'],
  // Seuils en cliquet, poses a la couverture mesuree a la creation du paquet.
  coverageThreshold: { global: { statements: 98, branches: 86, functions: 94, lines: 98 } },
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.test.{ts,tsx}', '!src/**/index.ts'],
};
