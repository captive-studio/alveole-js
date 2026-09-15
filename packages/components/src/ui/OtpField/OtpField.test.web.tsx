import { renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { OtpField } from './OtpField';

test('associe le libellé au champ', () => {
  renderWeb(<OtpField label="Code reçu par SMS" />);

  expect(screen.getByLabelText('Code reçu par SMS')).toBeTruthy();
});
