// Preset web et non natif : le catalogue est une application web, et c'est aussi ce qui
// permet de le rendre sans module natif. Les paquets qui publient une variante web la
// voient choisie ici, là où le preset iOS exigerait un binaire absent de tout test.
const webPreset = require('jest-expo/web/jest-preset');

const ignoredPaths = ['/node_modules/', '/dist/'];

// La chaîne de coloration syntaxique de `Highlight` est publiée en ESM, et le catalogue la
// rend dès qu'il affiche la source d'un exemple. Sans transformation, tout test qui rend une
// fiche casse à l'import. Même liste que dans `@alveole/components`, pour la même raison.
const transformIgnorePatterns = [
  'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|@testing-library/react-native|@tamagui/.*|tamagui|lottie-react-native|@lottiefiles/.*|pdfjs-dist|react-native-maps|react-native-signature-canvas|react-native-webview|react-native-svg|standard-navigation|react-syntax-highlighter|highlight.js|lowlight|refractor|hastscript|property-information|space-separated-tokens|comma-separated-tokens|character-[a-z-]+|parse-entities|stringify-entities|decode-named-character-reference|is-[a-z-]+|web-namespaces|zwitch|html-void-elements|devlop|ccount|bail|trough|unified|vfile[a-z-]*|unist-util-[a-z-]+|hast-util-[a-z-]+|react-markdown|remark-[a-z-]+|rehype-[a-z-]+|micromark[a-z-]*|mdast-util-[a-z-]+|estree-util-[a-z-]+|html-url-attributes|trim-lines|style-to-[a-z]+|inline-style-parser|markdown-table|longest-streak|escape-string-regexp)',
];

// Les paquets du dépôt sont résolus sur leurs sources, pas sur leur `dist` : les tests
// portent sur ce qu'on modifie. React et react-native sont canonicalisés sur une seule copie,
// sans quoi des instances dupliquées cassent les hooks.
const moduleNameMapper = {
  '^@alveole/core$': '<rootDir>/../core/src/index.ts',
  '^@alveole/theme$': '<rootDir>/../theme/src/index.ts',
  '^@alveole/components$': '<rootDir>/../components/src/index.ts',
  '^react$': require.resolve('react'),
  '^react-dom$': require.resolve('react-dom'),
  '^(react-native-webview|@shopify/flash-list|expo-router/head)$': '<rootDir>/__tests__/stubs/nativeModule.js',
  '^react-native-keyboard-controller$': '<rootDir>/__tests__/stubs/passthrough.js',
  '^@/assets/(.*)$': '<rootDir>/__tests__/stubs/asset.js',
  '\\.css$': '<rootDir>/__tests__/stubs/style.js',
};

// `watchPlugins` vient du preset Expo mais n'est pas une option de projet : Jest la refuse
// avec un avertissement de validation à chaque exécution.
const { watchPlugins, ...webRest } = webPreset;

/** @type {import('jest').Config} */
module.exports = {
  projects: [
    // Les fonctions pures du catalogue : navigation, utilitaires. Aucun rendu, donc aucun
    // preset de plateforme à payer.
    {
      displayName: 'node',
      testEnvironment: 'node',
      testMatch: ['**/?(*.)+(spec|test).[tj]s'],
      testPathIgnorePatterns: ignoredPaths,
      cacheDirectory: '<rootDir>/.jest-cache',
    },
    // Les écrans du catalogue, rendus pour de vrai. Le découpage se fait sur l'extension :
    // `.test.ts` pour le pur, `.test.tsx` pour ce qui rend.
    {
      ...webRest,
      displayName: 'render',
      testMatch: ['**/?(*.)+(spec|test).tsx'],
      testPathIgnorePatterns: [...(webPreset.testPathIgnorePatterns ?? []), ...ignoredPaths],
      cacheDirectory: '<rootDir>/.jest-cache',
      setupFilesAfterEnv: [...(webPreset.setupFilesAfterEnv ?? []), '<rootDir>/__tests__/setup.js'],
      transformIgnorePatterns,
      moduleNameMapper: { ...(webPreset.moduleNameMapper ?? {}), ...moduleNameMapper },
    },
  ],

  watchman: false,
  collectCoverage: false,

  // Seuils en cliquet : ils valent la couverture mesurée au moment où ils ont été posés,
  // arrondie à l'entier inférieur. Ils ne sont pas un objectif de qualité mais un garde-fou
  // contre l'érosion : une modification qui ajoute du code non testé fait baisser le taux
  // et échoue. Les relever après avoir gagné de la couverture fait partie du travail ;
  // les baisser demande une raison explicite.
  //
  // Ils se posent à la racine et non dans `projects` : la couverture est agrégée sur les deux
  // projets, et un seuil par projet ne verrait chacun que la moitié du catalogue.
  coverageThreshold: {
    global: {
      statements: 31,
      branches: 20,
      functions: 30,
      lines: 31,
    },
  },
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.test.*', '!src/**/index.ts'],
};
