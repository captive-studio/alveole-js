import { focusRing } from './Focus';

describe('focusRing', () => {
  it('rend un anneau visible', () => {
    expect(focusRing('default').outlineWidth).toBeGreaterThan(0);
  });

  it('contraste l anneau differemment sur un fond plein', () => {
    expect(focusRing('emphasis').outlineColor).not.toBe(focusRing('default').outlineColor);
  });
});
