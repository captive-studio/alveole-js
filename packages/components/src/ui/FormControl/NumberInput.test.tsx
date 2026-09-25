import { fireEvent, renderNative, screen } from '@/__tests__/helpers/renderNative';
import { NumberInput } from './NumberInput';

it('augmente la valeur d un pas au bouton plus', async () => {
  const onChange = jest.fn();
  await renderNative(<NumberInput value={3} step={2} controlButton onChange={onChange} />);

  fireEvent.press(screen.getByLabelText('Augmenter de 2'));

  expect(onChange).toHaveBeenCalledWith(5);
});
