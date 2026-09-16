import { useState } from 'react';
import { AutocompleteOption } from './Autocomplete.types';

/** Deux selections portent les memes options si elles alignent les memes valeurs, dans l'ordre. */
const cleDe = (options: AutocompleteOption[] | undefined) => options?.map(o => o.value).join('|') ?? '';

/**
 * Tient la selection locale alignee sur la prop `value`, quand l'appelant la pilote.
 *
 * Le composant garde sa propre selection pour repondre a l'instant a une pression, sans
 * attendre que l'appelant lui reponde. Il faut donc detecter qu'`value` a change par ailleurs,
 * et la comparaison porte sur les valeurs et non sur le tableau : un parent qui rend a nouveau
 * fabrique un tableau neuf a chaque fois, et comparer les references rejouerait la
 * synchronisation sans fin.
 *
 * La mise a jour a lieu pendant le rendu, et non dans un effet : React reprend alors le rendu
 * avec la nouvelle valeur avant de peindre, la ou un effet laisserait paraitre une image
 * portant l'ancienne selection.
 */
export const useSyncedSelection = (value: AutocompleteOption[] | undefined) => {
  const [selected, setSelected] = useState<AutocompleteOption[]>(value ?? []);
  const [cleSynchronisee, setCleSynchronisee] = useState(() => cleDe(value));

  const cleCourante = cleDe(value);
  if (cleSynchronisee !== cleCourante) {
    setCleSynchronisee(cleCourante);
    setSelected(value ?? []);
  }

  return [selected, setSelected] as const;
};
