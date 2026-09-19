import Constants from 'expo-constants';
import * as React from 'react';
import { LatLng, MapProps, Marker } from './Map.props';

type GoogleNamespace = {
  maps: any;
};

declare global {
  interface Window {
    google?: GoogleNamespace;
  }
}

const GOOGLE_MAPS_WEB_URL = 'https://maps.googleapis.com/maps/api/js?v=quarterly&libraries=marker';

const GOOGLE_MAPS_URL = (() => {
  const key = Constants.expoConfig?.extra?.GOOGLE_MAPS_API_KEY;
  if (!key) console.warn('EXPO_PUBLIC_GOOGLE_MAPS_API_KEY manquant');
  return key ? `${GOOGLE_MAPS_WEB_URL}&key=${key}` : GOOGLE_MAPS_WEB_URL;
})();

let loaderPromise: Promise<void> | null = null;

function loadGoogleMaps(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.google?.maps) return Promise.resolve();
  if (loaderPromise) return loaderPromise;

  loaderPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-map-loader="google"]');
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error('Failed to load Google Maps')));
      return;
    }
    const script = document.createElement('script');
    script.src = GOOGLE_MAPS_URL;
    script.async = true;
    script.defer = true;
    script.dataset.mapLoader = 'google';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Google Maps'));
    document.head.appendChild(script);
  });

  return loaderPromise;
}

export const shouldFitToMarkers = (
  fitToMarkers: boolean | undefined,
  center: LatLng | undefined,
  markersCount: number,
): boolean => (fitToMarkers ?? !center) && markersCount > 0;

function useMarkerSync(
  mapRef: React.MutableRefObject<any>,
  markers: Marker[],
  onMarkerClick: ((marker: Marker) => void) | undefined,
) {
  const gMarkersRef = React.useRef<any[]>([]);

  const clearMarkers = React.useCallback(() => {
    gMarkersRef.current.forEach(m => m.setMap(null));
    gMarkersRef.current = [];
  }, []);

  const refreshMarkers = React.useCallback(() => {
    if (!mapRef.current) return;
    const g = window.google;
    if (!g?.maps) return;
    clearMarkers();
    gMarkersRef.current = markers.map(mk => {
      const marker = new g.maps.Marker({
        position: mk.position,
        map: mapRef.current!,
        title: mk.title,
        ...(mk.iconUrl ? { icon: { url: mk.iconUrl } } : {}),
      });

      if (onMarkerClick) marker.addListener('click', () => onMarkerClick(mk));
      return marker;
    });
  }, [mapRef, markers, onMarkerClick, clearMarkers]);

  return { refreshMarkers, clearMarkers };
}

type BoundsFitParams = {
  mapRef: React.MutableRefObject<any>;
  fitToMarkers: boolean | undefined;
  center: LatLng | undefined;
  zoom: number;
  markers: Marker[];
};

function useBoundsFit({ mapRef, fitToMarkers, center, zoom, markers }: BoundsFitParams) {
  return React.useCallback(() => {
    if (!mapRef.current) return;

    if (!shouldFitToMarkers(fitToMarkers, center, markers.length)) {
      if (center) {
        mapRef.current.setCenter(center);
        mapRef.current.setZoom(zoom);
      }
      return;
    }

    const g = window.google;
    if (!g?.maps) return;
    const bounds = new g.maps.LatLngBounds();
    markers.forEach(m => bounds.extend(m.position));
    if (!bounds.isEmpty()) mapRef.current.fitBounds(bounds, 24);
  }, [mapRef, fitToMarkers, center, markers, zoom]);
}

type MapInitParams = {
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
  mapRef: React.MutableRefObject<any>;
  center: LatLng | undefined;
  markers: Marker[];
  zoom: number;
  mapOptions: Record<string, unknown> | undefined;
  refreshMarkers: () => void;
  fitBoundsIfNeeded: () => void;
};

function useMapInit({
  containerRef,
  mapRef,
  center,
  markers,
  zoom,
  mapOptions,
  refreshMarkers,
  fitBoundsIfNeeded,
}: MapInitParams) {
  return React.useCallback(
    async (cancelled: boolean) => {
      try {
        await loadGoogleMaps();

        if (cancelled) return;
        if (!containerRef.current) return;
        const google = window.google;
        if (!google?.maps) throw new Error('Google Maps not available on window');

        const initialCenter: LatLng = center ?? markers[0]?.position ?? { lat: 48.8566, lng: 2.3522 };
        mapRef.current = new google.maps.Map(containerRef.current, {
          center: initialCenter,
          zoom,
          clickableIcons: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          ...mapOptions,
        });

        refreshMarkers();
        fitBoundsIfNeeded();
      } catch (e) {
        console.error(e);
      }
    },
    [containerRef, mapRef, center, markers, zoom, mapOptions, refreshMarkers, fitBoundsIfNeeded],
  );
}

export function useGoogleMap(props: MapProps) {
  const { markers = [], center, zoom = 12, fitToMarkers, mapOptions, onMarkerClick } = props;

  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const mapRef = React.useRef<any>(null);

  const { refreshMarkers, clearMarkers } = useMarkerSync(mapRef, markers, onMarkerClick);
  const fitBoundsIfNeeded = useBoundsFit({ mapRef, fitToMarkers, center, zoom, markers });
  const initMap = useMapInit({
    containerRef,
    mapRef,
    center,
    markers,
    zoom,
    mapOptions,
    refreshMarkers,
    fitBoundsIfNeeded,
  });

  // Init map
  React.useEffect(() => {
    let cancelled = false;
    initMap(cancelled);
    return () => {
      cancelled = true;
      clearMarkers();
      mapRef.current = null;
    };
  }, [initMap, clearMarkers]);

  // Au changement d'options, on refresh markers et zoom
  React.useEffect(() => {
    if (!mapRef.current || !window.google?.maps) return;
    if (mapOptions) mapRef.current.setOptions(mapOptions);
    refreshMarkers();
    fitBoundsIfNeeded();
  }, [mapOptions, refreshMarkers, fitBoundsIfNeeded]);

  return { containerRef };
}
