import { act, renderHook } from '@testing-library/react-native';
import { useSurvolAvecZoom } from './useSurvolAvecZoom';

describe('useSurvolAvecZoom', () => {
  it('grossit la page quand le pointeur la survole', async () => {
    const { result } = await renderHook(() => useSurvolAvecZoom());

    await act(() => result.current.onEntree());

    expect(result.current.echelle).toBe(2);
  });

  it('revient a l echelle normale quand le pointeur s en va', async () => {
    const { result } = await renderHook(() => useSurvolAvecZoom());

    await act(() => result.current.onEntree());
    await act(() => result.current.onSortie());

    expect(result.current.echelle).toBe(1);
  });
});
