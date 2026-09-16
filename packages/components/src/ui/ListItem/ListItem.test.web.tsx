import { renderWeb, screen } from '@/__tests__/helpers/renderWeb';
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
