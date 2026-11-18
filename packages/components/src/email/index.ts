// `@alveole/components/email` : les composants Alveole utilisables dans un mail. Un composant
// absent d'ici (Sheet, Dialog...) n'a pas de variante mail : l'importer fait echouer le typecheck.
export * from '../core/A/A.email';
export * from '../core/Heading/Heading.email';
export * from '../core/Typography/Typography.email';
export * from '../ui/Avatar/Avatar.email';
export * from '../ui/Button/Button.email';
export * from '../ui/Card/Card.email';
export * from './EmailLayout.email';
export * from './Preview.email';
export * from './render';
export * from './styles';
export * from './vars';
