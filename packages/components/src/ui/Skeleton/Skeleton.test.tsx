import { renderNative } from '@/__tests__/helpers/renderNative';
import { Animated } from 'react-native';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('arrete la pulsation au demontage', async () => {
    const stop = jest.fn();
    const loop = jest.spyOn(Animated, 'loop').mockReturnValue({ start: jest.fn(), stop, reset: jest.fn() });

    const { unmount } = await renderNative(<Skeleton />);
    await unmount();

    expect(stop).toHaveBeenCalled();
    loop.mockRestore();
  });
});
