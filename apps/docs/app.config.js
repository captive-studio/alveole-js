// Le rendu statique pré-rend les 75 pages de composants, ce qui fait passer `expo export`
// de 3,6 s à 12,2 s et le dist de 15 Mo à 339 Mo (mesuré en local, cache Metro chaud).
// C'est ce qu'on veut pour le site publié : référencement et premier affichage. Mais
// l'audit d'accessibilité, lui, attend l'hydratation client avant de scanner (voir
// e2e/audit.ts) : il ne regarde jamais le HTML pré-rendu, qui ne contient d'ailleurs que
// 0,06 Mo de DOM sur les 2,77 Mo d'une page, le reste étant du CSS. Le job de CI construit
// donc en SPA, sans rien perdre de ce qu'il vérifie. En développement sur les sources,
// on évite aussi le bundle serveur et le pré-rendu à chaque démarrage. DOCS_OUTPUT=static
// permet toujours de tester ce rendu explicitement ; les exports restent statiques par défaut.
module.exports = ({ config }) => ({
  ...config,
  web: { ...config.web, output: process.env.DOCS_OUTPUT ?? (process.env.ALVEOLE_LIVE === '1' ? 'single' : 'static') },
});
