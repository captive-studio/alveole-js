import { Box } from '../../core';
import type { Story } from '../../type/Story';
import { Map } from './index';
import { MapPropsJSON } from './Map.props';
import { useStyles } from './Map.styles';

export default {
  title: 'Map',
  tags: ['core'],
  experimental: false,
  webOnly: true,
  description: 'Carte interactive (Google Map)',
  props: MapPropsJSON,
  component: Map,
  styleFn: useStyles,
} satisfies Story;

export function ParisMap() {
  const markers = [
    { id: 'a', position: { lat: 48.85837, lng: 2.294481 }, title: 'Tour Eiffel' },
    { id: 'b', position: { lat: 48.8606, lng: 2.3376 }, title: 'Louvre' },
  ];

  return <Box style={{ height: 400 }}>{markers && <Map markers={markers} />}</Box>;
}

export function MapMarker() {
  const marker = { id: 'mon-id', position: { lat: 48.85837, lng: 2.294481 }, title: 'Tour Eiffel' };

  return <Box style={{ height: 400 }}>{marker && <Map markers={[marker]} onMarkerClick={console.log} />}</Box>;
}

export function MapCenterZoomMarker() {
  const marker = { id: '123', position: { lat: 48.85837, lng: 2.294481 }, title: 'Tour Eiffel' };

  return (
    <Box style={{ height: 400 }}>
      {marker && <Map markers={[marker]} center={marker.position} onMarkerClick={console.log} zoom={4} />}
    </Box>
  );
}
