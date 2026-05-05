import type * as React from 'react';
import { z } from 'zod';
export declare const LatLngSchema: z.ZodObject<
  {
    lat: z.ZodNumber;
    lng: z.ZodNumber;
  },
  z.core.$strip
>;
export type LatLng = z.infer<typeof LatLngSchema>;
export declare const MarkerSchema: z.ZodObject<
  {
    id: z.ZodOptional<z.ZodString>;
    position: z.ZodObject<
      {
        lat: z.ZodNumber;
        lng: z.ZodNumber;
      },
      z.core.$strip
    >;
    title: z.ZodOptional<z.ZodString>;
    iconUrl: z.ZodOptional<z.ZodString>;
  },
  z.core.$strip
>;
export type Marker = z.infer<typeof MarkerSchema>;
export declare const MapPropsSchema: z.ZodObject<
  {
    markers: z.ZodArray<
      z.ZodObject<
        {
          id: z.ZodOptional<z.ZodString>;
          position: z.ZodObject<
            {
              lat: z.ZodNumber;
              lng: z.ZodNumber;
            },
            z.core.$strip
          >;
          title: z.ZodOptional<z.ZodString>;
          iconUrl: z.ZodOptional<z.ZodString>;
        },
        z.core.$strip
      >
    >;
    center: z.ZodOptional<
      z.ZodObject<
        {
          lat: z.ZodNumber;
          lng: z.ZodNumber;
        },
        z.core.$strip
      >
    >;
    zoom: z.ZodOptional<z.ZodNumber>;
    fitToMarkers: z.ZodOptional<z.ZodBoolean>;
  },
  z.core.$strip
>;
export type MapProps = z.infer<typeof MapPropsSchema> & {
  style?: React.CSSProperties;
  mapOptions?: Record<string, unknown>;
  onMarkerClick?: (marker: Marker) => void;
};
export declare const MapPropsJSON: z.core.ZodStandardJSONSchemaPayload<
  z.ZodObject<
    {
      markers: z.ZodArray<
        z.ZodObject<
          {
            id: z.ZodOptional<z.ZodString>;
            position: z.ZodObject<
              {
                lat: z.ZodNumber;
                lng: z.ZodNumber;
              },
              z.core.$strip
            >;
            title: z.ZodOptional<z.ZodString>;
            iconUrl: z.ZodOptional<z.ZodString>;
          },
          z.core.$strip
        >
      >;
      center: z.ZodOptional<
        z.ZodObject<
          {
            lat: z.ZodNumber;
            lng: z.ZodNumber;
          },
          z.core.$strip
        >
      >;
      zoom: z.ZodOptional<z.ZodNumber>;
      fitToMarkers: z.ZodOptional<z.ZodBoolean>;
    },
    z.core.$strip
  >
>;
//# sourceMappingURL=Map.props.d.ts.map
