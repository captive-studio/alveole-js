import { Platform } from 'react-native';
import { UnsupportedCSSProperties } from '../constants';
import type { StyleValue } from './makeStyles';

/** Les propriétés interdites sur la plateforme courante, chacune ramenée à `undefined`. */
const annulations = (): Record<string, undefined> =>
  Object.fromEntries((UnsupportedCSSProperties[Platform.OS] ?? []).map(propriete => [propriete, undefined]));

/**
 * Retire les propriétés CSS non supportées pour une platforme
 * @param styles Styles appliqués
 * @returns Les styles sans les propriétés exclues pour la platform
 */
export function removeUnsupportedCSSProperties<T extends Record<string, StyleValue>>(styles: T): T {
  const interdites = annulations();
  const cleaned = { ...styles };
  for (const key in cleaned) cleaned[key] = { ...cleaned[key], ...interdites };

  return cleaned;
}
