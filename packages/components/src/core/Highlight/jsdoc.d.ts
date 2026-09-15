// Les types amont déclarent cette grammaire pour CommonJS, mais omettent
// son entrée ESM. Les deux fichiers exportent la même grammaire.
declare module 'react-syntax-highlighter/dist/esm/languages/prism/jsdoc' {
  export { default } from 'react-syntax-highlighter/dist/cjs/languages/prism/jsdoc';
}
