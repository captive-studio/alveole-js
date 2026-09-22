// Les mocks et les fichiers d'amorçage de Jest s'exécutent dans le harnais de test, qui leur
// fournit `jest`, `describe`, `expect` et leurs voisins. ESLint ne le sait pas : sans cette
// déclaration, `no-undef` les signale tous, et chaque fichier doit ouvrir sur un `/* global jest */`
// - une directive ESLint comme une autre, qui contourne la configuration au lieu de la corriger.
/** @type {import('eslint').Linter.Config} */
const config = {
  files: ['**/__tests__/**/*.{js,ts,tsx}', '**/*.{test,spec}.{js,ts,tsx}', '**/jest.setup.{js,ts}'],
  languageOptions: {
    globals: {
      jest: 'readonly',
      describe: 'readonly',
      it: 'readonly',
      test: 'readonly',
      expect: 'readonly',
      beforeAll: 'readonly',
      beforeEach: 'readonly',
      afterAll: 'readonly',
      afterEach: 'readonly',
    },
  },
};

module.exports = config;
