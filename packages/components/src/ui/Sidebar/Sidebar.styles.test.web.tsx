import { renderHookOnDesktop } from '@/__tests__/helpers/renderWeb';
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

// Le thème web rend ses décisions en variables CSS, que jsdom ne résout pas faute de moteur de
// rendu : on épingle donc le jeton, ce qui est de toute façon l'intention. Les tailles rendues,
// elles, se mesurent dans le navigateur (apps/docs/e2e/sidebar.spec.ts).
const styles = () => renderHookOnDesktop(() => useStyles()).result.current;

describe('le titre de groupe', () => {
  test('recule derrière ses items dans le gris de mention', () => {
    expect(styles().groupTitleDesktop.color).toBe('var(--text-mention-grey)');
  });

  test('respire autant au-dessus qu en dessous', () => {
    const { paddingTop, paddingBottom } = styles().groupTitleDesktop;

    expect(paddingBottom).toBe(paddingTop);
  });

  // La respiration symétrique du titre ne sépare plus les groupes entre eux : l'écart qui les
  // détache appartient au groupe, pas à son titre, sinon le titre flotte entre deux listes.
  test('laisse au groupe l écart qui le détache du précédent', () => {
    expect(styles().groupDesktop.marginTop).toBe('var(--spacing-1w)');
  });

  // Primer aligne titre de groupe et items sur la même verticale, au pixel. L'item y arrive par
  // trois retraits emboîtés, le titre par un seul : sans cette somme explicite, les deux dérivent.
  test('part de la verticale des libellés de ses items', () => {
    expect(styles().groupTitleDesktop.paddingLeft).toBe(28);
  });

  // Dans le tiroir mobile, titre et items partageaient exactement la même police : 16/24 en
  // graisse 500. Seule la couleur les séparait, si bien qu'un titre se lisait comme une entrée
  // cliquable de plus. Il descend d'un cran de l'échelle, comme sur bureau.
  test('descend d un cran sous ses items dans le tiroir mobile', () => {
    expect(styles().groupTitleMobile.fontSize).toBe('var(--typography-corps-de-texte-sm-bold-font-size)');
  });

  // Titre à 28 et items à 32 : quatre pixels, ni une indentation voulue ni un alignement.
  test('prend le retrait des items du tiroir mobile', () => {
    expect(styles().groupTitleMobile.paddingLeft).toBe(styles().sidebarItemMobile.paddingLeft);
  });

  // Le titre faisait 52px de haut quand un item du tiroir en fait 56 : un libellé qui occupe la
  // hauteur d'une cible tactile se lit comme cliquable, et coûte cette hauteur à chaque groupe.
  test('reste moins haut qu une cible tactile dans le tiroir mobile', () => {
    const { paddingTop, paddingBottom } = styles().groupTitleMobile;

    expect([paddingTop, paddingBottom]).toEqual(['var(--spacing-3v)', 'var(--spacing-3v)']);
  });
});

describe("l'item", () => {
  // La maquette, Primer et Atlassian s'accordent sur 14px : un item plus grand que ça écrase son
  // propre titre de groupe, qui n'a plus de marge pour reculer sans devenir illisible.
  test('se lit au corps de texte SM', () => {
    expect(styles().sidebarItemTitleDesktop.fontSize).toBe('var(--typography-corps-de-texte-sm-regular-font-size)');
  });

  // 32px de haut en tout, comme dans la maquette : 20 de hauteur de ligne plus 6 de part et d'autre.
  test('se retire de 6 de part et d autre de sa ligne', () => {
    const { paddingTop, paddingBottom } = styles().sidebarItemDesktop;

    expect([paddingTop, paddingBottom]).toEqual(['var(--spacing-1-5v)', 'var(--spacing-1-5v)']);
  });

  // L'item courant se signale par le fond, la graisse et le filet bleu : il n'a pas besoin de
  // grossir en plus, et grossir décalerait toute sa ligne par rapport à ses voisines.
  test('garde, courant, la taille de ses voisins', () => {
    expect(styles().sidebarItemTitleSelectedDesktop.fontSize).toBe(
      'var(--typography-corps-de-texte-sm-bold-font-size)',
    );
  });
});
