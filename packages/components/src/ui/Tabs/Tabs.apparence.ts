// Un onglet habille quatre pieces - le bouton, sa pastille, son icone et son libelle - a partir
// des deux memes etats. Le focus n'en est pas : il vient de la regle CSS du theme. Le composant empilait ces couches a la main au milieu de son rendu.
// Chaque couche a sa propre forme - une bordure ici, une couleur la : la table est contrainte
// sur ses cles, pas sur un type de couche commun, sinon la table du theme et celle des tests
// devraient se ressembler.
type CoucheDApparence =
  | 'tabsTab'
  | 'tabsTabActive'
  | 'wrapper'
  | 'wrapperHover'
  | 'tabIcon'
  | 'tabIconHover'
  | 'tabsLabel'
  | 'tabsLabelActive';

export type EtatDeLOnglet = {
  actif: boolean;
  survole: boolean;
};

export const apparenceDeLOnglet = <Table extends Record<CoucheDApparence, object>>(
  styles: Table,
  { actif, survole }: EtatDeLOnglet,
) => ({
  onglet: {
    ...styles.tabsTab,
    ...(actif ? styles.tabsTabActive : {}),
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
