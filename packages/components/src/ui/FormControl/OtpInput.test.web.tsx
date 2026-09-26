import { renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { FormControl } from './FormControl';
import { OtpInput } from './OtpInput';

test('associe le libellé au champ', () => {
  renderWeb(
    <FormControl label="Code reçu par SMS">
      <OtpInput />
    </FormControl>,
  );

  expect(screen.getByLabelText('Code reçu par SMS')).toBeTruthy();
});
