// Les imports CSS à effet de bord (`import './global.css'`) sont résolus par Metro et par
// le bundler web, jamais par TypeScript, qui ne connaît pas l'extension et refuse l'import.
declare module '*.css';
