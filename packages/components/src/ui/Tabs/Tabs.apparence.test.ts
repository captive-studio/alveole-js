import { apparenceDeLOnglet } from './Tabs.apparence';

// Table de styles reduite : ce qui se verifie ici c'est l'ordre d'empilement des couches,
// pas leur contenu, qui vient du theme.
const styles = {
  tabsTab: { a: 'base' },
  tabsTabActive: { a: 'actif' },
  tabsTabFocused: { a: 'focalise' },
  wrapper: { b: 'base' },
  wrapperHover: { b: 'survole' },
  tabIcon: { c: 'base' },
  tabIconHover: { c: 'survole' },
  tabsLabel: { d: 'base' },
  tabsLabelActive: { d: 'actif' },
};

// L'anneau de focus doit rester visible sur l'onglet deja selectionne : s'il passait sous la
// couche active, naviguer au clavier jusqu'a l'onglet courant ne montrerait plus rien.
test('empile le focus par-dessus la couche active du bouton', () => {
  const { onglet } = apparenceDeLOnglet(styles, { actif: true, focalise: true, survole: false });

  expect(onglet).toEqual({ a: 'focalise' });
});

// Le survol teinte le fond de la pastille, pas le bouton qui la porte : le bouton n'a pas de
// rayon, une couleur posee sur lui deborderait en rectangle sous l'arrondi.
test('teinte la pastille au survol sans toucher au bouton', () => {
  const etat = { actif: false, focalise: false, survole: true };

  expect(apparenceDeLOnglet(styles, etat)).toMatchObject({ onglet: { a: 'base' }, enveloppe: { b: 'survole' } });
});

// L'icone change de couleur au survol : les deux couches sont des alternatives, pas un
// empilement. Superposees, la couleur de repos resterait sous celle du survol.
test('remplace la couleur de l icone au survol', () => {
  const { icone } = apparenceDeLOnglet(styles, { actif: true, focalise: false, survole: true });

  expect(icone).toEqual({ c: 'survole' });
});

// Le libelle de l'onglet courant passe en gras : c'est le seul repere qui survit a un rendu
// sans couleur, la barre inferieure ne portant que la couleur primaire.
test('passe le libelle en gras sur l onglet courant', () => {
  const { libelle } = apparenceDeLOnglet(styles, { actif: true, focalise: false, survole: false });

  expect(libelle).toEqual({ d: 'actif' });
});
