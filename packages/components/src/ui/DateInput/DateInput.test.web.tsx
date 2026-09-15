import { render, screen } from '@/__tests__/helpers';
import { DateInput } from './DateInput';

test('associe le libellé au champ', () => {
  render(<DateInput label="Date de naissance" />);

  expect(screen.getByLabelText('Date de naissance')).toBeTruthy();
});
