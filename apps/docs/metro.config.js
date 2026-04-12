const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// Watch all packages in the monorepo
config.watchFolders = [monorepoRoot];

// Resolve modules from monorepo root first, then project root
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];

// Alias @ to the docs app root
config.resolver.alias = {
  '@': projectRoot,
};

// Force single copies of React and React Native across the monorepo.
// extraNodeModules acts as a hard override: any import of these modules from
// anywhere in the bundle (including node_modules packages) resolves to the
// same physical path, eliminating the "two React instances" crash.
const localNodeModules = path.resolve(projectRoot, 'node_modules');
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  canvas: path.resolve(projectRoot, 'shims/canvas.js'),
  react: path.resolve(localNodeModules, 'react'),
  'react-dom': path.resolve(localNodeModules, 'react-dom'),
  'react-native': path.resolve(localNodeModules, 'react-native'),
  'react-native-web': path.resolve(localNodeModules, 'react-native-web'),
  'react/jsx-runtime': path.resolve(localNodeModules, 'react/jsx-runtime'),
  'react/jsx-dev-runtime': path.resolve(localNodeModules, 'react/jsx-dev-runtime'),
};

module.exports = config;
