const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// `watchFolders` et `nodeModulesPaths` ne sont pas déclarés : depuis le SDK 52, expo/metro-config
// les déduit seul du monorepo (racine + chaque workspace déclaré dans `workspaces`). Les valeurs
// écrites à la main ici étaient soit identiques au défaut (`nodeModulesPaths`), soit plus larges
// pour 41 fichiers sur 107 949 (`watchFolders` sur la racine) : aucun gain, et une dérive garantie
// à chaque workspace ajouté.

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

// Le crawl remonte tout ce qui vit sous un workspace, y compris les répertoires que seuls nos
// outils produisent : `packages/components/.jest-cache` pèse à lui seul ~94 000 fichiers en local.
// Metro applique `blockList` dès la phase de crawl, donc les exclure les retire de l'inventaire
// au lieu de simplement les rendre non résolvables. Limité aux workspaces : un `coverage/` niché
// dans node_modules peut être du code légitime.
const generatedDirs = ['\\.jest-cache', 'coverage'];
const workspacesPrefix = path.join(monorepoRoot, 'packages').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
config.resolver.blockList = [
  ...config.resolver.blockList,
  new RegExp(`^${workspacesPrefix}[\\\\/][^\\\\/]+[\\\\/](?:${generatedDirs.join('|')})[\\\\/]`),
];

// Watchman n'est pas utilisé : expo/metro-config force déjà `resolver.useWatchman = null` pour
// éviter le codepath "native find". Ne pas réassigner `config.watcher` en entier : cela écrasait
// `unstable_lazySha1` et `unstable_autoSaveCache`, deux optimisations de crawl activées par défaut.

module.exports = config;
