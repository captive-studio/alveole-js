import type { SelectProps } from './Select.types';

/**
 * Ramène la valeur au même tableau dans les deux modes. Prend `props` entier et
 * non `value` seule : l'union n'est discriminée que sur l'objet, `multiple` et
 * `value` déstructurés ne sont plus liés pour TypeScript.
 */
export const toSelectedValues = (props: SelectProps): string[] =>
  props.multiple ? props.value : props.value != null ? [props.value] : [];

/** Renvoie la sélection dans la forme attendue par l'appelant, mono ou multi. */
export const emitSelectChange = (props: SelectProps, next: string[]): void => {
  if (props.multiple) props.onChange?.(next);
  else props.onChange?.(next[0] ?? null);
};

/** Bascule une valeur en multi, la remplace en mono. */
export const toggleSelectedValue = (props: SelectProps, value: string): string[] => {
  if (!props.multiple) return [value];
  const current = props.value;
  return current.includes(value) ? current.filter(selected => selected !== value) : [...current, value];
};
