import { triApresClicEntete } from './triApresClicEntete';

test('sort nul, clic sur une colonne : passe cette colonne en tri ascendant', () => {
  const resultat = triApresClicEntete(null, 'nom');

  expect(resultat).toEqual({ columnId: 'nom', direction: 'asc' });
});

test('sort ascendant sur la colonne cliquée : passe en tri descendant', () => {
  const resultat = triApresClicEntete({ columnId: 'nom', direction: 'asc' }, 'nom');

  expect(resultat).toEqual({ columnId: 'nom', direction: 'desc' });
});

test('sort descendant sur la colonne cliquée : retire le tri', () => {
  const resultat = triApresClicEntete({ columnId: 'nom', direction: 'desc' }, 'nom');

  expect(resultat).toBeNull();
});

test('sort actif sur une autre colonne : la nouvelle colonne passe en tri ascendant', () => {
  const resultat = triApresClicEntete({ columnId: 'nom', direction: 'desc' }, 'age');

  expect(resultat).toEqual({ columnId: 'age', direction: 'asc' });
});
