import { shouldFitToMarkers } from './useGoogleMap';

describe('shouldFitToMarkers', () => {
  it('fit par défaut quand aucun center et des markers présents', () => {
    expect(shouldFitToMarkers(undefined, undefined, 3)).toBe(true);
  });

  it('ne fit pas par défaut quand un center est fourni', () => {
    expect(shouldFitToMarkers(undefined, { lat: 48.8566, lng: 2.3522 }, 3)).toBe(false);
  });

  it('fit quand fitToMarkers est forcé à true malgré un center', () => {
    expect(shouldFitToMarkers(true, { lat: 48.8566, lng: 2.3522 }, 3)).toBe(true);
  });

  it("ne fit jamais quand il n'y a aucun marker", () => {
    expect(shouldFitToMarkers(true, undefined, 0)).toBe(false);
  });
});
