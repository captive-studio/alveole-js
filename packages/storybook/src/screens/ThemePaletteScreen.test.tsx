import { Toasts } from '@alveole/components';
import { fireEvent, renderScreen, screen, waitFor } from '../../__tests__/helpers/renderScreen';
import type { CatalogueDesCouleurs, TokenSemantique } from '../couleurs/catalogueDesCouleurs';
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

const token = (champs: Partial<TokenSemantique>): TokenSemantique => ({
  chemin: 'light.border.default-grey',
  famille: 'light / border',
  nuance: { echelle: 'Neutre', numero: '900' },
  hex: '#DDDDDD',
  deprecie: false,
  remplacant: null,
  ...champs,
});

const catalogue: CatalogueDesCouleurs = { tokens: [token({})], nuances: [] };

it('montre le chemin complet, la nuance referencee et le hex de chaque token', async () => {
  rendreLaPalette({ catalogue });

  expect(screen.getByText('light.border.default-grey')).toBeTruthy();
  expect(screen.getByText('Neutre 900')).toBeTruthy();
  expect(screen.getByText('#DDDDDD')).toBeTruthy();
});

// Le barre se verifie sur les cliches (ADR 0027) : jsdom prouve le signal textuel, que les
// lecteurs d'ecran annoncent quand le barre ne se lit pas.
it('signale un token deprecie et donne son remplacant', async () => {
  const remplacant = "Utiliser light.border['default-grey']";
  rendreLaPalette({
    catalogue: { tokens: [token({ chemin: 'border.base', deprecie: true, remplacant })], nuances: [] },
  });

  expect(screen.getByText('Déprécié')).toBeTruthy();
  expect(screen.getByText(remplacant)).toBeTruthy();
});

/** La ligne cliquable qui porte un token : c'est elle que l'utilisateur vise. */
const ligneDe = (chemin: string) => screen.getByRole('button', { name: new RegExp(chemin) });

it('copie la valeur au presse-papiers quand on presse la ligne et l annonce', async () => {
  const writeText = jest.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });

  rendreLaPalette({ catalogue });
  fireEvent.click(ligneDe('light.border.default-grey'));

  expect(writeText).toHaveBeenCalledWith('#DDDDDD');
  expect(await screen.findByText('Copié !')).toBeTruthy();
});

it('nomme la famille de chaque groupe de tokens', async () => {
  rendreLaPalette({ catalogue });

  expect(screen.getByText('light / border')).toBeTruthy();
});

// Sans presse-papiers, presser ne doit rien casser : l'ecran est rendu par un navigateur qui
// peut refuser l'acces, et le composant ne peut pas le savoir avant d'essayer.
it('ne casse pas quand le presse-papiers est indisponible', async () => {
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value: undefined });

  rendreLaPalette({ catalogue });

  expect(() => fireEvent.click(ligneDe('light.border.default-grey'))).not.toThrow();
});

// Les applications montent l'ecran sous leur propre titre.
it('reprend le titre que l appelant donne', async () => {
  rendreLaPalette({ catalogue, title: 'Couleurs de la marque' });

  expect(screen.getAllByText('Couleurs de la marque').length).toBeGreaterThan(0);
});

// `transparent` et les `rgba(...)` sont ecrits en dur dans la palette : aucune nuance a citer.
it('indique une valeur directe quand le token ne reference aucune nuance', async () => {
  rendreLaPalette({ catalogue: { tokens: [token({ nuance: null, hex: 'transparent' })], nuances: [] } });

  expect(screen.getByText('Valeur directe')).toBeTruthy();
});

// Les applications montent l'ecran sans catalogue : il montre alors celui extrait du theme.
it('montre par defaut les tokens du theme Alveole', async () => {
  rendreLaPalette({});

  expect(screen.getByText('light.text.title-grey')).toBeTruthy();
});

// La page des nuances lie chaque token a sa ligne : l'ancre est son chemin complet.
it('ancre chaque ligne sur le chemin complet du token', async () => {
  rendreLaPalette({ catalogue });

  expect(document.getElementById('light.border.default-grey')).toBe(ligneDe('light.border.default-grey'));
});

// Le lien d'une nuance navigue cote client, et le routeur ne pose la nouvelle adresse qu'apres
// le montage de l'ecran (mesure en navigateur) : l'ecran lit l'ancre une fois ce montage passe.
it('amene a la ligne du token que designe l ancre posee apres le montage', async () => {
  const scrollIntoView = jest.fn();
  Element.prototype.scrollIntoView = scrollIntoView;

  rendreLaPalette({ catalogue });
  window.history.pushState(null, '', '#light.border.default-grey');

  await waitFor(() => expect(scrollIntoView.mock.contexts[0]).toBe(ligneDe('light.border.default-grey')));
  window.history.replaceState(null, '', '#');
});
