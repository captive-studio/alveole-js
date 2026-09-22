import { deepMerge } from './deepMerge';

test('rend la base telle quelle quand il n y a pas de surcharge', () => {
  const base = { couleur: 'rouge' };

  expect(deepMerge(base)).toBe(base);
});

test('remplace une valeur de premier niveau sans toucher aux autres', () => {
  expect(deepMerge({ couleur: 'rouge', taille: 12 }, { couleur: 'bleu' })).toEqual({ couleur: 'bleu', taille: 12 });
});

test('descend dans un objet imbrique plutot que de l ecraser', () => {
  const base = { bouton: { fond: 'rouge', texte: 'blanc' } };

  expect(deepMerge(base, { bouton: { fond: 'bleu' } })).toEqual({ bouton: { fond: 'bleu', texte: 'blanc' } });
});

// Un tableau se remplace, il ne se fusionne pas index par index : une surcharge qui declare
// trois espacements en veut trois, pas les trois siens poses sur ceux de la base.
test('remplace un tableau au lieu de le fusionner', () => {
  expect(deepMerge({ espacements: [1, 2, 3] }, { espacements: [9] })).toEqual({ espacements: [9] });
});

// `pv ?? bv` : une cle presente mais nulle dans la surcharge n'efface pas la base. C'est ce qui
// permet d'ecrire une surcharge partielle sans avoir a omettre chaque cle qu'on ne touche pas.
test('laisse la valeur de base quand la surcharge la declare nulle', () => {
  expect(deepMerge({ couleur: 'rouge' }, { couleur: undefined })).toEqual({ couleur: 'rouge' });
});
