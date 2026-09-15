import { renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { DateInput } from './DateInput';

test('associe le libellé au champ', () => {
  renderWeb(<DateInput label="Date de naissance" />);

  expect(screen.getByLabelText('Date de naissance')).toBeTruthy();
});
