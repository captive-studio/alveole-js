import { render, screen } from '@/__tests__/helpers';
import { TimeInput } from './TimeInput';

test('associe le libellé au champ', () => {
  render(<TimeInput label="Heure de rendez-vous" />);

  expect(screen.getByLabelText('Heure de rendez-vous')).toBeTruthy();
});
