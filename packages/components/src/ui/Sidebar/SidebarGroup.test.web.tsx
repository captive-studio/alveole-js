// Import explicite de la variante web : `helpers/index.ts` réexporte `./render`, que
// TypeScript résout sur le helper natif, lequel n'a pas de notion de bureau.
import { renderOnDesktop } from '@/__tests__/helpers/render.web';
import { SidebarGroup } from './SidebarGroup';

const headingOf = (container: HTMLElement) => container.querySelector('sidebar-group typography');

// Le thème web rend ses décisions de couleur en variables CSS, que jsdom ne résout pas faute
// de moteur de rendu : on épingle donc le jeton, ce qui est de toute façon l'intention.
test('efface le titre de groupe derrière ses items en le rendant dans le gris de mention', () => {
  const { container } = renderOnDesktop(<SidebarGroup title="core" />);

  expect(getComputedStyle(headingOf(container)!).color).toBe('var(--text-mention-grey)');
});

test('fait respirer le titre de groupe autant au-dessus quen dessous', () => {
  const { container } = renderOnDesktop(<SidebarGroup title="core" />);

  const { paddingTop, paddingBottom } = getComputedStyle(headingOf(container)!);

  expect(paddingBottom).toBe(paddingTop);
});

// La respiration symétrique du titre ne sépare plus les groupes entre eux : l'écart qui les
// détache appartient au groupe, pas à son titre, sinon le titre flotte entre deux listes.
test('détache chaque groupe de celui qui le précède', () => {
  const { container } = renderOnDesktop(<SidebarGroup title="core" />);

  expect(getComputedStyle(container.querySelector('sidebar-group')!).marginTop).not.toBe('');
});

// Primer aligne titre de groupe et items sur la même verticale, au pixel. L'item y arrive par
// trois retraits emboîtés, le titre par un seul : sans cette somme explicite, les deux dérivent.
test('aligne le titre de groupe sur la verticale des libellés de ses items', () => {
  const { container } = renderOnDesktop(<SidebarGroup title="core" />);

  expect(getComputedStyle(headingOf(container)!).paddingLeft).toBe('28px');
});
