import { fireEvent, renderScreen, screen } from '../../__tests__/helpers/renderScreen';
import { StorybookModule } from '../types';
import { StoriesScreen } from './StoriesScreen';

const fiche = (meta: { title: string; tags?: string[]; description?: string; figmaURL?: string }): StorybookModule => ({
  default: { tags: ['ui'], experimental: false, description: '', styleFn: () => ({}), ...meta },
});

const catalogue = [
  fiche({ title: 'Bouton', tags: ['ui'], description: 'Une action.', figmaURL: 'https://figma/bouton' }),
  fiche({ title: 'Carte', tags: ['ui'], description: 'Une surface.' }),
  fiche({ title: 'Boite', tags: ['core'], description: 'Une primitive.' }),
];

const rendreLaListe = (props: Partial<Parameters<typeof StoriesScreen>[0]> = {}) =>
  renderScreen(<StoriesScreen stories={catalogue} getStoryHref={story => `/s/${story.default.title}`} {...props} />);

/** Les fiches affichees, nommees par le lien que la page leur a donne. */
const fichesAffichees = () => screen.queryAllByRole('link').map(lien => lien.getAttribute('href')?.replace('/s/', ''));

/**
 * Les titres de groupe. Un tag parait deux fois sur la page : en titre au-dessus du groupe, et
 * en badge sur chaque carte. Seul le titre est hors de tout lien, la carte etant cliquable.
 */
const titresDeGroupe = (tag: string) => screen.queryAllByText(tag).filter(noeud => noeud.closest('a') === null);

const chercher = (texte: string) =>
  fireEvent.change(screen.getByPlaceholderText('Button, Tabs, Card...'), {
    target: { value: texte },
  });

/** Le declencheur d'un menu : le seul bouton portant ce nom tant que le menu est ferme. */
const ouvrirLeMenu = (nom: string) => fireEvent.click(screen.getByRole('button', { name: nom }));

/**
 * Une entree du menu deroule. Le nom d'un tag parait aussi en titre de groupe et en badge :
 * seule l'entree de menu descend d'un `action-menu-item`.
 */
const entreeDeMenu = (nom: string) =>
  screen.queryAllByText(nom).find(noeud => noeud.closest('action-menu-item') !== null);

const choisirDansLeMenu = (nom: string) => fireEvent.click(entreeDeMenu(nom)!);

// Le regroupement est calcule par `groupStoriesByTag` : l'ecran n'a qu'a poser chaque titre de
// groupe et chaque lien.
describe('StoriesScreen, ce qu il affiche', () => {
  it('range les fiches sous leur tag, chacune avec le lien que l appelant calcule', () => {
    rendreLaListe();

    expect(titresDeGroupe('core')).toHaveLength(1);
    expect(fichesAffichees()).toEqual(['Boite', 'Bouton', 'Carte']);
  });
});

describe('StoriesScreen, ce que la recherche reduit', () => {
  it('ne garde que les fiches que la recherche trouve', () => {
    rendreLaListe();

    chercher('surface');

    expect(fichesAffichees()).toEqual(['Carte']);
  });

  it('dit que la recherche n a rien trouve', () => {
    rendreLaListe({ emptyMessage: 'Aucune fiche.' });

    chercher('zzz');

    expect(screen.getByText('Aucune fiche.')).toBeTruthy();
  });
});

describe('StoriesScreen, ce que les menus filtrent', () => {
  it('ne garde que les fiches du tag choisi dans le menu', () => {
    rendreLaListe();

    ouvrirLeMenu('Tags');
    choisirDansLeMenu('core');

    expect(fichesAffichees()).toEqual(['Boite']);
  });

  // Le bouton porte le filtre actif plutot que son libelle generique : c'est la seule trace
  // du filtre une fois le menu referme.
  it('affiche le tag choisi sur le bouton du menu', () => {
    rendreLaListe();

    ouvrirLeMenu('Tags');
    choisirDansLeMenu('core');

    expect(screen.getByRole('button', { name: 'core' })).toBeTruthy();
    expect(screen.queryByText('Tags')).toBeNull();
  });

  it('ne garde que les fiches portant l indicateur choisi', () => {
    rendreLaListe();

    ouvrirLeMenu('Indicateurs');
    choisirDansLeMenu('Figma');

    expect(fichesAffichees()).toEqual(['Bouton']);
  });

  // Les filtres sont replies au depart : deployes, ils couvriraient la liste qu'ils servent
  // a reduire.
  it('garde les deux menus fermes au premier rendu', () => {
    rendreLaListe();

    expect(entreeDeMenu('core')).toBeUndefined();
    expect(entreeDeMenu('Web only')).toBeUndefined();
  });

  // Les deux menus partagent un seul etat d'ouverture : en ouvrir un referme l'autre, sinon
  // deux listes deroulantes se superposeraient.
  it('referme un menu quand on ouvre l autre', () => {
    rendreLaListe();

    ouvrirLeMenu('Tags');
    ouvrirLeMenu('Indicateurs');

    expect(entreeDeMenu('Web only')).toBeTruthy();
    expect(entreeDeMenu('core')).toBeUndefined();
  });
});

describe('StoriesScreen, ce qu il propose de creer', () => {
  it('propose le bouton de creation quand on lui donne un libelle et une action', () => {
    const onCreatePress = jest.fn();
    rendreLaListe({ createLabel: 'Nouvelle fiche', onCreatePress });

    fireEvent.click(screen.getByText('Nouvelle fiche'));

    expect(onCreatePress).toHaveBeenCalled();
  });

  // Un libelle sans action donnerait un bouton qui ne fait rien.
  it('ne propose pas de bouton de creation sans action', () => {
    rendreLaListe({ createLabel: 'Nouvelle fiche' });

    expect(screen.queryByText('Nouvelle fiche')).toBeNull();
  });

  // Une action sans libelle donnerait un bouton sans nom, que rien ne permet d'annoncer.
  it('ne propose pas de bouton de creation sans libelle', () => {
    rendreLaListe({ onCreatePress: jest.fn() });

    expect(screen.queryAllByRole('button')).toHaveLength(2);
  });
});
