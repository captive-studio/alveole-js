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
