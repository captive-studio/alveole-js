import { clesApresBasculeLigne, clesApresBasculeTout, etatSelectionDataTable } from './selectionDataTable';

test('selectable faux : allSelected et someSelected sont faux quelles que soient les clés', () => {
  const resultat = etatSelectionDataTable(['r1', 'r2'], ['r1', 'r2'], false);

  expect(resultat).toEqual({ allSelected: false, someSelected: false });
});

test('selectable vrai, aucune ligne : allSelected est faux', () => {
  const resultat = etatSelectionDataTable([], [], true);

  expect(resultat.allSelected).toBe(false);
});

test('selectable vrai, toutes les clés sélectionnées : allSelected est vrai', () => {
  const resultat = etatSelectionDataTable(['r1', 'r2'], ['r1', 'r2'], true);

  expect(resultat).toEqual({ allSelected: true, someSelected: false });
});

test('selectable vrai, certaines clés sélectionnées : someSelected est vrai', () => {
  const resultat = etatSelectionDataTable(['r1', 'r2'], ['r1'], true);

  expect(resultat).toEqual({ allSelected: false, someSelected: true });
});

test('selectable vrai, aucune clé sélectionnée : les deux sont faux', () => {
  const resultat = etatSelectionDataTable(['r1', 'r2'], [], true);

  expect(resultat).toEqual({ allSelected: false, someSelected: false });
});

test('bascule tout, déjà tout sélectionné : désélectionne tout', () => {
  const resultat = clesApresBasculeTout(['r1', 'r2'], true);

  expect(resultat).toEqual([]);
});

test('bascule tout, pas tout sélectionné : sélectionne toutes les clés', () => {
  const resultat = clesApresBasculeTout(['r1', 'r2'], false);

  expect(resultat).toEqual(['r1', 'r2']);
});

test('bascule une ligne à cochée : ajoute sa clé aux clés sélectionnées', () => {
  const resultat = clesApresBasculeLigne(['r1'], 'r2', true);

  expect(resultat).toEqual(['r1', 'r2']);
});

test('bascule une ligne à décochée : retire sa clé des clés sélectionnées', () => {
  const resultat = clesApresBasculeLigne(['r1', 'r2'], 'r1', false);

  expect(resultat).toEqual(['r2']);
});
