import { render, screen } from '@/__tests__/helpers/render.web';
import { Autocomplete } from './Autocomplete';

test('donne au champ le nom accessible de son étiquette', () => {
  render(<Autocomplete label="Villes" options={[{ value: 'lyon', label: 'Lyon' }]} />);

  expect(screen.getByRole('combobox', { name: 'Villes' })).toBeTruthy();
});
