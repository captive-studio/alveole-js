import { fireEvent, renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { ListItem } from './ListItem';

test("nomme le bouton radio par le titre de l'élément", () => {
  renderWeb(<ListItem title="Ada" RadioProps={{ value: 'ada', checked: false }} />);

  expect(screen.getByRole('radio', { name: 'Ada' })).toBeTruthy();
});

test("nomme la case à cocher de la variante multiple par le titre de l'élément", () => {
  renderWeb(<ListItem title="Ada" RadioProps={{ value: 'ada', checked: false, multiple: true }} />);

  expect(screen.getByRole('checkbox', { name: 'Ada' })).toBeTruthy();
});

// Une image sans attribut `alt` est une violation `image-alt` pour axe, et le catalogue tient
// un cliquet à zéro. L'aperçu est décoratif : le titre et la description portent déjà
// l'information, donc l'alternative est vide, mais elle doit exister.
test("donne une alternative textuelle à l'image d'aperçu", () => {
  const { container } = renderWeb(
    <ListItem title="Titre" description="Description" preview_url="https://exemple.test/apercu.png" />,
  );

  const images = Array.from(container.querySelectorAll('img'));

  expect(images.filter(image => !image.hasAttribute('alt'))).toEqual([]);
});

// Toute la surface d'interaction du composant etait nue : ni le relais de `onPress`, ni
// l'appel a `onChange`, ni le cloisonnement des deux zones n'etaient observes.
test('relaie la pression sur la ligne', () => {
  const onPress = jest.fn();
  renderWeb(<ListItem title="Ada" onPress={onPress} />);

  fireEvent.click(screen.getByText('Ada'));

  expect(onPress).toHaveBeenCalled();
});

// Presser la ligne coche aussi le bouton : c'est toute la ligne qui est la cible, pas le
// seul bouton radio.
test('coche le choix quand on presse la ligne', () => {
  const onChange = jest.fn();
  renderWeb(<ListItem title="Ada" RadioProps={{ value: 'ada', checked: false, onChange }} />);

  fireEvent.click(screen.getByText('Ada'));

  expect(onChange).toHaveBeenCalledWith('ada');
});

test('rapporte la valeur quand on coche la case elle-meme', () => {
  const onChange = jest.fn();
  renderWeb(<ListItem title="Ada" RadioProps={{ value: 'ada', checked: false, multiple: true, onChange }} />);

  fireEvent.click(screen.getByRole('checkbox', { name: 'Ada' }));

  expect(onChange).toHaveBeenCalledWith('ada');
});

// La zone de choix est cloisonnee : sans le `stopPropagation`, cocher la case declencherait
// en plus l'action de la ligne, et `onChange` serait appele deux fois.
test('ne declenche pas l action de la ligne quand on coche la case', () => {
  const onPress = jest.fn();
  renderWeb(<ListItem title="Ada" onPress={onPress} RadioProps={{ value: 'ada', checked: false, multiple: true }} />);

  fireEvent.click(screen.getByRole('checkbox', { name: 'Ada' }));

  expect(onPress).not.toHaveBeenCalled();
});

// Pendant du test precedent, pour la variante a choix unique. Le `stopPropagation` n'est ici
// pas ce qui le rend vrai : le bouton Radix sous-jacent n'emet deja pas de clic remontant,
// et retirer le `stopPropagation` de cette zone laisse ce test vert. Il decrit donc le
// contrat rendu, pas une ligne en particulier.
test('ne declenche pas l action de la ligne quand on presse le bouton radio', () => {
  const onPress = jest.fn();
  renderWeb(<ListItem title="Ada" onPress={onPress} RadioProps={{ value: 'ada', checked: false }} />);

  fireEvent.click(screen.getByRole('radio', { name: 'Ada' }));

  expect(onPress).not.toHaveBeenCalled();
});

// L'apercu et la zone de choix sont exclusifs : une ligne qui montre une vignette ne montre
// ni bouton radio, ni case, ni icone, ni avatar, meme si les props sont fournies.
test('remplace la zone de choix par l apercu', () => {
  renderWeb(
    <ListItem
      title="Ada"
      preview_url="https://exemple.test/apercu.png"
      RadioProps={{ value: 'ada', checked: false }}
      IconProps={{ name: 'Check' }}
    />,
  );

  expect(screen.queryByRole('radio', { name: 'Ada' })).toBeNull();
});

// Le separateur n'a ni role ni texte : il ne se reconnait qu'a sa geometrie, un filet d'un
// pixel pose en absolu sur toute la largeur du bloc de detail.
const separateurs = (container: HTMLElement) =>
  Array.from(container.querySelectorAll<HTMLElement>('*')).filter(
    element => element.style.position === 'absolute' && element.style.height === '1px',
  );

test('pose un separateur au-dessus du detail', () => {
  const { container } = renderWeb(<ListItem title="Ada" />);

  expect(separateurs(container)).toHaveLength(1);
});

test('retire le separateur quand on le lui demande', () => {
  const { container } = renderWeb(<ListItem title="Ada" showSeparateur={false} />);

  expect(separateurs(container)).toEqual([]);
});

test('rend l accessoire de fin de ligne', () => {
  renderWeb(<ListItem title="Ada" trailing={() => <span>Retirer</span>} />);

  expect(screen.getByText('Retirer')).toBeTruthy();
});

// Le spinner s'affiche sans delai : le chargement porte sur la ligne elle-meme, pas sur une
// action que l'utilisateur vient de declencher. Il ne se reconnait qu'a sa geometrie - un
// anneau que le composant fait tourner - faute de role ou de texte.
const anneaux = (container: HTMLElement) =>
  Array.from(container.querySelectorAll<HTMLElement>('*')).filter(element =>
    element.style.transform.startsWith('rotate'),
  );

test('montre le chargement de la ligne', () => {
  const { container } = renderWeb(<ListItem title="Ada" loading />);

  expect(anneaux(container)).toHaveLength(1);
});

test('ne montre rien quand la ligne ne charge pas', () => {
  const { container } = renderWeb(<ListItem title="Ada" />);

  expect(anneaux(container)).toEqual([]);
});

// L'icone, l'avatar et le choix se cumulent dans la meme rangee : les fournir tous les trois
// doit les montrer tous les trois, et non faire trancher l'un au detriment des autres.
test('cumule le choix, l icone et l avatar devant le titre', () => {
  const { container } = renderWeb(
    <ListItem
      title="Ada"
      RadioProps={{ value: 'ada', checked: false }}
      IconProps={{ name: 'Check' }}
      AvatarProps={{ fallbackText: 'Ada Lovelace' }}
    />,
  );

  expect(screen.getByRole('radio', { name: 'Ada' })).toBeTruthy();
  expect(screen.getByText('AL')).toBeTruthy();
  expect(container.querySelectorAll('svg')).toHaveLength(1);
});
