import type { Platform } from 'react-native';
import type { StyleValue } from '../helpers/makeStyles';

export const UnsupportedCSSProperties: Partial<Record<typeof Platform.OS, (keyof StyleValue)[]>> = {
  ios: ['outlineWidth'],
};
