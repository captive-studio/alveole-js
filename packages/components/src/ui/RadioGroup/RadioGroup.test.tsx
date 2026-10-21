import { renderNative, userEvent } from '@/__tests__/helpers/renderNative';
import { RadioGroup } from './index';

test.each(['texte', 'bouton'])('sélectionne une option depuis son %s sur mobile', async cible => {
  const onChange = jest.fn();
  const user = userEvent.setup();
  const view = await renderNative(
    <RadioGroup value="a" label="Choix" onChange={onChange}>
      <RadioGroup.Item value="a">Option A</RadioGroup.Item>
      <RadioGroup.Item value="b">Option B</RadioGroup.Item>
    </RadioGroup>,
  );

  await user.press(cible === 'texte' ? view.getByText('Option B') : view.getByRole('radio', { name: 'Option B' }));

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith('b');
});

test('ne sélectionne pas une option du groupe désactivé depuis son texte', async () => {
  const onChange = jest.fn();
  const user = userEvent.setup();
  const view = await renderNative(
    <RadioGroup value="a" label="Choix" disabled onChange={onChange}>
      <RadioGroup.Item value="b">Option B</RadioGroup.Item>
    </RadioGroup>,
  );

  await user.press(view.getByText('Option B'));

  expect(onChange).not.toHaveBeenCalled();
});
