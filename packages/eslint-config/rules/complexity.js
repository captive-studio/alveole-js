// Garde-fou de complexité, posé au niveau visé et non au niveau constaté. La dette
// existante est gelée dans le fichier `eslint-suppressions.json` de chaque workspace
// (`eslint . --suppress-all`), versionné : il ne peut que rétrécir. Toute nouvelle
// violation, y compris dans un fichier déjà en dette, fait échouer le lint. Une fois
// un fichier assaini, `eslint . --prune-suppressions` retire son entrée.
//
// 10 est le seuil SonarQube par défaut : au-delà, le nombre de chemins d'exécution
// d'une fonction dépasse ce qu'un test unitaire couvre raisonnablement.
/** @type {import('eslint').Linter.Config} */
const config = {
  files: ['**/*.{ts,tsx}'],
  rules: {
    complexity: ['error', { max: 10 }],
  },
};

module.exports = config;
