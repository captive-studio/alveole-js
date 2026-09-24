import { darken } from './darkenColor';

describe('darken', () => {
  it('retire la meme part de lumiere a chaque canal', () => {
    expect(darken('#336699', 0.1)).toBe('#194c7f');
  });

  it('plafonne chaque canal au noir', () => {
    expect(darken('#369', 0.5)).toBe('#000019');
  });

  it('refuse une couleur qui n est pas hexadecimale', () => {
    expect(() => darken('#12345', 0.1)).toThrow('Invalid hex color');
  });
});
