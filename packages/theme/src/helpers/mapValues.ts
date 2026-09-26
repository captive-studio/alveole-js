type MapValues = <T extends object, R>(
  objet: T,
  transformation: (valeur: T[keyof T], cle: keyof T & string) => R,
) => { [K in keyof T]: R };

const transformeChaqueValeur = (
  objet: object,
  transformation: (valeur: unknown, cle: string) => unknown,
): Record<string, unknown> =>
  Object.fromEntries(
    Object.entries(objet).map(([cle, valeur]: [string, unknown]) => [cle, transformation(valeur, cle)]),
  );

/**
 * Transforme chaque valeur d'un objet en gardant ses cles, et le dit dans son type.
 *
 * `Object.fromEntries` rend un `Record<string, R>` : TypeScript ne sait pas prouver que les
 * cles ressortent identiques. Cette preuve, faite ici par construction (on ne parcourt que les
 * cles de l'entree), est la seule assertion de type que le depot tolere : les parcours du theme
 * passent tous par cette fonction plutot que de porter chacun la leur.
 * Elle est exemptee de la regle par un override de la config ESLint, pas par une directive.
 */
export const mapValues = transformeChaqueValeur as MapValues;
