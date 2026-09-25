import { insereUnElement, metAJourUnElement, normalizeOut, retireUnElement } from './TextInputArray.liste';

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

describe('la sortie remise à l appelant', () => {
  const items = [
    { id: 'a', value: ' un ', _original: 'un' },
    { id: 'b', value: '   ', _original: null },
    { id: 'c', value: 'un', _original: null },
  ];

  // Par defaut, l'appelant recoit ce qu'il enregistrerait : ni espaces de bord, ni ligne vide.
  // Les identifiants internes tombent, la valeur d'origine reste.
  test('rogne les valeurs et retire les lignes vides par défaut', () => {
    expect(normalizeOut(items, {})).toEqual([
      { value: 'un', _original: 'un' },
      { value: 'un', _original: null },
    ]);
  });

  // Le dedoublonnage garde la premiere occurrence : c'est elle qui porte la valeur d'origine
  // quand la ligne vient de la donnee chargee.
  test('ne garde que la première occurrence d une valeur quand le dédoublonnage est demandé', () => {
    expect(normalizeOut(items, { dedupe: true })).toEqual([{ value: 'un', _original: 'un' }]);
  });

  test('rend la saisie telle quelle quand le nettoyage est coupé', () => {
    expect(normalizeOut(items, { trim: false, removeEmpty: false }).map(v => v.value)).toEqual([' un ', '   ', 'un']);
  });
});
