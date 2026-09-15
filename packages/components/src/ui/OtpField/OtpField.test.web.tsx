import { render, screen } from '@/__tests__/helpers';
import { OtpField } from './OtpField';

test('associe le libellé au champ', () => {
  render(<OtpField label="Code reçu par SMS" />);

  expect(screen.getByLabelText('Code reçu par SMS')).toBeTruthy();
});
