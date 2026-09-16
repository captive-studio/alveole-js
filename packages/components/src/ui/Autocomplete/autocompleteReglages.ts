import { AutocompleteProps } from './Autocomplete.types';

/**
 * Les valeurs par defaut, tenues a l'ecart du composant.
 *
 * Elles n'expriment aucune logique mais comptaient pour la moitie de la complexite mesuree du
 * composant, ce qui masquait la part qui en a vraiment. Les reglages resultants circulent
 * ensuite d'un seul tenant : chaque morceau y prend ce qui le concerne, au lieu que l'appelant
 * relaie une quarantaine de proprietes une a une.
 */
export const avecDefauts = (props: AutocompleteProps) => ({
  ...props,
  placeholder: props.placeholder ?? 'Sélectionner…',
  isMulti: props.isMulti ?? true,
  allowEmpty: props.allowEmpty ?? true,
  autoFocus: props.autoFocus ?? true,
  allowCreate: props.allowCreate ?? false,
  createOptionLabel: props.createOptionLabel ?? ((input: string) => `Ajouter « ${input} »`),
  createOptionValue: props.createOptionValue ?? ((input: string) => input),
});

export type Reglages = ReturnType<typeof avecDefauts>;
