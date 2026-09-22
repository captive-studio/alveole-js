import { Platform } from 'react-native';
import { UnsupportedCSSProperties } from '../constants';
import type { StyleValue } from './makeStyles';

/** Un style dont les propriétés interdites sur la plateforme courante sont annulées. */
const sansProprietesInterdites = (style: StyleValue, interdites: (keyof StyleValue)[]): StyleValue => {
  const copie = { ...style };
  for (const propriete of interdites) if (propriete in copie) copie[propriete] = undefined;

  return copie;
};

/**
 * Retire les propriétés CSS non supportées pour une platforme
 * @param styles Styles appliqués
 * @returns Les styles sans les propriétés exclues pour la platform
 */
export function removeUnsupportedCSSProperties<T extends Record<string, StyleValue>>(styles: T): T {
  const interdites = UnsupportedCSSProperties[Platform.OS] ?? [];
  const cleaned = {} as T;
  for (const key in styles)
    cleaned[key] = sansProprietesInterdites(styles[key], interdites) as T[Extract<keyof T, string>];

  return cleaned;
}
