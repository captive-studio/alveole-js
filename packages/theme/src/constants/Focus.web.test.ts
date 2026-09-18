import { Colors } from './Color';
import { focusBorder, focusRing } from './Focus';

jest.mock('react-native', () => ({ Platform: { OS: 'web' } }));

describe('focusRing sur le web', () => {
  it('rend un anneau visible', () => {
    expect(focusRing('default').outlineWidth).toBeGreaterThan(0);
  });

  it('contraste l anneau differemment sur un fond plein', () => {
    expect(focusRing('emphasis').outlineColor).not.toBe(focusRing('default').outlineColor);
  });

  // Sans outlineStyle, la valeur CSS par defaut est `none` : largeur et couleur ne
  // dessinent rien du tout.
  it('precise un style de contour, sinon rien ne s affiche', () => {
    expect(focusRing('default').outlineStyle).toBe('solid');
  });

  it('ecarte l anneau du bouton pour le detacher du fond', () => {
    expect(focusRing('default').outlineOffset).toBeGreaterThan(0);
  });
});

describe('focusBorder sur le web', () => {
  // 1 px au repos comme au focus : une bordure qui s'epaissit pousserait le contenu du
  // champ d'un pixel a chaque fois que le curseur y entre.
  it('conserve l epaisseur de bordure du repos', () => {
    expect(focusBorder().borderWidth).toBe(1);
  });

  it('colore la bordure avec le token de focus', () => {
    expect(focusBorder().borderColor).toBe(Colors.Focus[525]);
  });

  // L'absence est la definition : la bordure remplace l'anneau, elle ne s'y ajoute pas.
  // Une propriete de contour ou d'ombre qui reapparaitrait ici redonnerait le double cadre
  // que l'ADR 0012 supprime.
  it('n ajoute ni contour ni ombre autour du champ', () => {
    expect(Object.keys(focusBorder())).toEqual(['borderWidth', 'borderColor']);
  });
});
