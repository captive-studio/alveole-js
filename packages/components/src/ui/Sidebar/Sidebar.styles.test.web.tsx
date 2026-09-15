// Import explicite de la variante web : `helpers/index.ts` réexporte `./render`, que
// TypeScript résout sur le helper natif, lequel n'a pas de notion de bureau.
import { renderHookOnDesktop } from '@/__tests__/helpers/render.web';
import { useStyles } from './Sidebar.styles';

// La ligne courante est un lien comme ses voisines, et se survole comme elles : un seul style
// de survol, aucun cas particulier. Encore faut-il qu'il se distingue de son fond de repos,
// sans quoi le survol du lien ne confirme rien - c'était le cas quand les deux valaient le même
// gris. Primer allège la ligne courante au survol, Atlassian l'approfondit ; aucun des deux ne
// la laisse inerte.
test('distingue le survol du fond de repos de la ligne courante', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  expect(result.current.sidebarItemHover.backgroundColor).not.toBe(
    result.current.sidebarItemSelectedDesktop.backgroundColor,
  );
});
