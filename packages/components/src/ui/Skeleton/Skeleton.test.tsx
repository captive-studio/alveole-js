import { renderNative } from '@/__tests__/helpers/renderNative';
import { Animated } from 'react-native';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('rend un bloc de 16 px sur toute la largeur par defaut', async () => {
    const { getByTestId } = await renderNative(<Skeleton testID="skeleton" />);

    expect(getByTestId('skeleton')).toHaveStyle({ width: '100%', height: 16 });
  });

  it('applique les dimensions demandees', async () => {
    const { getByTestId } = await renderNative(<Skeleton testID="skeleton" width={120} height={40} borderRadius={8} />);

    expect(getByTestId('skeleton')).toHaveStyle({ width: 120, height: 40 });
  });

  it('arrete la pulsation au demontage', async () => {
    const stop = jest.fn();
    const loop = jest.spyOn(Animated, 'loop').mockReturnValue({ start: jest.fn(), stop, reset: jest.fn() });

    const { unmount } = await renderNative(<Skeleton />);
    await unmount();

    expect(stop).toHaveBeenCalled();
    loop.mockRestore();
  });
});
