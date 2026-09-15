// Import explicite de la variante web : `helpers/index.ts` réexporte `./render`, que
// TypeScript résout sur le helper natif, lequel n'a pas de notion de bureau.
import { renderOnDesktop, renderOnMobile } from '@/__tests__/helpers/render.web';
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

// Dans le tiroir mobile, titre et items partageaient exactement la meme police : 16/24 en
// graisse 500. Seule la couleur les separait, si bien qu'un titre se lisait comme une entree
// cliquable de plus. Il descend d'un cran de l'echelle, comme sur bureau.
test('efface le titre de groupe derriere ses items dans le tiroir mobile', () => {
  const { container } = renderOnMobile(<SidebarGroup title="core" />);

  expect(getComputedStyle(headingOf(container)!).fontSize).toBe('var(--typography-corps-de-texte-sm-bold-font-size)');
});

// Titre a 28 et items a 32 : quatre pixels, ni une indentation voulue ni un alignement. Le
// titre prenait `3V` la ou l'item prend `2W`. Ils partent desormais de la meme verticale,
// comme sur bureau.
test('aligne le titre de groupe sur ses items dans le tiroir mobile', () => {
  const { container } = renderOnMobile(<SidebarGroup title="core" />);

  expect(getComputedStyle(headingOf(container)!).paddingLeft).toBe('var(--spacing-2w)');
});

// Le titre faisait 52px de haut quand un item du tiroir en fait 56 : un libelle qui occupe la
// hauteur d'une cible tactile se lit comme cliquable, et coute cette hauteur a chaque groupe.
test('donne au titre de groupe mobile moins de hauteur qu-une cible tactile', () => {
  const { container } = renderOnMobile(<SidebarGroup title="core" />);

  const { paddingTop, paddingBottom } = getComputedStyle(headingOf(container)!);

  expect([paddingTop, paddingBottom]).toEqual(['var(--spacing-3v)', 'var(--spacing-3v)']);
});
