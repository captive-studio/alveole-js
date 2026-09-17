import { largeurDeColonne } from './colonnesDeFiches';

// La grille suit les paliers du catalogue et non la largeur exacte : trois colonnes au bureau,
// deux sur une tablette, une seule sur un telephone.
it('donne trois colonnes a partir de 1200 px', () => {
  expect(largeurDeColonne(1200)).toBe('calc((100% - 32px) / 3)');
});

it('donne deux colonnes a partir de 768 px', () => {
  expect(largeurDeColonne(768)).toBe('calc((100% - 16px) / 2)');
});

it('donne une seule colonne en dessous de 768 px', () => {
  expect(largeurDeColonne(767)).toBe('100%');
});

// La gouttiere retranchee est celle qui separe les colonnes, pas une par colonne : deux
// colonnes ont une gouttiere, trois en ont deux.
it('retranche une gouttiere de moins que le nombre de colonnes', () => {
  expect(largeurDeColonne(1199)).toBe('calc((100% - 16px) / 2)');
});
