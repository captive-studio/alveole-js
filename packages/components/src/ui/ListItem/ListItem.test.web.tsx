import { render, screen } from '@/__tests__/helpers';
import { ListItem } from './ListItem';

test("nomme le bouton radio par le titre de l'élément", () => {
  render(<ListItem title="Ada" RadioProps={{ value: 'ada', checked: false }} />);

  expect(screen.getByRole('radio', { name: 'Ada' })).toBeTruthy();
});

test("nomme la case à cocher de la variante multiple par le titre de l'élément", () => {
  render(<ListItem title="Ada" RadioProps={{ value: 'ada', checked: false, multiple: true }} />);

  expect(screen.getByRole('checkbox', { name: 'Ada' })).toBeTruthy();
});
