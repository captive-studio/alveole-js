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

// Le rangement et le compte sont calcules par `paletteSections` : l'ecran n'a qu'a les
// porter jusqu'a l'en-tete de chaque section.
it('nomme chaque famille et compte ses jetons dans son en-tete', async () => {
  rendreLaPalette({ palette });

  expect(screen.getByText('light / text')).toBeTruthy();
  expect(screen.getByText('2 tokens')).toBeTruthy();
});

it('montre le nom court du jeton et sa valeur', async () => {
  rendreLaPalette({ palette });

  expect(screen.getByText('title-grey')).toBeTruthy();
  expect(screen.getByText('#151617')).toBeTruthy();
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
