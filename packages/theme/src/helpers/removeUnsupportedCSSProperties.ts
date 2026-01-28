import { Platform } from 'react-native';
import { UnsupportedCSSProperties } from '../constants';
import type { StyleValue } from './makeStyles';

/**
 * Retire les propriétés CSS non supportées pour une platforme
 * @param styles Styles appliqués
 * @returns Les styles sans les propriétés exclues pour la platform
 */
export function removeUnsupportedCSSProperties<T extends Record<string, StyleValue>>(styles: T): T {
  const platform = Platform.OS;
  const blocklist = UnsupportedCSSProperties[platform] ?? [];
  const cleaned = {} as T;
  for (const key in styles) {
    const style = { ...styles[key] };
    for (const prop of blocklist) if (prop in style) style[prop] = undefined;
    cleaned[key] = style;
  }
  return cleaned;
}
