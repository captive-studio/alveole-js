import { focusRing } from './Focus';

jest.mock('react-native', () => ({ Platform: { OS: 'web' } }));

describe('focusRing sur le web', () => {
  it('rend un anneau visible', () => {
    expect(focusRing('default').outlineWidth).toBeGreaterThan(0);
  });

  it('contraste l anneau differemment sur un fond plein', () => {
    expect(focusRing('emphasis').outlineColor).not.toBe(focusRing('default').outlineColor);
  });
});
