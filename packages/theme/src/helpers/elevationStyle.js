import { Platform } from 'react-native';
import { Elevations } from '../constants';
const isElevationKey = key => Object.prototype.hasOwnProperty.call(Elevations, key);
/**
 * Transforme les shadow en fonction de la platforme (web ou mobile)
 * @param level L’élévation
 * @returns
 */
export const elevationStyle = level => {
  const value = isElevationKey(level) ? Elevations[level] : undefined;
  if (value == null) return;
  if (Platform.OS === 'web') return { boxShadow: value.web };
  return value.mobile;
};
