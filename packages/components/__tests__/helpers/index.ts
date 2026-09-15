// Réservé aux tests natifs. Un test `.test.web.tsx` doit importer
// `@/__tests__/helpers/render.web` : Jest résout les extensions de plateforme, TypeScript
// non. Passer par ce baril depuis un test web lui donne donc le rendu web à l'exécution
// et les types de React Native à la compilation, et le typecheck casse dès qu'on touche
// au DOM (`container`, `getByAltText`, `getAttribute`…).
export * from './render';
