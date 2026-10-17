/**
 * Ce que `lirePointeurWeb` lit d'un evenement de pointeur : le plus petit type commun a
 * l'evenement RN (Tamagui v1) et a l'evenement React DOM (Tamagui v2).
 */
export type EvenementPointeur = {
  currentTarget: unknown;
  nativeEvent: { clientX: number; clientY: number };
};

/**
 * La position du pointeur et le cadre qu'il survole, lus sur un evenement RN ou DOM. Sur le web,
 * react-native-web transmet l'evenement du DOM : `nativeEvent` porte les coordonnees et
 * `currentTarget` est l'element survole. Hors du DOM, il n'y a pas de cadre a mesurer.
 */
export const lirePointeurWeb = (event: EvenementPointeur) => {
  const cible: unknown = event.currentTarget;
  if (typeof Element === 'undefined' || !(cible instanceof Element)) return undefined;

  const { clientX, clientY } = event.nativeEvent;
  return { clientX, clientY, rect: cible.getBoundingClientRect() };
};
