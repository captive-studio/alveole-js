// `babel-preset-expo` détecte expo-router via un `require.resolve` relatif à son propre
// emplacement dans node_modules. Dans ce monorepo, babel-preset-expo est hoisté à la racine
// alors qu'expo-router reste imbriqué dans apps/docs/node_modules : la détection échoue et
// `process.env.EXPO_ROUTER_APP_ROOT` n'est jamais inliné. On active donc le plugin explicitement.
// Le chemin interne du fichier a bougé entre les versions de babel-preset-expo
// (build/expo-router-plugin.js -> build/plugins/expo-router-plugin.js en v56) : on essaie
// les deux pour survivre aux prochaines réorganisations internes du paquet.
const { expoRouterBabelPlugin } = (() => {
  try {
    return require('babel-preset-expo/build/plugins/expo-router-plugin');
  } catch {
    return require('babel-preset-expo/build/expo-router-plugin');
  }
})();

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [expoRouterBabelPlugin],
  };
};
