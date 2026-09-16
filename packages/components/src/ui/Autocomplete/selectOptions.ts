import { AutocompleteOption } from './Autocomplete.types';

type GroupePourReactSelect = { label: string; options: AutocompleteOption[] };

/**
 * Met les options dans la forme que `react-select` attend, groupee ou plate.
 *
 * Groupees, elles deviennent des paquets nommes, la bibliotheque posant elle-meme les en-tetes.
 * A plat, les options deja retenues passent en fin de liste : `react-select` les affiche en
 * puces au-dessus du champ, et les laisser aussi a leur rang d'origine les montrerait deux fois.
 *
 * Un tableau vide devient `undefined` et non `[]` : c'est ce que la bibliotheque attend pour
 * afficher son message d'absence de resultat.
 */
export const pourReactSelect = (
  options: AutocompleteOption[],
  selected: AutocompleteOption[],
  groupees: boolean,
): GroupePourReactSelect[] | AutocompleteOption[] | undefined => {
  if (groupees) {
    const paquets = new Map<string, AutocompleteOption[]>();

    for (const option of options) {
      const groupe = 'group' in option ? option.group : '';
      paquets.set(groupe, [...(paquets.get(groupe) ?? []), option]);
    }

    return Array.from(paquets.entries()).map(([label, opts]) => ({ label, options: opts }));
  }

  const toutes = [...options.filter(option => !selected.includes(option)), ...selected];

  return toutes.length === 0 ? undefined : toutes;
};
