const path = require('path');

// Un seul projet, sans preset de plateforme : ce qui est testé ici est la logique de
// navigation du catalogue, des fonctions pures sans rendu. Le jour où un test aura besoin
// de rendre un écran, on ajoutera le projet web de `@alveole/components` à côté.
/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  // eslint-disable-next-line no-undef
  cacheDirectory: path.join(__dirname, '.jest-cache'),
  watchman: false,
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.test.*', '!src/**/index.ts'],
};
