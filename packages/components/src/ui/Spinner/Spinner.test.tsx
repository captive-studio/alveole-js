import { renderNative } from '@/__tests__/helpers/renderNative';
import { Animated } from 'react-native';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('arrete la rotation au demontage', async () => {
    const stop = jest.fn();
    const loop = jest.spyOn(Animated, 'loop').mockReturnValue({ start: jest.fn(), stop, reset: jest.fn() });

    const { unmount } = await renderNative(<Spinner />);
    await unmount();

    expect(stop).toHaveBeenCalled();
    loop.mockRestore();
  });

  it('fait un tour en 800 ms sur le pilote natif', async () => {
    const timing = jest.spyOn(Animated, 'timing');

    await renderNative(<Spinner />);

    expect(timing).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ duration: 800, useNativeDriver: true }),
    );
    timing.mockRestore();
  });
});
