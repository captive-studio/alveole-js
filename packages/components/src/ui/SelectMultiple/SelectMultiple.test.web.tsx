import { renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { SelectMultiple } from './SelectMultiple';

test('donne au champ le nom accessible de son étiquette', () => {
  renderWeb(<SelectMultiple label="Langues" options={[{ value: 'fr', label: 'Français' }]} />);

  expect(screen.getByRole('combobox', { name: 'Langues' })).toBeTruthy();
});
