const baseConfig = require('@alveole/eslint-config');

module.exports = [
  ...baseConfig,
  {
    files: ['**/*.{ts,tsx}'],
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.typecheck.json',
        },
      },
    },
  },
];
