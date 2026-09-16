import { AutocompleteOption, isAutocompleteOptionWithGroup } from './Autocomplete.types';

const normalise = (texte: string) => texte.trim().toLowerCase();

/**
 * Dit si la saisie correspond deja exactement au libelle d'une option, existante ou retenue.
 *
 * C'est ce qui empeche de proposer de creer un doublon de ce que la liste affiche juste en
 * dessous. Une saisie vide compte comme deja portee : il n'y a alors rien a creer.
 */
export const porteDejaLeLibelle = (
  options: AutocompleteOption[],
  selected: AutocompleteOption[],
  query: string,
): boolean => {
  const saisie = normalise(query);
  if (!saisie) return true;

  return [...options, ...selected].some(o => normalise(o.label) === saisie);
};

/**
 * Restreint les options a la saisie, puis remonte celles deja retenues.
 *
 * La remontee sert a retrouver ses choix sans faire defiler une longue liste. Elle est laissee
 * de cote quand les options sont groupees en mode multiple : deplacer une option hors de son
 * groupe la detacherait de son en-tete, et la liste mentirait sur son rattachement.
 */
export const filtrerOptions = (
  options: AutocompleteOption[],
  query: string,
  {
    sansFiltre,
    isMulti,
    rangParValeur,
  }: { sansFiltre?: boolean; isMulti: boolean; rangParValeur: Map<string, number> },
): AutocompleteOption[] => {
  const saisie = normalise(query);
  const base = options ?? [];
  const retenues = sansFiltre || saisie.length === 0 ? base : base.filter(o => normalise(o.label).includes(saisie));

  if (isMulti && isAutocompleteOptionWithGroup(retenues[0])) return retenues;

  const retenue = (o: AutocompleteOption) => rangParValeur.has(o.value);

  return [...retenues.filter(retenue), ...retenues.filter(o => !retenue(o))];
};
