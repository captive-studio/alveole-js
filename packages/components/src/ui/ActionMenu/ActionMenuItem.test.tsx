import { renderNative, userEvent } from '@/__tests__/helpers/renderNative';
import { ActionMenuItem } from './ActionMenuItem';

test.each([false, true])('déclenche l’action en touchant le texte de l’option (sélectionnée : %s)', async selected => {
  const onPress = jest.fn();
  const user = userEvent.setup();
  const view = await renderNative(<ActionMenuItem title="Core" selected={selected} onPress={onPress} />);

  await user.press(view.getByText('Core'));

  expect(onPress).toHaveBeenCalledTimes(1);
});
