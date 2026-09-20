import { apparenceDeLOnglet } from './Tabs.apparence';

// Table de styles reduite : ce qui se verifie ici c'est l'ordre d'empilement des couches,
// pas leur contenu, qui vient du theme.
const styles = {
  tabsTab: { a: 'base' },
  tabsTabActive: { a: 'actif' },
  wrapper: { b: 'base' },
  wrapperHover: { b: 'survole' },
  tabIcon: { c: 'base' },
  tabIconHover: { c: 'survole' },
  tabsLabel: { d: 'base' },
  tabsLabelActive: { d: 'actif' },
};

// Le focus n'est plus une couche d'apparence : il vient de la regle CSS `:focus-visible` du
// theme, la seule qui distingue le clavier de la souris. Empile ici, il s'affichait aussi au
// clic. Ce qui reste a verifier, c'est que l'etat actif se pose bien par-dessus la base.
test('empile la couche active par-dessus la base du bouton', () => {
  const { onglet } = apparenceDeLOnglet(styles, { actif: true, survole: false });

  expect(onglet).toEqual({ a: 'actif' });
});

// Le survol teinte le fond de la pastille, pas le bouton qui la porte : le bouton n'a pas de
// rayon, une couleur posee sur lui deborderait en rectangle sous l'arrondi.
test('teinte la pastille au survol sans toucher au bouton', () => {
  const etat = { actif: false, survole: true };

  expect(apparenceDeLOnglet(styles, etat)).toMatchObject({ onglet: { a: 'base' }, enveloppe: { b: 'survole' } });
});

// L'icone change de couleur au survol : les deux couches sont des alternatives, pas un
// empilement. Superposees, la couleur de repos resterait sous celle du survol.
test('remplace la couleur de l icone au survol', () => {
  const { icone } = apparenceDeLOnglet(styles, { actif: true, survole: true });

  expect(icone).toEqual({ c: 'survole' });
});

// Le libelle de l'onglet courant passe en gras : c'est le seul repere qui survit a un rendu
// sans couleur, la barre inferieure ne portant que la couleur primaire.
test('passe le libelle en gras sur l onglet courant', () => {
  const { libelle } = apparenceDeLOnglet(styles, { actif: true, survole: false });

  expect(libelle).toEqual({ d: 'actif' });
});
