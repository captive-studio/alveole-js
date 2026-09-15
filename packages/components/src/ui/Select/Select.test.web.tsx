import { renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { Select } from './Select';

test('donne au champ le nom accessible de son étiquette', () => {
  renderWeb(<Select label="Pays" value={null} options={[{ value: 'fr', label: 'France' }]} />);

  expect(screen.getByRole('combobox', { name: 'Pays' })).toBeTruthy();
});
