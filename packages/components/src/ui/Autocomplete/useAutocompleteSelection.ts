import { AutocompleteOption, ChangeMeta } from './Autocomplete.types';
import { Reglages } from './autocompleteReglages';
import { useSyncedSelection } from './useSyncedSelection';

type Options = Pick<Reglages, 'value' | 'isMulti' | 'onChange' | 'onCreateOption' | 'createOptionValue'>;

const parValeur = (options: AutocompleteOption[]) => new Map(options.map(o => [o.value, o]));

/**
 * Decrit ce qui a change entre deux selections, et non seulement ce qu'elles valent.
 *
 * Qui ecoute `onChange` a besoin de savoir quel geste vient d'avoir lieu : signaler une
 * suppression au serveur ne demande pas la meme chose qu'un ajout, et l'etat resultant ne
 * permet pas de les distinguer.
 */
export const changementEntre = (avant: AutocompleteOption[], apres: AutocompleteOption[]): ChangeMeta => {
  const indexAvant = parValeur(avant);
  const indexApres = parValeur(apres);
  const added = apres.filter(o => !indexAvant.has(o.value));

  return {
    added,
    removed: avant.filter(o => !indexApres.has(o.value)),
    created: added.filter(o => o.__created),
  };
};

/**
 * La selection et les trois gestes qui la modifient.
 *
 * `isMulti` change la regle et non le detail : en mode simple, choisir remplace et referme,
 * la ou le mode multiple accumule et laisse ouvert. C'est la seule difference, et elle tient
 * ici plutot que d'etre relue a chaque endroit qui touche la selection.
 */
export const useAutocompleteSelection = ({ value, isMulti, onChange, onCreateOption, createOptionValue }: Options) => {
  const [selected, setSelected] = useSyncedSelection(value);

  const rangParValeur = new Map(selected.map((o, rang) => [o.value, rang]));

  const poser = (suivant: AutocompleteOption[]) => {
    setSelected(suivant);
    onChange?.(suivant, changementEntre(selected, suivant));
  };

  /** Rend vrai quand le geste doit refermer la modale, c'est-a-dire quand le choix est fait. */
  const basculer = (option: AutocompleteOption) => {
    if (!isMulti) {
      poser([option]);
      return true;
    }

    const deja = rangParValeur.has(option.value);
    poser(deja ? selected.filter(o => o.value !== option.value) : [...selected, option]);

    return false;
  };

  const creerDepuis = (saisie: string) => {
    const label = saisie.trim();
    if (!label) return false;

    const cree: AutocompleteOption = { value: createOptionValue(label), label, __created: true };
    poser(isMulti ? [...selected, cree] : [cree]);
    onCreateOption?.(cree);

    return !isMulti;
  };

  const vider = () => poser([]);

  return { selected, rangParValeur, basculer, creerDepuis, vider };
};
