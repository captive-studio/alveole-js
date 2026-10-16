import { renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { FormControl } from '../FormControl';
import { PriceInput } from './PriceInput';

test('associe le libellé du FormControl au champ', () => {
  renderWeb(
    <FormControl label="Prix">
      <PriceInput value={null} />
    </FormControl>,
  );

  expect(screen.getByLabelText('Prix')).toBeTruthy();
});

test('désactive le champ', () => {
  renderWeb(
    <FormControl label="Prix">
      <PriceInput value={null} disabled />
    </FormControl>,
  );

  expect(screen.getByLabelText('Prix')).toHaveProperty('disabled', true);
});

test('donne au champ la largeur exacte de ses chiffres', () => {
  renderWeb(
    <FormControl label="Prix">
      <PriceInput value={1250} />
    </FormControl>,
  );

  expect((screen.getByLabelText('Prix') as HTMLInputElement).style.width).toBe('4ch');
});
