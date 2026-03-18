import type * as React from 'react';
import { z } from 'zod';

export const LatLngSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});
export type LatLng = z.infer<typeof LatLngSchema>;

export const MarkerSchema = z.object({
  id: z.string().optional(),
  position: LatLngSchema,
  title: z.string().optional(),
  iconUrl: z.string().optional(),
});
export type Marker = z.infer<typeof MarkerSchema>;

export const MapPropsSchema = z.object({
  markers: MarkerSchema.array(),
  center: LatLngSchema.optional().describe('Si omis, on fit les bounds des markers'),
  zoom: z.number().optional().describe('Ignoré si on fit bounds'),
  fitToMarkers: z.boolean().optional().describe('Par défaut: true si pas de center'),
});

export type MapProps = z.infer<typeof MapPropsSchema> & {
  style?: React.CSSProperties;
  mapOptions?: Record<string, unknown>;
  onMarkerClick?: (marker: Marker) => void;
};
export const MapPropsJSON = z.toJSONSchema(MapPropsSchema);
