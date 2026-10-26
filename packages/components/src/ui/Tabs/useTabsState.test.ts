import { act, renderHook } from '@testing-library/react-native';
import { useTabsState } from './useTabsState';

describe('useTabsState', () => {
  it('marque l onglet survole', async () => {
    const { result } = await renderHook(() => useTabsState('a'));

    await act(() => result.current.setHoverTab('b'));

    expect(result.current.etatDeLOnglet('b').survole).toBe(true);
  });
});
