import { LatLng } from './Map.props';

// Sous-ensemble de l'API Google Maps chargée par script, limité à ce que `useGoogleMap`
// appelle : le hook ne dépend pas de `@types/google.maps`.

export type GoogleMap = {
  setCenter(center: LatLng): void;
  setZoom(zoom: number): void;
  setOptions(options: Record<string, unknown>): void;
  fitBounds(bounds: GoogleLatLngBounds, padding: number): void;
};

export type GoogleMarker = {
  setMap(map: GoogleMap | null): void;
  addListener(event: 'click', handler: () => void): void;
};

export type GoogleLatLngBounds = {
  extend(position: LatLng): void;
  isEmpty(): boolean;
};

type GoogleMarkerOptions = {
  position: LatLng;
  map: GoogleMap;
  title?: string;
  icon?: { url: string };
};

export type GoogleNamespace = {
  maps: {
    Map: new (container: HTMLElement, options: Record<string, unknown>) => GoogleMap;
    Marker: new (options: GoogleMarkerOptions) => GoogleMarker;
    LatLngBounds: new () => GoogleLatLngBounds;
  };
};
