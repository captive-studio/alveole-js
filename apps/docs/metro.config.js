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

const localNodeModules = path.resolve(projectRoot, 'node_modules');

config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  canvas: path.resolve(projectRoot, 'shims/canvas.js'),
};

// Force a single copy of React and React Native across the entire monorepo.
// packages/*/dist files resolve react from the root node_modules while
// apps/docs uses its own node_modules/react → two instances → crash.
// resolveRequest intercepts ALL require/import calls including subpaths
// like react/jsx-runtime that extraNodeModules cannot cover.
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (
    moduleName === 'react' ||
    moduleName === 'react-dom' ||
    moduleName === 'react-native' ||
    moduleName === 'react-native-web' ||
    moduleName.startsWith('react/') ||
    moduleName.startsWith('react-dom/')
  ) {
    try {
      const filePath = require.resolve(moduleName, { paths: [localNodeModules] });
      return { filePath, type: 'sourceFile' };
    } catch {
      // fall through to default resolution
    }
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
