import { Colors } from './Color';
import { focusBorder, focusRing } from './Focus';

jest.mock('react-native', () => ({ Platform: { OS: 'ios' } }));

describe('focusRing hors du web', () => {
  // outlineWidth n'existe pas sur iOS, cf. UnsupportedCSSProperties : poser la propriete
  // n'aurait aucun effet, autant ne rien emettre.
  it('ne pose aucun contour', () => {
    expect(focusRing('default').outlineWidth).toBeUndefined();
  });
});

// La bordure ne depend pas de la plateforme, contrairement a l'anneau : les memes valeurs
// sont attendues ici que sur le web, et c'est ce qui donne le meme etat visuel partout.
describe('focusBorder hors du web', () => {
  it('conserve l epaisseur de bordure du repos', () => {
    expect(focusBorder().borderWidth).toBe(1);
  });

  it('colore la bordure avec le token de focus', () => {
    expect(focusBorder().borderColor).toBe(Colors.Focus[525]);
  });

  it('n ajoute ni contour ni ombre autour du champ', () => {
    expect(Object.keys(focusBorder())).toEqual(['borderWidth', 'borderColor']);
  });
});
