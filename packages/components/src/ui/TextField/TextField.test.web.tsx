import { renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { TextField } from './TextField';

test('associe le libellé au champ', () => {
  renderWeb(<TextField label="Nom" />);

  expect(screen.getByLabelText('Nom')).toBeTruthy();
});
