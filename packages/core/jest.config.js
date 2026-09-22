const path = require('path');

/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },
  transformIgnorePatterns: ['/node_modules/'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/build/', '/.expo/', '/coverage/'],
  cacheDirectory: path.join(__dirname, '.jest-cache'),
  collectCoverage: false,

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
      statements: 79,
      branches: 59,
      functions: 81,
      lines: 82,
    },
  },
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.test.ts', '!src/**/index.ts'],
  watchman: false,
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
};
