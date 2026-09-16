import { Toasts } from '@alveole/components';
import { fireEvent, renderScreen, screen } from '../../__tests__/helpers/renderScreen';
import { ThemePaletteScreen } from './ThemePaletteScreen';

/**
 * L'ecran copie une valeur au presse-papiers et l'annonce : il exige donc le fournisseur de
 * notifications, que l'application monte dans sa mise en page racine.
 */
const rendreLaPalette = (props: Parameters<typeof ThemePaletteScreen>[0]) =>
  renderScreen(
    <Toasts>
      <ThemePaletteScreen {...props} />
    </Toasts>,
  );

const palette = {
  light: {
    text: { 'title-grey': '#151617', 'mention-grey': '#5F6571' },
    border: { 'default-grey': '#DEE3EC' },
  },
  dark: { text: { 'title-grey': '#FFFFFF' } },
  primary: '#0055FF',
};

it('groupe les couleurs du mode clair par famille', async () => {
  rendreLaPalette({ palette });

  expect(screen.getByText('light / text')).toBeTruthy();
  expect(screen.getByText('light / border')).toBeTruthy();
});

it('ne montre que le mode clair', async () => {
  rendreLaPalette({ palette });

  expect(screen.queryByText('dark / text')).toBeNull();
});

// Deux sections n'ont qu'un jeton ici : la famille `border` et les cles historiques. Le pluriel
// se verifie donc des deux cotes, sans quoi un compte toujours au pluriel passerait.
it('compte les jetons de chaque famille, au singulier quand il n y en a qu un', async () => {
  rendreLaPalette({ palette });

  expect(screen.getByText('2 tokens')).toBeTruthy();
  expect(screen.getAllByText('1 token')).toHaveLength(2);
});

it('montre le nom court du jeton et sa valeur', async () => {
  rendreLaPalette({ palette });

  expect(screen.getByText('title-grey')).toBeTruthy();
  expect(screen.getByText('#151617')).toBeTruthy();
});

// Les cles historiques de premier niveau ne sont pas rangees par famille : elles sont
// rassemblees a part, pour qu'on voie d'un coup ce qui reste a migrer.
it('rassemble les cles historiques dans une section a part', async () => {
  rendreLaPalette({ palette });

  expect(screen.getByText('Deprecated')).toBeTruthy();
});

it('n ouvre pas de section historique quand la palette n en a plus', async () => {
  rendreLaPalette({ palette: { light: { text: { 'title-grey': '#151617' } } } });

  expect(screen.queryByText('Deprecated')).toBeNull();
});

it('aplatit les chemins imbriques jusqu a la couleur', async () => {
  rendreLaPalette({ palette: { light: { text: { action: { high: '#0055FF' } } } } });

  expect(screen.getByText('high')).toBeTruthy();
  expect(screen.getByText('#0055FF')).toBeTruthy();
});

/** La pastille cliquable qui porte une valeur : c'est elle que l'utilisateur vise. */
const pastilleDe = (valeur: string) => screen.getByText(valeur).closest('[role="button"]') as HTMLElement;

it('copie la valeur au presse-papiers quand on presse la pastille', async () => {
  const writeText = jest.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });

  rendreLaPalette({ palette });
  fireEvent.click(pastilleDe('#151617'));

  expect(writeText).toHaveBeenCalledWith('#151617');
});

it('annonce la valeur copiee', async () => {
  const writeText = jest.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });

  rendreLaPalette({ palette });
  fireEvent.click(pastilleDe('#151617'));

  expect(await screen.findByText('Copié !')).toBeTruthy();
});

// Sans presse-papiers, presser ne doit rien casser : l'ecran est rendu par un navigateur qui
// peut refuser l'acces, et le composant ne peut pas le savoir avant d'essayer.
it('ne casse pas quand le presse-papiers est indisponible', async () => {
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value: undefined });

  rendreLaPalette({ palette });

  expect(() => fireEvent.click(pastilleDe('#151617'))).not.toThrow();
});

it('n ouvre pas de famille vide', async () => {
  rendreLaPalette({ palette: { light: { text: {}, border: { 'default-grey': '#DEE3EC' } } } });

  expect(screen.queryByText('light / text')).toBeNull();
  expect(screen.getByText('light / border')).toBeTruthy();
});

it('aplatit aussi les cles historiques qui portent un groupe', async () => {
  rendreLaPalette({ palette: { light: {}, system: { danger: '#FF0000' } } });

  expect(screen.getByText('Deprecated')).toBeTruthy();
  expect(screen.getByText('1 token')).toBeTruthy();
});

// Les familles s'ouvrent, l'historique reste replie : c'est ce qui reste a migrer, pas ce qu'on
// vient consulter. L'accordion ne rend pas le contenu replie, l'ecart se voit donc aux pastilles.
it('deplie les familles et laisse l historique replie', async () => {
  rendreLaPalette({ palette });

  expect(screen.getByText('#151617')).toBeTruthy();
  expect(screen.queryByText('#0055FF')).toBeNull();
});

// L'ecran sert aussi bien la palette du theme qu'une palette d'application : le titre et la
// description sont donc repris par l'appelant, et seulement par defaut ceux du theme.
it('reprend le titre et la description que l appelant donne', async () => {
  rendreLaPalette({ palette, title: 'Couleurs de la marque', description: 'Palette du client' });

  expect(screen.getAllByText('Couleurs de la marque').length).toBeGreaterThan(0);
});
