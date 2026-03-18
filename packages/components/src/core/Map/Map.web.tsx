import Constants from 'expo-constants';
import * as React from 'react';
import { Box } from '../Box';
import { LatLng, MapProps } from './Map.props';

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

export const Map = (props: MapProps) => {
  const { markers = [], center, zoom = 12, fitToMarkers, mapOptions, onMarkerClick } = props;

  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const mapRef = React.useRef<any>(null);
  const gMarkersRef = React.useRef<any[]>([]);

  const initMap = async (cancelled: boolean) => {
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
  };

  // Init map
  React.useEffect(() => {
    let cancelled = false;
    initMap(cancelled);
    return () => {
      cancelled = true;
      gMarkersRef.current.forEach(m => m.setMap(null));
      gMarkersRef.current = [];
      mapRef.current = null;
    };
  }, []);

  // Au changement d'options, on refresh markers et zoom
  React.useEffect(() => {
    if (!mapRef.current || !window.google?.maps) return;
    if (mapOptions) mapRef.current.setOptions(mapOptions);
    refreshMarkers();
    fitBoundsIfNeeded();
  }, [JSON.stringify(markers), JSON.stringify(center), zoom, fitToMarkers, JSON.stringify(mapOptions)]);

  function refreshMarkers() {
    if (!mapRef.current) return;
    const g = window.google;
    if (!g?.maps) return;
    gMarkersRef.current.forEach(m => m.setMap(null));
    gMarkersRef.current = [];
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
  }

  function fitBoundsIfNeeded() {
    const shouldFit = (fitToMarkers ?? !center) && markers.length > 0 && mapRef.current;

    if (!shouldFit || !mapRef.current) {
      if (center && mapRef.current) {
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
  }

  return (
    <Box
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        minHeight: 240,
        borderRadius: 12,
        overflow: 'hidden',
      }}
    />
  );
};
