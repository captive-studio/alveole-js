const complexityRules = require('@alveole/eslint-config/rules/complexity');
const sonarjsRules = require('@alveole/eslint-config/rules/sonarjs');
const directiveRules = require('@alveole/eslint-config/rules/directives');

// Les scripts du depot et les outils ne sont ni publies ni consommes, mais ils portent les
// garde-fous eux-memes : `check-suppressions.mjs` dit aux autres devs qu'une violation se
// corrige. Il serait incoherent qu'il soit le seul code du depot a echapper a la mesure.
// Les paquets et `apps/docs` ont leur propre config ; cette racine ne couvre qu'eux deux.
/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  { ignores: ['**/node_modules/**', 'packages/**', 'apps/**', 'tools/*/node_modules/**'] },
  { linterOptions: { reportUnusedDisableDirectives: 'error' } },
  {
    files: ['scripts/**/*.mjs', 'tools/**/*.mjs'],
    languageOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    plugins: { ...sonarjsRules.plugins, ...directiveRules.plugins },
    rules: { ...complexityRules.rules, ...sonarjsRules.rules, ...directiveRules.rules },
  },
];
