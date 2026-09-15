// Import explicite de la variante web : `helpers/index.ts` réexporte `./render`, que
// TypeScript résout sur le helper natif, lequel n'a pas de notion de bureau.
import { renderOnDesktop } from '@/__tests__/helpers/render.web';
import { Sidebar } from './Sidebar';

test("n'affiche pas d'en-tête quand la barre latérale n'a pas de logo", () => {
  const { container } = renderOnDesktop(<Sidebar logo={null} />);

  expect(container.querySelector('sidebar-header')).toBeNull();
});
