import { DeepPartial } from '../constants';

/** Ce qui se fusionne cle a cle. Un tableau n'en est pas : il se remplace en entier. */
const estFusionnable = (valeur: unknown): valeur is object =>
  typeof valeur === 'object' && valeur !== null && !Array.isArray(valeur);

/**
 * Fusionne une surcharge de theme dans sa base. Un objet se fusionne cle a cle, tout le reste se
 * remplace, et une valeur nulle dans la surcharge laisse la base en place.
 *
 * Les trois `any` d'origine disaient la meme chose de trois facons : la fonction ne connait pas
 * la forme de ce qu'elle traverse. `unknown` le dit sans eteindre la verification, et
 * `estFusionnable` la retablit au seul endroit qui en depend - celui ou l'on decide de descendre
 * dans la valeur ou de la remplacer.
 */
export function deepMerge<T extends object>(base: T, patch?: DeepPartial<T>): T {
  if (!patch) return base;

  const sortie: T = Array.isArray(base) ? ([...base] as T) : { ...base };

  for (const cle of Object.keys(patch) as (keyof T)[]) {
    const valeur: unknown = patch[cle as keyof DeepPartial<T>];
    const valeurDeBase: unknown = base[cle];

    sortie[cle] = (
      estFusionnable(valeur) && estFusionnable(valeurDeBase)
        ? deepMerge(valeurDeBase, valeur)
        : (valeur ?? valeurDeBase)
    ) as T[keyof T];
  }

  return sortie;
}
