import { z } from 'zod';
export const LatLngSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});
export const MarkerSchema = z.object({
  id: z.string().optional(),
  position: LatLngSchema,
  title: z.string().optional(),
  iconUrl: z.string().optional(),
});
export const MapPropsSchema = z.object({
  markers: MarkerSchema.array(),
  center: LatLngSchema.optional().describe('Si omis, on fit les bounds des markers'),
  zoom: z.number().optional().describe('Ignoré si on fit bounds'),
  fitToMarkers: z.boolean().optional().describe('Par défaut: true si pas de center'),
});
export const MapPropsJSON = z.toJSONSchema(MapPropsSchema);
