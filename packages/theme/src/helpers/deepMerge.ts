import { DeepPartial } from '../constants';

type DeepMerge = <T extends object>(base: T, patch?: DeepPartial<T>) => T;

/** Ce qui se fusionne cle a cle. Un tableau n'en est pas : il se remplace en entier. */
const estFusionnable = (valeur: unknown): valeur is object =>
  typeof valeur === 'object' && valeur !== null && !Array.isArray(valeur);

const fusionne = (base: object, patch?: object): object => {
  if (!patch) return base;

  const sortie: Record<string, unknown> = { ...base };

  for (const [cle, valeur] of Object.entries(patch)) {
    const valeurDeBase = sortie[cle];

    sortie[cle] =
      estFusionnable(valeur) && estFusionnable(valeurDeBase)
        ? fusionne(valeurDeBase, valeur)
        : (valeur ?? valeurDeBase);
  }

  return Array.isArray(base) ? Object.assign([...base], sortie) : sortie;
};

/**
 * Fusionne une surcharge de theme dans sa base. Un objet se fusionne cle a cle, tout le reste se
 * remplace, et une valeur nulle dans la surcharge laisse la base en place.
 *
 * La fusion elle-meme est verifiee par le compilateur : elle ne connait de ce qu'elle traverse
 * que `object` et `unknown`, et `estFusionnable` decide seule de descendre ou de remplacer. Ce
 * qu'il ne sait pas prouver, c'est que la sortie a la forme de la base : les cles ressortent par
 * construction, comme dans `mapValues`. Cette unique assertion pose la signature publique ; elle
 * est exemptee de la regle par un override de la config ESLint, pas par une directive. Une
 * signature typee sur `Palette` n'y echapperait pas : la palette a une profondeur irreguliere.
 */
export const deepMerge = fusionne as DeepMerge;
