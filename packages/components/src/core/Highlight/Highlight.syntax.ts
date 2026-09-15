/// <reference path="./jsdoc.d.ts" />
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css';
import cssExtras from 'react-syntax-highlighter/dist/esm/languages/prism/css-extras';
import graphql from 'react-syntax-highlighter/dist/esm/languages/prism/graphql';
import javadoclike from 'react-syntax-highlighter/dist/esm/languages/prism/javadoclike';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import jsExtras from 'react-syntax-highlighter/dist/esm/languages/prism/js-extras';
import jsTemplates from 'react-syntax-highlighter/dist/esm/languages/prism/js-templates';
import jsdoc from 'react-syntax-highlighter/dist/esm/languages/prism/jsdoc';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import markdown from 'react-syntax-highlighter/dist/esm/languages/prism/markdown';
import markup from 'react-syntax-highlighter/dist/esm/languages/prism/markup';
import regex from 'react-syntax-highlighter/dist/esm/languages/prism/regex';
import ruby from 'react-syntax-highlighter/dist/esm/languages/prism/ruby';
import sql from 'react-syntax-highlighter/dist/esm/languages/prism/sql';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import yaml from 'react-syntax-highlighter/dist/esm/languages/prism/yaml';
import Prism from 'react-syntax-highlighter/dist/esm/prism-light';

// L'entrée complète importe tous les langages. Conserver ceux de Highlight et
// leurs compléments : HTML embarque CSS/JS, et TS/TSX utilisent regex et JSDoc.
// Les templates JS peuvent aussi contenir SQL, GraphQL et Markdown.
// L'ordre suit le moteur complet : TypeScript copie la grammaire JavaScript,
// qui doit déjà contenir les commentaires de documentation et les templates.
for (const [name, grammar] of [
  ['markup', markup],
  ['css', css],
  ['regex', regex],
  ['javascript', javascript],
  ['bash', bash],
  ['sql', sql],
  ['yaml', yaml],
  ['markdown', markdown],
  ['ruby', ruby],
  ['css-extras', cssExtras],
  ['json', json],
  ['graphql', graphql],
  ['javadoclike', javadoclike],
  ['js-templates', jsTemplates],
  ['typescript', typescript],
  ['jsdoc', jsdoc],
  ['js-extras', jsExtras],
  ['tsx', tsx],
] as const) {
  Prism.registerLanguage(name, grammar);
}

export default Prism;
