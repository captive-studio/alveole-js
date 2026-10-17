// Depuis Tamagui v2, jsdom résout `tamagui` et `@tamagui/*` par leur condition `browser`, qui
// pointe vers `dist/esm/*.mjs`. Le transform Babel des presets jest-expo ne couvre que
// `.[jt]sx?` : sans `.mjs`, toute suite web casse à l'import sur « Cannot use import statement
// outside a module ». Neutre en v1, qui ne publie pas de `.mjs` résolu par jsdom.
const JS_PATTERN = '\\.[jt]sx?$';
const JS_AND_MJS_PATTERN = '\\.m?[jt]sx?$';

const withMjsTransform = ({ [JS_PATTERN]: babelTransform, ...otherTransforms }) => {
  if (!babelTransform) throw new Error(`Le preset n'a plus de transform sous ${JS_PATTERN}`);
  return { ...otherTransforms, [JS_AND_MJS_PATTERN]: babelTransform };
};

module.exports = { withMjsTransform };
