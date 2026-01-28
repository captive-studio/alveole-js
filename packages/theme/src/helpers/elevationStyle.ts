import { Platform } from 'react-native';
import { ElevationKey, Elevations } from '../constants';

const isElevationKey = (key: number): key is keyof typeof Elevations =>
  Object.prototype.hasOwnProperty.call(Elevations, key);

/**
 * Transforme les shadow en fonction de la platforme (web ou mobile)
 * @param level L’élévation
 * @returns
 */
export const elevationStyle = (level: ElevationKey) => {
  const value = isElevationKey(level) ? Elevations[level] : undefined;
  if (value == null) return;
  if (Platform.OS === 'web') return { boxShadow: value.web };
  return value.mobile;
};
