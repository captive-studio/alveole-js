import { renderNative, userEvent } from '@/__tests__/helpers/renderNative';
import { Switch } from './Switch';

test.each(['texte', 'interrupteur'])('bascule depuis son %s sur mobile', async cible => {
  const onCheckedChange = jest.fn();
  const user = userEvent.setup();
  const view = await renderNative(<Switch label="Notifications" onCheckedChange={onCheckedChange} />);

  await user.press(
    cible === 'texte' ? view.getByText('Notifications') : view.getByRole('switch', { name: 'Notifications' }),
  );

  expect(onCheckedChange).toHaveBeenCalledTimes(1);
  expect(onCheckedChange).toHaveBeenCalledWith(true);
  expect(view.getByRole('switch', { name: 'Notifications' }).props.accessibilityState.checked).toBe(true);
});

test('ne bascule pas depuis le libellé quand il est désactivé', async () => {
  const onCheckedChange = jest.fn();
  const user = userEvent.setup();
  const view = await renderNative(<Switch label="Notifications" disabled onCheckedChange={onCheckedChange} />);

  await user.press(view.getByText('Notifications'));

  expect(onCheckedChange).not.toHaveBeenCalled();
});

test('laisse la valeur contrôlée à l’appelant après un appui sur le libellé', async () => {
  const onCheckedChange = jest.fn();
  const user = userEvent.setup();
  const view = await renderNative(<Switch label="Notifications" checked={false} onCheckedChange={onCheckedChange} />);

  await user.press(view.getByText('Notifications'));

  expect(onCheckedChange).toHaveBeenCalledWith(true);
  expect(view.getByRole('switch', { name: 'Notifications' }).props.accessibilityState.checked).toBe(false);
});
