const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/**'],
  },
  {
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
  },
  {
    files: ['**/*.styles.ts'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: "Property[key.name='transition'], Property[key.value='transition']",
          message:
            'N’utilisez pas la propriété CSS transition. Utilisez transitionBehavior, transitionDelay, transitionDuration, transitionProperty ou transitionTimingFunction à la place.',
        },
        {
          selector:
            "Property[key.name='padding'] > Literal[value=/\\s+/], Property[key.value='padding'] > Literal[value=/\\s+/]",
          message:
            'N’utilisez pas la forme raccourcie padding avec plusieurs valeurs. Utilisez paddingTop, paddingBottom, paddingLeft et paddingRight à la place.',
        },
      ],
    },
  },
  {
    files: ['**/services/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-redeclare': 'off',
    },
  },
]);
