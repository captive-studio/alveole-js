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

// Stub native-only optional dependencies that break web/SSR bundling
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  canvas: path.resolve(projectRoot, 'shims/canvas.js'),
};

// Deduplicate React across the monorepo — prevents "two React instances" error (#525)
// All packages must resolve to the same React copy (the one in apps/docs/node_modules)
config.resolver.resolveRequest = (context, moduleName, platform) => {
  const dedupedModules = ['react', 'react-dom', 'react-native', 'react-native-web'];
  if (dedupedModules.includes(moduleName)) {
    return context.resolveRequest(
      { ...context, originModulePath: path.resolve(projectRoot, 'index.js') },
      moduleName,
      platform,
    );
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
