import { renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { TimeInput } from './TimeInput';

test('associe le libellé au champ', () => {
  renderWeb(<TimeInput label="Heure de rendez-vous" />);

  expect(screen.getByLabelText('Heure de rendez-vous')).toBeTruthy();
});
