// Import explicite de la variante web : `helpers/index.ts` réexporte `./render`, que
// TypeScript résout sur le helper natif, lequel n'a pas de notion de bureau.
import { renderOnDesktop } from '@/__tests__/helpers/render.web';
import { SidebarItem } from './SidebarItem';

const titleOf = (container: HTMLElement) => container.querySelector('sidebar-item typography');

// La maquette, Primer et Atlassian s'accordent sur 14px : un item plus grand que ça écrase son
// propre titre de groupe, qui n'a plus de marge pour reculer sans devenir illisible.
//
// Le thème web rend sa typographie en variables CSS, que jsdom ne résout pas faute de moteur de
// rendu : on épingle donc le jeton, ce qui est de toute façon l'intention.
test('rend les items de niveau 2 au corps de texte SM', () => {
  const { container } = renderOnDesktop(<SidebarItem title="Button" href="/components/Button" />);

  expect(getComputedStyle(titleOf(container)!).fontSize).toBe('var(--typography-corps-de-texte-sm-regular-font-size)');
});

// 32px de haut en tout, comme dans la maquette : 20 de hauteur de ligne plus 6 de part et
// d'autre. jsdom ne calcule pas de mise en page, donc on épingle le retrait qui la produit.
test('rend un item de 32px de haut', () => {
  const { container } = renderOnDesktop(<SidebarItem title="Button" href="/components/Button" />);

  const { paddingTop, paddingBottom } = getComputedStyle(container.querySelector('sidebar-item')!);

  expect([paddingTop, paddingBottom]).toEqual(['var(--spacing-1-5v)', 'var(--spacing-1-5v)']);
});

// C'est l'icône, et non le libellé, qui fixerait la hauteur de la ligne : en `md` elle mesure
// 24 et rendrait l'item à 36px là où la maquette le veut à 32. D'où `sm`, soit 16, comme dans
// le noeud Figma.
test("rend l'icône d'un item en 16px", () => {
  const { container } = renderOnDesktop(<SidebarItem title="Accueil" icon="House" href="/x" />);

  expect(container.querySelector('sidebar-item svg')?.getAttribute('width')).toBe('16');
});

// L'item courant se signale par le fond, la graisse et le filet bleu : il n'a pas besoin de
// grossir en plus, et grossir décalerait toute sa ligne par rapport à ses voisines.
test('garde litem courant à la taille de ses voisins', () => {
  const { container } = renderOnDesktop(<SidebarItem title="Accueil" href="/" />);

  expect(getComputedStyle(titleOf(container)!).fontSize).toBe('var(--typography-corps-de-texte-sm-bold-font-size)');
});
