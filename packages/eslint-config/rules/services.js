/** @type {import('eslint').Linter.Config} */
const config = {
  files: ['**/services/**/*.{ts,tsx}'],
  rules: {
    '@typescript-eslint/no-redeclare': 'off',
  },
};

module.exports = config;
