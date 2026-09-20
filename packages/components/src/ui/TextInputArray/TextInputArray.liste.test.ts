import { insereUnElement, metAJourUnElement, retireUnElement } from './TextInputArray.liste';

const creeId = () => 'neuf';

// Le bouton d'ajout de bas de liste n'indique aucune position : la nouvelle ligne se pose
// derriere les autres, la ou le curseur ira la chercher.
test('ajoute la ligne en fin de liste quand aucune position n est donnee', () => {
  const items = [{ id: 'a', value: 'un', _original: null }];

  expect(insereUnElement(items, creeId)).toEqual([
    { id: 'a', value: 'un', _original: null },
    { id: 'neuf', value: '', _original: null },
  ]);
});

// Ajouter depuis une ligne donnee insere juste apres elle, et non en fin : la nouvelle saisie
// doit apparaitre sous les yeux, la ou l on vient de cliquer.
test('insere la ligne juste apres la position donnee', () => {
  const items = [
    { id: 'a', value: 'un', _original: null },
    { id: 'b', value: 'deux', _original: null },
  ];

  expect(insereUnElement(items, creeId, 0).map(i => i.id)).toEqual(['a', 'neuf', 'b']);
});

// Retirer la derniere ligne laisserait une liste sans champ, donc sans moyen de ressaisir quoi
// que ce soit : une ligne vierge reprend aussitot sa place.
test('remet une ligne vierge quand la derniere est retiree', () => {
  const items = [{ id: 'a', value: 'un', _original: 'un' }];

  expect(retireUnElement(items, 'a', creeId)).toEqual([{ id: 'neuf', value: '', _original: null }]);
});

// La saisie ne touche que la valeur : la valeur d'origine reste attachee a la ligne, c'est elle
// qui dit si la suppression est permise, et la reecrire ferait perdre ce verrou.
test('ne change que la valeur saisie et laisse la valeur d origine', () => {
  const items = [{ id: 'a', value: 'un', _original: 'un' }];

  expect(metAJourUnElement(items, 'a', 'deux')).toEqual([{ id: 'a', value: 'deux', _original: 'un' }]);
});
