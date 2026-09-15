const sonarjs = require('eslint-plugin-sonarjs');

// Les règles natives d'ESLint mesurent la complexité cyclomatique et la taille : elles ne
// voient ni la duplication ni la charge de lecture réelle. Ce sous-ensemble de SonarJS
// complète les deux angles manquants. Il est volontairement restreint : le preset
// `recommended` du plugin porte des centaines de règles de style qui recouvrent déjà
// eslint-config-expo et n'ont rien à voir avec la qualité structurelle.
//
// Même cliquet que les règles natives : seuils au niveau visé, dette gelée dans le
// `eslint-suppressions.json` de chaque workspace.
/** @type {import('eslint').Linter.Config} */
const config = {
  files: ['**/*.{ts,tsx}'],
  plugins: { sonarjs },
  rules: {
    // La complexité cognitive compte ce qui coûte au lecteur, pas les chemins d'exécution :
    // l'imbrication pèse, une suite de ternaires plats ne pèse pas. Sur du JSX elle décrit
    // mieux la réalité que la complexité cyclomatique, qui punit le rendu conditionnel.
    'sonarjs/cognitive-complexity': ['error', 15],
    // L'équivalent du Flay : deux fonctions identiques, deux branches identiques.
    'sonarjs/no-identical-functions': 'error',
    'sonarjs/no-duplicated-branches': 'error',
    'sonarjs/no-all-duplicated-branches': 'error',
    'sonarjs/no-identical-expressions': 'error',
  },
};

module.exports = config;
