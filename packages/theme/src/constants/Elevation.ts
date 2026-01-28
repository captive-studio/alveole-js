import { ViewStyle } from 'react-native';
import type { Color } from './Color';

const BASE = '#151617';

export const Elevations = {
  0: {
    web: 'none',
    mobile: {
      shadowColor: 'transparent' as Color,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
  },
  1: {
    web: `0px 1px 2px rgba(21,22,23,0.10), 0px 0px 1px rgba(21,22,23,0.04)`,
    mobile: {
      shadowColor: BASE as Color,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 1,
      elevation: 1,
    },
  },
  2: {
    web: `0px 2px 4px rgba(21,22,23,0.10), 0px 1px 2px rgba(21,22,23,0.06)`,
    mobile: {
      shadowColor: BASE as Color,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 2.5,
      elevation: 2,
    },
  },
  3: {
    web: `0px 4px 8px rgba(21,22,23,0.12), 0px 2px 4px rgba(21,22,23,0.07)`,
    mobile: {
      shadowColor: BASE as Color,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.14,
      shadowRadius: 4.5,
      elevation: 3,
    },
  },
  4: {
    web: `0px 6px 12px rgba(21,22,23,0.14), 0px 3px 6px rgba(21,22,23,0.08)`,
    mobile: {
      shadowColor: BASE as Color,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.16,
      shadowRadius: 6.5,
      elevation: 4,
    },
  },
} satisfies Record<ElevationKey, Elevation>;

// helpers
export type ElevationKey = number;
export type Elevation = {
  web: string;
  mobile: {
    shadowColor: Color;
    shadowOffset: ViewStyle['shadowOffset'];
    shadowOpacity: ViewStyle['shadowOpacity'];
    shadowRadius: ViewStyle['shadowRadius'];
    elevation: ViewStyle['elevation'];
  };
};
