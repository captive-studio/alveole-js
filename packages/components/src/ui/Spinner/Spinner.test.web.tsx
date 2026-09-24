import { renderOnDesktop } from '@/__tests__/helpers/renderWeb';
import { Animated } from 'react-native';
import { Spinner } from './Spinner';

// Le navigateur n'a pas de pilote natif : l'animation doit tourner cote JavaScript.
test('fait un tour en 800 ms hors du pilote natif', () => {
  const timing = jest.spyOn(Animated, 'timing');

  renderOnDesktop(<Spinner />);

  expect(timing).toHaveBeenCalledWith(
    expect.anything(),
    expect.objectContaining({ duration: 800, useNativeDriver: false }),
  );
  timing.mockRestore();
});

test('arrete la rotation au demontage', () => {
  const stop = jest.fn();
  const loop = jest.spyOn(Animated, 'loop').mockReturnValue({ start: jest.fn(), stop, reset: jest.fn() });

  const { unmount } = renderOnDesktop(<Spinner />);
  unmount();

  expect(stop).toHaveBeenCalled();
  loop.mockRestore();
});
