import { render, screen } from '@/__tests__/helpers/render.web';
import { SelectMultiple } from './SelectMultiple';

test('donne au champ le nom accessible de son étiquette', () => {
  render(<SelectMultiple label="Langues" options={[{ value: 'fr', label: 'Français' }]} />);

  expect(screen.getByRole('combobox', { name: 'Langues' })).toBeTruthy();
});
