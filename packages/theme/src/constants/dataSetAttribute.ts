/**
 * Le nom de l'attribut `data-*` que react-native-web rend pour une clé de `dataSet`. Dérivé,
 * jamais recopié : une règle CSS ne peut pas cibler un attribut que plus personne ne pose.
 */
export const dataSetAttribute = (key: string) => `data-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
