import { render, screen } from '@/__tests__/helpers';
import { TextField } from './TextField';

test('associe le libellé au champ', () => {
  render(<TextField label="Nom" />);

  expect(screen.getByLabelText('Nom')).toBeTruthy();
});
