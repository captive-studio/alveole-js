// Les fichiers de configuration d'outils (`jest.config.js`, `metro.config.js`…) sont chargés par
// Node en CommonJS, pas par le bundler. Sans cette déclaration, `no-undef` signale `__dirname`,
// `module` et `require` comme des variables inconnues, et chaque fichier de configuration doit
// alors porter un `eslint-disable`. C'était la configuration d'ESLint qui était fausse, pas le
// code, et ces directives ont disparu d'elles-mêmes une fois la déclaration posée.
/** @type {import('eslint').Linter.Config} */
const config = {
  files: ['**/*.config.js', '**/*.config.cjs'],
  languageOptions: {
    sourceType: 'commonjs',
    globals: {
      __dirname: 'readonly',
      __filename: 'readonly',
      module: 'writable',
      exports: 'writable',
      require: 'readonly',
      process: 'readonly',
    },
  },
};

module.exports = config;
