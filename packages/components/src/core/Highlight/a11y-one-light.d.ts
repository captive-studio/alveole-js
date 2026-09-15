// `@types/react-syntax-highlighter` ne déclare que l'index des thèmes Prism, et cet index
// ne ré-exporte pas `a11yOneLight`. Le thème n'est donc atteignable que par son fichier,
// qui n'a aucune déclaration : celle-ci lui donne la même forme que les thèmes déclarés.
declare module 'react-syntax-highlighter/dist/esm/styles/prism/a11y-one-light.js' {
  import { CSSProperties } from 'react';

  const style: Record<string, CSSProperties>;

  export default style;
}
