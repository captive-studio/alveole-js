import { render, screen } from '@/__tests__/helpers/render.web';
import { NumberField } from './NumberField';

test('associe le libellé au champ', () => {
  render(<NumberField label="Quantité" />);

  expect(screen.getByLabelText('Quantité')).toBeTruthy();
});
