import { renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { NumberField } from './NumberField';

test('associe le libellé au champ', () => {
  renderWeb(<NumberField label="Quantité" />);

  expect(screen.getByLabelText('Quantité')).toBeTruthy();
});
