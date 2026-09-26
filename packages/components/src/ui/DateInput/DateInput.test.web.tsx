import { renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { FormControl } from '../FormControl';
import { DateInput } from './DateInput';

test('associe le libellé du FormControl au champ', () => {
  renderWeb(
    <FormControl label="Date de naissance">
      <DateInput />
    </FormControl>,
  );

  expect(screen.getByLabelText('Date de naissance')).toBeTruthy();
});
