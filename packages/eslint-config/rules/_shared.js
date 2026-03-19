const flashListPlugin = require('../plugins/flash-list');

/** @type {import('eslint').Linter.Config} */
const config = {
  files: ['**/*.{ts,tsx}'],
  plugins: {
    flashList: flashListPlugin,
  },
  rules: {
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': ['error', { ignoreDeclarationMerge: true }],
    'flashList/prefer-flash-list': 'error',
    'no-restricted-properties': [
      'error',
      {
        object: 'window',
        property: 'open',
        message: 'N’utilisez pas window.open. Utilisez Linking.openURL (expo) à la place.',
      },
    ],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
  },
};

module.exports = config;
