/** @type {import('eslint').Linter.Config} */
const config = {
  files: ['**/*.{ts,tsx}'],
  rules: {
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': ['error', { ignoreDeclarationMerge: true }],
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
