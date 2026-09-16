import { AutocompleteOption } from './Autocomplete.types';

type Options = {
  isMulti: boolean | undefined;
  poser: (options: AutocompleteOption[]) => void;
  onChange?: (value: AutocompleteOption[]) => void;
  value?: AutocompleteOption[];
};

/**
 * Traduit ce que `react-select` renvoie en une selection.
 *
 * Le champ est toujours monte en `isMulti`, meme quand il n'accepte qu'un choix : c'est ce qui
 * lui donne l'apparence en puces. En mode simple on ne garde donc que la derniere option
 * choisie, la bibliotheque continuant d'en accumuler.
 */
export const useSelectChange = ({ isMulti, poser, onChange, value }: Options) => {
  const vider = () => {
    poser([]);
    onChange?.([]);
  };

  const retenir = (options: AutocompleteOption[]) => {
    // Comparaison heritee, portant sur la prop `value` et non sur les options recues. La
    // corriger changerait ce que le champ transmet a son appelant : c'est une decision de
    // comportement, pas de refactoring, et elle est laissee telle quelle ici.
    if (typeof value != 'object' || value === null) return vider();

    poser(options);

    return onChange?.(options);
  };

  return (recues: readonly AutocompleteOption[] | AutocompleteOption | null) => {
    if (!Array.isArray(recues)) return vider();

    const derniere = recues[recues.length - 1];
    if (isMulti === false && derniere) {
      poser([derniere]);

      return onChange?.([derniere]);
    }

    return retenir(recues);
  };
};
