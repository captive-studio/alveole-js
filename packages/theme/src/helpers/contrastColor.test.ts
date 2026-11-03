import { contrastRatio, withMinimumContrast } from './contrastColor';

const SURFACE_DU_CODE = '#F6F7F8';

describe('contrastRatio', () => {
  afterEach(() => jest.restoreAllMocks());

  it('donne le rapport maximal entre le noir et le blanc', () => {
    expect(contrastRatio('#000000', '#FFFFFF')).toBe(21);
  });

  // Sur le web, `useTheme()` rend des variables CSS : le rapport vaudrait NaN sans un mot.
  it('signale en developpement une couleur qu il ne sait pas lire', () => {
    const avertissement = jest.spyOn(console, 'warn').mockImplementation(() => {});

    contrastRatio('var(--text-title-grey)', '#FFFFFF');

    expect(avertissement).toHaveBeenCalledWith('Warning:', expect.stringContaining('var(--text-title-grey)'));
  });

  // Une app en production ne doit rien journaliser, meme pour une couleur illisible.
  it('reste muet hors developpement', () => {
    const avertissement = jest.spyOn(console, 'warn').mockImplementation(() => {});
    globalThis.__DEV__ = false;

    try {
      contrastRatio('var(--text-title-grey)', '#FFFFFF');
    } finally {
      globalThis.__DEV__ = true;
    }

    expect(avertissement).not.toHaveBeenCalled();
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
