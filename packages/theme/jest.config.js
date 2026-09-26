/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest', { jsc: { parser: { syntax: 'typescript', tsx: true } } }],
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  // Les paquets @expo-google-fonts sont publies en ESM et referencent des .ttf :
  // sans transformation ni substitution, tout test qui touche Font.ts casse a l'import.
  transformIgnorePatterns: ['node_modules/(?!@expo-google-fonts)'],
  moduleNameMapper: { '\\.(ttf|otf|woff2?)$': '<rootDir>/src/test/fontFileMock.js' },
  watchman: false,

  // Seuils en cliquet : ils valent la couverture mesurée au moment où ils ont été posés,
  // arrondie à l'entier inférieur. Ils ne sont pas un objectif de qualité mais un garde-fou
  // contre l'érosion : une modification qui ajoute du code non testé fait baisser le taux
  // et échoue. Les relever après avoir gagné de la couverture fait partie du travail ;
  // les baisser demande une raison explicite.
  // `json-summary` alimente `scripts/check-coverage-ratchet.mjs`, qui reclame le relevage du
  // cliquet des qu'un gain de couverture le depasse. `text` reste pour la lecture humaine ;
  // les rapports par defaut (clover, lcov, json) n'avaient aucun consommateur.
  coverageReporters: ['text', 'json-summary'],
  coverageThreshold: {
    global: {
      statements: 77,
      branches: 64,
      functions: 68,
      lines: 79,
    },
  },
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.test.{ts,tsx}', '!src/**/index.ts'],
};
