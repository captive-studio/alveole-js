const eslintComments = require('@eslint-community/eslint-plugin-eslint-comments');

// Une règle ne se désactive plus à la ligne : elle se discute dans cette configuration, pour tout
// le monde à la fois. C'est le pendant de la fermeture du gel - une violation se corrige, ou bien
// la borne se rediscute ; elle ne se contourne pas en silence dans un coin du code. Sans cette
// règle, chaque exigence resserrée pouvait être annulée localement par la ligne qu'elle gênait,
// et l'ensemble du dispositif n'aurait été qu'une suggestion.
//
// Les huit directives que portait le dépôt ont été levées avant de poser la règle, et deux
// d'entre elles masquaient des défauts réels : un gestionnaire figé au premier rendu dans
// `useDepotFichier`, et deux fichiers de configuration que `no-undef` signalait à tort faute de
// globales CommonJS déclarées.
//
// `eslint-enable` et `eslint-env` restent admis : le premier est sans objet en l'absence de
// `eslint-disable`, le second ne désactive aucune règle.
/** @type {import('eslint').Linter.Config} */
const config = {
  files: ['**/*.{ts,tsx,js,jsx,mjs,cjs}'],
  plugins: { 'eslint-comments': eslintComments },
  rules: {
    'eslint-comments/no-use': ['error', { allow: ['eslint-enable', 'eslint-env'] }],
  },
};

module.exports = config;
