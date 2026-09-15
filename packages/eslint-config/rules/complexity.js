// Garde-fou de complexité, posé au niveau visé et non au niveau constaté. La dette
// existante est gelée dans le fichier `eslint-suppressions.json` de chaque workspace
// (`eslint . --suppress-all`), versionné : il ne peut que rétrécir. Toute nouvelle
// violation, y compris dans un fichier déjà en dette, fait échouer le lint. Une fois
// un fichier assaini, `eslint . --prune-suppressions` retire son entrée.
//
// Les lignes blanches et les commentaires sont exclus des comptages : une fonction ne
// devient pas complexe parce qu'elle est documentée.
/** @type {import('eslint').Linter.Config} */
const config = {
  files: ['**/*.{ts,tsx}'],
  rules: {
    // 10 est le seuil SonarQube par défaut : au-delà, le nombre de chemins d'exécution
    // d'une fonction dépasse ce qu'un test unitaire couvre raisonnablement.
    complexity: ['error', { max: 10 }],
    // Au-delà de trois niveaux d'imbrication, le lecteur ne tient plus les conditions
    // actives en tête. Le remède est l'early return ou l'extraction, jamais l'accolade.
    'max-depth': ['error', { max: 3 }],
    // Quatre paramètres positionnels, c'est déjà un objet qui s'ignore. Le seuil est
    // atteint aujourd'hui sans dette à geler.
    'max-params': ['error', { max: 4 }],
    // Une fonction qui ne tient pas sur un écran fait plusieurs choses.
    'max-lines-per-function': ['error', { max: 60, skipBlankLines: true, skipComments: true }],
    // Même logique au niveau du fichier : au-delà, il porte plusieurs responsabilités.
    'max-lines': ['error', { max: 300, skipBlankLines: true, skipComments: true }],
  },
};

module.exports = config;
