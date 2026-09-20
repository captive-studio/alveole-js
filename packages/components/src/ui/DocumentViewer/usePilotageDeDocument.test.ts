import { rotationSuivante } from './usePilotageDeDocument';

describe('rotationSuivante', () => {
  it('tourne vers la droite par quarts de tour', () => {
    expect(rotationSuivante(0, 'right')).toBe(90);
  });

  it('boucle a zero une fois le tour complet vers la droite', () => {
    expect(rotationSuivante(270, 'right')).toBe(0);
  });

  it('tourne vers la gauche par quarts de tour', () => {
    expect(rotationSuivante(180, 'left')).toBe(90);
  });

  it('boucle a 270 en passant sous zero vers la gauche', () => {
    expect(rotationSuivante(0, 'left')).toBe(270);
  });
});
