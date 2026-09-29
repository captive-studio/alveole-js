// `@ts-ignore` et `@ts-nocheck` éteignent le compilateur sans laisser de trace de ce qui est
// éteint : l'erreur masquée peut changer de nature sans que rien ne le signale. La règle les
// interdit et n'admet `@ts-expect-error` qu'accompagné d'une description, parce que celui-ci
// échoue dès que l'erreur attendue disparaît - il se périme tout seul, contrairement aux deux
// autres. Le seul `@ts-ignore` du dépôt masquait justement une déclaration devenue morte : React
// 19 a déplacé le namespace `JSX` vers `React.JSX`, et personne ne l'avait vu.
//
// `no-explicit-any` ferme la même porte par un autre côté : un `any` éteint le compilateur sur
// une valeur au lieu d'une ligne, et il se propage à tout ce qui la touche. Les 39 qu'avait
// `components` ont été retirés sans exemption ; la règle empêche le premier suivant.
//
// `consistent-type-assertions` ferme la dernière porte : un `as` affirme un type que le
// compilateur n'a pas prouvé. Les casts du dépôt ont été remplacés par des types qui disent vrai ;
// seuls restent ceux que TypeScript ne sait pas exprimer autrement, chacun isolé dans un fichier
// qui ne fait que ça et qui explique pourquoi. Ils sont exemptés ici, nommément, et nulle part
// ailleurs.
const castsAssumes = [
  'src/helpers/mapValues.ts',
  'src/helpers/cssVarTypography.ts',
  'src/helpers/deepMerge.ts',
  'src/core/styleNatif/versStyleNatif.ts',
  'src/core/styleTamagui/versStyleTamagui.ts',
];

/** @type {import('eslint').Linter.Config[]} */
const config = [
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/ban-ts-comment': [
        'error',
        { 'ts-expect-error': 'allow-with-description', 'ts-ignore': true, 'ts-nocheck': true, 'ts-check': false },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'never' }],
    },
  },
  { files: castsAssumes, rules: { '@typescript-eslint/consistent-type-assertions': 'off' } },
];

module.exports = config;
