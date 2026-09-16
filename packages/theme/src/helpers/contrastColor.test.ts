import { contrastRatio, withMinimumContrast } from './contrastColor';

const SURFACE_DU_CODE = '#F6F7F8';

describe('contrastRatio', () => {
  it('donne le rapport maximal entre le noir et le blanc', () => {
    expect(contrastRatio('#000000', '#FFFFFF')).toBe(21);
  });
});

describe('withMinimumContrast', () => {
  // Sur le web le theme rend des variables CSS, pas des couleurs : une valeur illisible
  // doit ressortir telle quelle. Rendre du noir a la place effacerait la coloration.
  it('rend la couleur inchangee quand le fond n est pas une couleur lisible', () => {
    expect(withMinimumContrast('#36ACAA', 'var(--background-alt-grey)', 4.5)).toBe('#36ACAA');
  });

  // Le turquoise des noms de proprietes de ghcolors plafonne a 2,56 sur notre surface.
  it('assombrit une couleur trop pale jusqu au seuil demande', () => {
    const corrigee = withMinimumContrast('#36ACAA', SURFACE_DU_CODE, 4.5);

    expect(contrastRatio(corrigee, SURFACE_DU_CODE)).toBeGreaterThanOrEqual(4.5);
  });
});
