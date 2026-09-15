import { render, screen } from '@/__tests__/helpers/render.web';
import { TextField } from './TextField';

test('associe le libellé au champ', () => {
  render(<TextField label="Nom" />);

  expect(screen.getByLabelText('Nom')).toBeTruthy();
});
