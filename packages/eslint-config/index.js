const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const sharedRules = require('./rules/_shared');
const styleRules = require('./rules/styles');
const serviceRules = require('./rules/services');

/** @type {import('eslint').Linter.Config[]} */
const config = defineConfig([expoConfig, { ignores: ['dist/**'] }, sharedRules, styleRules, serviceRules]);

module.exports = config;
