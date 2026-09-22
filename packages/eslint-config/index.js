const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const sharedRules = require('./rules/_shared');
const styleRules = require('./rules/styles');
const serviceRules = require('./rules/services');
const accessibilityRules = require('./rules/accessibility');
const complexityRules = require('./rules/complexity');
const sonarjsRules = require('./rules/sonarjs');
const catalogueRules = require('./rules/catalogues');

/** @type {import('eslint').Linter.Config[]} */
const config = defineConfig([
  expoConfig,
  { ignores: ['dist/**', '**/public/pdf.*.mjs'] },
  sharedRules,
  styleRules,
  serviceRules,
  accessibilityRules,
  complexityRules,
  sonarjsRules,
  catalogueRules,
]);

module.exports = config;
