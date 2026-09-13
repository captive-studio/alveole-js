import { focusRing } from './Focus';

jest.mock('react-native', () => ({ Platform: { OS: 'ios' } }));

describe('focusRing hors du web', () => {
  // outlineWidth n'existe pas sur iOS, cf. UnsupportedCSSProperties : poser la propriete
  // n'aurait aucun effet, autant ne rien emettre.
  it('ne pose aucun contour', () => {
    expect(focusRing('default').outlineWidth).toBeUndefined();
  });
});
