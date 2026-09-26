import { elementDuType } from '@/__tests__/helpers/elementDuType';
import { fireEvent, renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { FormControl } from './FormControl';
import { NumberInput } from './NumberInput';

const champQuantite = () => {
  renderWeb(
    <FormControl label="Quantité">
      <NumberInput />
    </FormControl>,
  );

  return elementDuType(screen.getByLabelText('Quantité'), HTMLInputElement);
};

test('se laisse designer par le libelle de son FormControl', () => {
  expect(champQuantite()).toBeTruthy();
});

test('augmente la valeur d un pas au bouton plus', () => {
  const onChange = jest.fn();
  renderWeb(<NumberInput value={3} step={2} controlButton onChange={onChange} />);

  fireEvent.click(screen.getByLabelText('Augmenter de 2'));

  expect(onChange).toHaveBeenCalledWith(5);
});

test('diminue la valeur d un pas au bouton moins', () => {
  const onChange = jest.fn();
  renderWeb(<NumberInput value={3} step={2} controlButton onChange={onChange} />);

  fireEvent.click(screen.getByLabelText('Diminuer de 2'));

  expect(onChange).toHaveBeenCalledWith(1);
});

// Descendre sous le minimum ne donnerait qu'une valeur refusee : le bouton ne le propose pas.
test('desactive le bouton moins au minimum', () => {
  renderWeb(<NumberInput value={2} min={2} controlButton onChange={() => undefined} />);

  expect(elementDuType(screen.getByLabelText('Diminuer de 1'), HTMLButtonElement).disabled).toBe(true);
});
