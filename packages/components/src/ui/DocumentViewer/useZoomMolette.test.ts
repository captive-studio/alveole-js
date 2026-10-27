import { ZOOM_MAX, ZOOM_MIN, zoomSuivant } from './useZoomMolette';

describe('zoomSuivant', () => {
  it('grossit quand la molette monte et reduit quand elle descend', () => {
    expect(zoomSuivant(1, -100)).toBe(1.25);
    expect(zoomSuivant(2.5, 100)).toBe(2);
  });

  it('reste entre le zoom minimal et le zoom maximal', () => {
    expect(zoomSuivant(ZOOM_MIN, 100)).toBe(ZOOM_MIN);
    expect(zoomSuivant(ZOOM_MAX, -100)).toBe(ZOOM_MAX);
  });
});
