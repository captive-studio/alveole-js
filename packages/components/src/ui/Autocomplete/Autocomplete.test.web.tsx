import { renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { Autocomplete } from './Autocomplete';

test('donne au champ le nom accessible de son étiquette', () => {
  renderWeb(<Autocomplete label="Villes" options={[{ value: 'lyon', label: 'Lyon' }]} />);

  expect(screen.getByRole('combobox', { name: 'Villes' })).toBeTruthy();
});
