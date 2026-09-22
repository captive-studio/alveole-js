// `max-lines` repère un fichier qui porte plusieurs responsabilités. Un catalogue de données
// n'en porte qu'une : il est dense, pas complexe. Le découper pour passer sous la borne
// gonflerait le nombre de fichiers sans rien découpler, ce qui est proscrit ici.
//
// L'exemption est énumérée et non déduite d'un motif large comme `**/constants/**` : une
// exemption qui ne peut pas s'élargir toute seule est une exemption qu'on peut laisser vivre.
// Les deux catalogues de tokens sont nommés un par un ; les stories et les jeux de démonstration
// sont déjà exclus de la même façon par `.jscpd.json` et par les `collectCoverageFrom` de Jest,
// et cette règle les aligne sur les deux autres dispositifs plutôt que de diverger.
//
// Les autres exigences continuent de s'appliquer à ces fichiers : seule la taille est levée.
/** @type {import('eslint').Linter.Config} */
const config = {
  files: ['**/*.stories.tsx', '**/*.demo.*', '**/src/constants/Color.ts', '**/src/constants/Palette.ts'],
  rules: {
    'max-lines': 'off',
  },
};

module.exports = config;
