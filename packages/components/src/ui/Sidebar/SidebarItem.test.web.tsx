import { fireEvent, renderOnDesktop, renderOnMobile } from '@/__tests__/helpers/renderWeb';
import { SidebarItem } from './SidebarItem';

// C'est l'icône, et non le libellé, qui fixerait la hauteur de la ligne : en `md` elle mesure
// 24 et rendrait l'item à 36px là où la maquette le veut à 32. D'où `sm`, soit 16, comme dans
// le noeud Figma.
test("rend l'icône d'un item en 16px", () => {
  const { container } = renderOnDesktop(<SidebarItem title="Accueil" icon="House" href="/x" />);

  expect(container.querySelector('sidebar-item svg')?.getAttribute('width')).toBe('16');
});

// La page courante ne se signalait que par le fond, la graisse et le filet bleu : trois indices
// visuels, aucun sémantique. Un lecteur d'écran annonçait un lien de navigation ordinaire.
test("annonce la page courante aux lecteurs d'ecran", () => {
  const { container } = renderOnDesktop(<SidebarItem title="Accueil" href="/" />);

  expect(container.querySelector('[aria-current="page"]')).not.toBeNull();
});

test('ne marque pas les autres entrees comme courantes', () => {
  const { container } = renderOnDesktop(<SidebarItem title="Button" href="/components/Button" />);

  expect(container.querySelector('[aria-current]')).toBeNull();
});

// Sous 992px la colonne se replie dans le menu de la barre, qui monte les memes `SidebarItem`
// en variante mobile : l'annonce doit y valoir autant, c'est le seul controle qui reste.
test('annonce aussi la page courante dans le tiroir mobile', () => {
  const { container } = renderOnMobile(<SidebarItem title="Accueil" href="/" />);

  expect(container.querySelector('[aria-current="page"]')).not.toBeNull();
});

// Un item `pressable` agit au lieu de naviguer : c'est la seule branche de l'enveloppe qui ne
// rend pas de lien, et elle n'était couverte par aucun test alors que les deux mises en page
// la partagent désormais.
test('declenche laction dun item pressable', () => {
  const onPress = jest.fn();
  const { container } = renderOnDesktop(<SidebarItem pressable title="Se deconnecter" onPress={onPress} />);

  fireEvent.click(container.querySelector('sidebar-item')!);

  expect(onPress).toHaveBeenCalled();
});

// Une entree qui agit au lieu de mener quelque part est un bouton : c'est ce qui permet d'y
// arriver au clavier et de l'entendre annoncee comme telle. « Se deconnecter » en pied de barre
// en est le cas type.
test("expose l'entree qui agit comme un bouton", () => {
  const { getByRole } = renderOnDesktop(<SidebarItem pressable title="Se déconnecter" onPress={() => undefined} />);

  expect(getByRole('button', { name: 'Se déconnecter' })).toBeTruthy();
});

// Un bouton se declenche au clavier, Entree comme Espace. C'est le navigateur qui transforme ces
// touches en clic, et seulement sur un vrai element <button> : un <div> qui porte le role
// s'annonce comme un bouton mais ne reagit pas. jsdom ne simulant pas cette conversion, on
// epingle la balise qui la garantit, comme le fait deja Button.
test("rend l'entree qui agit en element button natif", () => {
  const { getByRole } = renderOnDesktop(<SidebarItem pressable title="Se déconnecter" onPress={() => undefined} />);

  expect(getByRole('button', { name: 'Se déconnecter' }).tagName).toBe('BUTTON');
});

// Le filet bleu signale la page courante dans les deux mises en page, qui le dessinaient
// chacune de leur côté.
test('pose le filet de la page courante dans le tiroir mobile', () => {
  const { container } = renderOnMobile(<SidebarItem title="Accueil" href="/" />);

  expect(container.querySelector('sidebar-item-indicator')).not.toBeNull();
});

test('ne pose pas de filet sur les autres entrees', () => {
  const { container } = renderOnDesktop(<SidebarItem title="Button" href="/components/Button" />);

  expect(container.querySelector('sidebar-item-indicator')).toBeNull();
});

test('pose le filet de la page courante sur ordinateur', () => {
  const { container } = renderOnDesktop(<SidebarItem title="Accueil" href="/" />);

  expect(container.querySelector('sidebar-item-indicator')).not.toBeNull();
});
