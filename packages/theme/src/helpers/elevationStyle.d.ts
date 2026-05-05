import { ElevationKey } from '../constants';
/**
 * Transforme les shadow en fonction de la platforme (web ou mobile)
 * @param level L’élévation
 * @returns
 */
export declare const elevationStyle: (level: ElevationKey) =>
  | {
      shadowColor: import('..').Color;
      shadowOffset: {
        width: number;
        height: number;
      };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    }
  | {
      boxShadow: string;
    }
  | undefined;
//# sourceMappingURL=elevationStyle.d.ts.map
