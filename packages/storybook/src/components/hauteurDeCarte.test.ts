import { hauteurDeCarte } from './hauteurDeCarte';

// Sur mobile les fiches s'empilent : chaque carte prend la hauteur de son contenu.
it('laisse la carte a la hauteur de son contenu sur mobile', () => {
  expect(hauteurDeCarte(true)).toBeUndefined();
});

// Ailleurs les cartes d'une rangee s'etirent a la plus haute, pour que leurs bas s'alignent
// malgre des descriptions inegales.
it('etire la carte sur la hauteur de sa rangee ailleurs que sur mobile', () => {
  expect(hauteurDeCarte(false)).toBe('100%');
});
