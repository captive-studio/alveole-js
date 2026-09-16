const baseConfig = require('@alveole/eslint-config');

module.exports = [
  ...baseConfig,
  { ignores: ['src/ui/LucideIcon/vendor/**'] },
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
