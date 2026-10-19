// Tamagui v3 lit une prop de style a `undefined` comme une valeur : elle ecrase celle du style
// (`p` vide effacait le padding, `textAlign` vide l'alignement). Seules les props fournies passent.
export const definis = (valeurs: object) =>
  Object.fromEntries(Object.entries(valeurs).filter(([, valeur]) => valeur !== undefined));
