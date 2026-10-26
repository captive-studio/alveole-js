const baseConfig = require('@alveole/eslint-config');
const sharedRules = require('@alveole/eslint-config/rules/_shared');

// En flat config, une regle redefinie remplace ses options au lieu de s'y ajouter : les
// selecteurs partages restent donc en tete de liste.
const [severite, ...selecteursPartages] = sharedRules.rules['no-restricted-syntax'];

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
  {
    // ADR 0027 : jsdom n'a pas de moteur de mise en page, un style calcule y vaut ce que le style
    // declare dit qu'il vaut. Un test vert n'y prouve pas le rendu.
    files: ['**/*.test.{ts,tsx}', '**/*.test.*.{ts,tsx}'],
    rules: {
      'no-restricted-syntax': [
        severite,
        ...selecteursPartages,
        {
          selector:
            "CallExpression[callee.name='getComputedStyle'], CallExpression[callee.property.name='getComputedStyle']",
          message: 'Style calculé en jsdom (ADR 0027) : tester la logique au niveau 1, ou le rendu dans apps/docs/e2e.',
        },
      ],
    },
  },
];
