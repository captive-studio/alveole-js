// `no-require-imports` interdit `require()` parce qu'il échappe au graphe de modules : le
// bundler ne peut ni le suivre, ni le secouer. Deux endroits en dépendent justement pour cette
// raison, et l'exemption est énumérée fichier par fichier, comme celle des catalogues : une
// exemption qui ne peut pas s'élargir toute seule est une exemption qu'on peut laisser vivre.
//
// - `useAppUpdateCheck` sonde `expo-in-app-updates`, qui est optionnel. Un `import` statique
//   lèverait au chargement du module dans les applications qui ne l'installent pas.
// - `MarkdownDescription` charge `react-markdown` et `remark-gfm` après son early return
//   `Platform.OS !== 'web'`. Un `import` statique embarquerait toute la chaîne `remark` /
//   `micromark` dans le bundle natif, qui ne s'en sert jamais.
//
// La sortie par le haut serait `import()`, mais elle rend les deux chargements asynchrones et
// change la signature des composants : c'est une refonte, pas un nettoyage. À rouvrir si l'un
// des deux appelants devient asynchrone pour une autre raison.
/** @type {import('eslint').Linter.Config} */
const config = {
  files: [
    '**/src/core/AppUpdateProvider/useAppUpdateCheck.ts',
    '**/src/core/MarkdownDescription/MarkdownDescription.tsx',
  ],
  rules: {
    '@typescript-eslint/no-require-imports': 'off',
  },
};

module.exports = config;
