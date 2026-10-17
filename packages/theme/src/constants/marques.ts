import { dataSetAttribute } from './dataSetAttribute';

export type Marques = { dataSet: Record<string, string>; [attribut: string]: string | Record<string, string> };

/**
 * Pose des marques `data-*` sous les deux formes qu'un composant du kit peut recevoir :
 * `dataSet`, que react-native-web traduit en attributs, et l'attribut direct, seule forme
 * que Tamagui v2 transmet au DOM.
 */
export const marques = (valeurs: Record<string, string>): Marques => ({
  dataSet: valeurs,
  ...Object.fromEntries(Object.entries(valeurs).map(([cle, valeur]) => [dataSetAttribute(cle), valeur])),
});
