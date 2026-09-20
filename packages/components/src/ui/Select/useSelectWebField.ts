import React from 'react';
import type { GroupBase, SelectInstance } from 'react-select';
import type { useStyles as useSelectStyles } from './Select.styles';
import type { SelectOption, SelectProps, SelectRef } from './Select.types';
import { useSelectComponents } from './selectComponents';
import { selectFieldProps } from './selectFieldProps';
import { useStyles as useListStyles } from './SelectList.styles';
import { textesDuPanneau } from './selectReglages';
import { selectStylesConfig } from './selectStylesConfig';
import { emitSelectChange, toSelectedValues } from './selectValue';
import { useDebouncedCallback } from './useDebouncedCallback';
import { useSelectOptions, type SelectRow } from './useSelectOptions';

type Group = GroupBase<SelectOption>;

/**
 * Traduit les lignes de `useSelectOptions` dans la forme attendue par react-select.
 * La regle de regroupement vit dans le hook : elle est commune aux deux plateformes.
 */
const toGroupedOptions = (rows: SelectRow[]): SelectOption[] | Group[] => {
  if (!rows.some(row => row.option.group)) return rows.map(row => row.option);

  return rows.reduce<{ label: string; options: SelectOption[] }[]>((groups, { option, groupHeader }) => {
    if (groupHeader != null || groups.length === 0) groups.push({ label: option.group ?? '', options: [] });
    groups[groups.length - 1]!.options.push(option);
    return groups;
  }, []);
};

/**
 * Tout ce que le selecteur web assemble avant de rendre quoi que ce soit : la feuille de style
 * de react-select, ses composants de remplacement, la poignee imperative et la traduction de
 * nos options. Le composant n'a plus qu'a choisir entre le selecteur ordinaire et le creable.
 */
export const useSelectWebField = (
  props: SelectProps,
  ref: React.ForwardedRef<SelectRef>,
  selectStyles: ReturnType<typeof useSelectStyles>,
) => {
  const { error, success, disabled, options, onSearchChange } = props;

  const multiple = props.multiple === true;
  const values = toSelectedValues(props);

  const listStyles = useListStyles();
  const instanceRef = React.useRef<SelectInstance<SelectOption, boolean, Group>>(null);

  React.useImperativeHandle(ref, () => ({
    focus: () => instanceRef.current?.focus(),
    blur: () => instanceRef.current?.blur(),
    open: () => instanceRef.current?.openMenu('first'),
    close: () => instanceRef.current?.blur(),
  }));

  const onSearch = useDebouncedCallback((query: string) => onSearchChange?.(query));

  // Le filtrage reste a react-select : le hook ne sert ici qu'au regroupement.
  const { rows } = useSelectOptions({ options, query: '' });
  const groupedOptions = React.useMemo(() => toGroupedOptions(rows), [rows]);

  const components = useSelectComponents({
    multiple,
    disabled,
    onRemoveValue: disabled
      ? undefined
      : value =>
          emitSelectChange(
            props,
            values.filter(retenue => retenue !== value),
          ),
  });

  const { loadingMessage, emptyMessage, createLabel } = textesDuPanneau(props);

  const fieldProps = selectFieldProps({
    props,
    multiple,
    // L'ordre suit celui de `value`, pas celui d'`options` : c'est la selection
    // que l'appelant a construite.
    selectedOptions: values
      .map(value => options.find(option => option.value === value))
      .filter(option => option != null),
    groupedOptions,
    styles: selectStylesConfig(selectStyles, listStyles, { error, success }),
    components,
    onSearch,
    loadingMessage,
    emptyMessage,
  });

  return { fieldProps, instanceRef, createLabel };
};
