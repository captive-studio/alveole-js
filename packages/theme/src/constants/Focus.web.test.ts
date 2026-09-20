import { Colors } from './Color';
import { focusBorder, focusRing, FocusRingMetrics } from './Focus';

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

  // Ce qui survit a l'amendement de l'ADR 0016 : rien ne doit pousser la mise en page. Le
  // contour est admis parce qu'il est encastre (cf. le test de l'ecart), l'ombre ne l'est pas -
  // un `boxShadow` deborde au-dela du cadre et redonnerait le double cadre que l'ADR 0012
  // supprime. L'epaisseur de bordure, elle, reste celle du repos.
  it('ne pose rien qui deborde du cadre du champ', () => {
    expect(Object.keys(focusBorder())).not.toContain('boxShadow');
  });
});

// Une seule couleur de focus dans le kit. `focusRing` sert les composants batis sur Tamagui,
// qui injecte sa propre regle `:focus-visible` en `!important` derriere `:root:root:root:root`
// : aucune feuille de style ne peut la battre, seule sa prop `focusVisibleStyle` le peut. Les
// deux chemins doivent donc peindre le meme bleu, faute de quoi une case a cocher et un bouton
// focalises cote a cote ne sont pas de la meme couleur.
it('peint le meme bleu que la bordure de focus des champs', () => {
  expect(focusRing('default').outlineColor).toBe(focusBorder().borderColor);
});

// Amendement de l'ADR 0016. Le trait recolore de 1 px etait le seul marqueur de focus des
// champs : depuis que le reste du kit porte une bague nette de 2 px, le champ etait devenu le
// point faible visuel de l'ensemble. Primer fait les deux sur son `TextInputWrapper` :
// `border-color: accent` ET `outline: 2px solid accent` avec `outline-offset: -1px`.
//
// L'anneau est encastre, donc le motif d'origine de l'ADR 0016 - ne pas decaler la mise en
// page d'un pixel au focus - tient toujours : un contour interieur ne pousse rien.
it('encastre un anneau dans le champ, en plus du trait recolore', () => {
  expect(focusBorder().outlineOffset).toBe(FocusRingMetrics.insetOffset);
});
