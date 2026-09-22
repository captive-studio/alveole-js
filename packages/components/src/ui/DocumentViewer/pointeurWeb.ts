import type { PointerEvent } from 'react-native';

/**
 * La position du pointeur et le cadre qu'il survole, lus sur un evenement RN. Sur le web,
 * react-native-web transmet l'evenement du DOM : `nativeEvent` porte les coordonnees et
 * `currentTarget` est l'element survole. Hors du DOM, il n'y a pas de cadre a mesurer.
 */
export const lirePointeurWeb = (event: PointerEvent) => {
  const cible: unknown = event.currentTarget;
  if (typeof Element === 'undefined' || !(cible instanceof Element)) return undefined;

  const { clientX, clientY } = event.nativeEvent;
  return { clientX, clientY, rect: cible.getBoundingClientRect() };
};
