const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const sharedRules = require('./rules/_shared');
const styleRules = require('./rules/styles');
const serviceRules = require('./rules/services');
const accessibilityRules = require('./rules/accessibility');
const complexityRules = require('./rules/complexity');
const sonarjsRules = require('./rules/sonarjs');
const catalogueRules = require('./rules/catalogues');
const configurationRules = require('./rules/configuration');
const chargementParesseuxRules = require('./rules/chargement-paresseux');
const testRules = require('./rules/tests');
const typageRules = require('./rules/typage');
const directiveRules = require('./rules/directives');

/** @type {import('eslint').Linter.Config[]} */
const config = defineConfig([
  expoConfig,
  { ignores: ['dist/**', '**/public/pdf.*.mjs'] },
  // Une directive qui ne désactive plus rien est un vestige : elle laisse croire qu'une règle
  // gêne encore à cet endroit, et elle survit au correctif qui l'a rendue inutile. Deux des huit
  // directives levées ici ont été repérées exactement comme ça.
  { linterOptions: { reportUnusedDisableDirectives: 'error' } },
  sharedRules,
  styleRules,
  serviceRules,
  accessibilityRules,
  complexityRules,
  sonarjsRules,
  catalogueRules,
  configurationRules,
  chargementParesseuxRules,
  testRules,
  typageRules,
  directiveRules,
]);

module.exports = config;
