import { renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { FormControl } from '../FormControl';
import { TimeInput } from './TimeInput';

test('associe le libellé du FormControl au champ', () => {
  renderWeb(
    <FormControl label="Heure de rendez-vous">
      <TimeInput />
    </FormControl>,
  );

  expect(screen.getByLabelText('Heure de rendez-vous')).toBeTruthy();
});
