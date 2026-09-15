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

// Force une copie unique de chaque paquet sensible à la duplication à travers le monorepo.
// Plusieurs workspaces (packages/components, packages/storybook...) déclarent leurs propres
// copies de ces paquets (pour leur typecheck/tests), avec parfois des versions différentes.
// Metro résout par défaut via sa recherche hiérarchique normale, qui trouve la copie locale
// au fichier important (ex: packages/components/node_modules/expo-router), pas celle d'apps/docs.
// Avec des copies dupliquées, React crée des instances de contexte distinctes (Provider et
// Consumer ne se voient plus) ou refuse carrément de démarrer ("Incompatible React versions").
// disableHierarchicalLookup casserait la résolution de paquets légitimement nichés plus
// profondément (ex: expo-router/node_modules/@expo/metro-runtime), donc on intercepte
// uniquement ces paquets précis via resolveRequest, en laissant tout le reste passer par
// la résolution par défaut.
// react-native/react-native-web restent gérés via extraNodeModules (pas resolveRequest) :
// Expo substitue automatiquement 'react-native' -> 'react-native-web' pour la plateforme web
// via son resolveRequest par défaut, et court-circuiter cette étape casserait le build web.
const localNodeModules = path.resolve(projectRoot, 'node_modules');
const canonicalPackages = ['react', 'react-dom', 'expo-router'];
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  canvas: path.resolve(projectRoot, 'shims/canvas.js'),
  'react-native': path.resolve(localNodeModules, 'react-native'),
  'react-native-web': path.resolve(localNodeModules, 'react-native-web'),
};
// En dev, les paquets du monorepo sont résolus sur leurs sources plutôt que sur leur `main`
// compilé. Sans ça, toute modification d'un composant exige un `npm run build` du workspace
// avant que Metro ne la voie : la boucle passe de 0,2 s à 8,2 s, et le fast refresh ne sert
// à rien puisqu'il ne surveille que des dist/ régénérés à la main.
// Activé uniquement par le script `start` : `expo export`, le job d'accessibilité et
// docs.yml continuent de consommer les dist/. Le build de la doc reste ainsi la seule
// vérification de bout en bout que les paquets publiés s'exécutent vraiment, ce que
// publint et attw ne couvrent pas (ils valident les métadonnées, pas l'exécution).
const liveSources = process.env.ALVEOLE_LIVE === '1';
const sourceEntries = {
  '@alveole/components': 'packages/components/src/index.ts',
  '@alveole/components/stories': 'packages/components/src/stories/index.ts',
  '@alveole/storybook': 'packages/storybook/src/index.ts',
  '@alveole/theme': 'packages/theme/src/index.ts',
  '@alveole/core': 'packages/core/src/index.ts',
};

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (liveSources && sourceEntries[moduleName]) {
    return { type: 'sourceFile', filePath: path.resolve(monorepoRoot, sourceEntries[moduleName]) };
  }

  const isCanonical = canonicalPackages.some(pkg => moduleName === pkg || moduleName.startsWith(`${pkg}/`));
  if (isCanonical) {
    return { type: 'sourceFile', filePath: require.resolve(moduleName, { paths: [projectRoot] }) };
  }
  return context.resolveRequest(context, moduleName, platform);
};

// Désactiver watchman (macOS Full Disk Access requis) — utiliser le watcher Node
process.env.WATCHMAN_DISABLE_CACHING = '1';
config.watcher = {
  watchman: {
    deferStates: [],
  },
  healthCheck: { enabled: false },
};

module.exports = config;
