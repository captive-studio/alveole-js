// Un onglet habille quatre pieces - le bouton, sa pastille, son icone et son libelle - a partir
// des trois memes etats. Le composant empilait ces couches a la main au milieu de son rendu.
// Chaque couche a sa propre forme - une bordure ici, une couleur la : la table est contrainte
// sur ses cles, pas sur un type de couche commun, sinon la table du theme et celle des tests
// devraient se ressembler.
type CoucheDApparence =
  | 'tabsTab'
  | 'tabsTabActive'
  | 'tabsTabFocused'
  | 'wrapper'
  | 'wrapperHover'
  | 'tabIcon'
  | 'tabIconHover'
  | 'tabsLabel'
  | 'tabsLabelActive';

export type EtatDeLOnglet = {
  actif: boolean;
  focalise: boolean;
  survole: boolean;
};

export const apparenceDeLOnglet = <Table extends Record<CoucheDApparence, object>>(
  styles: Table,
  { actif, focalise, survole }: EtatDeLOnglet,
) => ({
  onglet: {
    ...styles.tabsTab,
    ...(actif ? styles.tabsTabActive : {}),
    // `focusStyle` (prop declarative de Tamagui) se compile en classe CSS `:focus` : jsdom ne
    // resout pas ce pseudo-selecteur dans `getComputedStyle`. Meme parade que
    // Checkbox/RadioGroup/Switch/Button : le focus est tracke via un state React reel,
    // applique en style inline.
    ...(focalise ? styles.tabsTabFocused : {}),
  },
  enveloppe: {
    ...styles.wrapper,
    ...(survole ? styles.wrapperHover : {}),
  },
  icone: survole ? styles.tabIconHover : styles.tabIcon,
  libelle: {
    ...styles.tabsLabel,
    ...(actif ? styles.tabsLabelActive : {}),
  },
});
