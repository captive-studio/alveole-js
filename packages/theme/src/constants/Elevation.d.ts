import { ViewStyle } from 'react-native';
import type { Color } from './Color';
export declare const Elevations: {
  raised: {
    web: string;
    mobile: {
      shadowColor: Color;
      shadowOffset: {
        width: number;
        height: number;
      };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
  };
  overlap: {
    web: string;
    mobile: {
      shadowColor: Color;
      shadowOffset: {
        width: number;
        height: number;
      };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
  };
  lifted: {
    web: string;
    mobile: {
      shadowColor: Color;
      shadowOffset: {
        width: number;
        height: number;
      };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
  };
  /** @deprecated */
  0: {
    web: string;
    mobile: {
      shadowColor: Color;
      shadowOffset: {
        width: number;
        height: number;
      };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
  };
  /** @deprecated */
  1: {
    web: string;
    mobile: {
      shadowColor: Color;
      shadowOffset: {
        width: number;
        height: number;
      };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
  };
  /** @deprecated */
  2: {
    web: string;
    mobile: {
      shadowColor: Color;
      shadowOffset: {
        width: number;
        height: number;
      };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
  };
  /** @deprecated */
  3: {
    web: string;
    mobile: {
      shadowColor: Color;
      shadowOffset: {
        width: number;
        height: number;
      };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
  };
  /** @deprecated */
  4: {
    web: string;
    mobile: {
      shadowColor: Color;
      shadowOffset: {
        width: number;
        height: number;
      };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
  };
};
export type ElevationKey = number | 'raised' | 'overlap' | 'lifted';
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
//# sourceMappingURL=Elevation.d.ts.map
