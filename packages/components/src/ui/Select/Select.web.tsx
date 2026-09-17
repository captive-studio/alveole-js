import { useTheme } from '@alveole/theme';
import React from 'react';
import ReactSelect, { GroupBase, SelectInstance, StylesConfig } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { Box } from '../../core/Box';
import { FormControl, FormControlCaption, FormControlHint, FormControlLabel } from '../FormControl';
import { InputHeading } from '../InputHeading';
import { useStyles as useSelectStyles } from './Select.styles';
import type { SelectOption, SelectProps, SelectRef } from './Select.types';
import { useSelectComponents } from './selectComponents';
import { selectFieldProps } from './selectFieldProps';
import { SELECT_ROW_HEIGHT, useStyles as useListStyles } from './SelectList.styles';
import { textesDuPanneau } from './selectReglages';
import { emitSelectChange, toSelectedValues } from './selectValue';
import { useDebouncedCallback } from './useDebouncedCallback';
import { useSelectOptions, type SelectRow } from './useSelectOptions';

type Group = GroupBase<SelectOption>;

/**
 * Traduit les lignes de `useSelectOptions` dans la forme attendue par react-select.
 * La règle de regroupement vit dans le hook : elle est commune aux deux plateformes.
 */
const toGroupedOptions = (rows: SelectRow[]): SelectOption[] | Group[] => {
  if (!rows.some(row => row.option.group)) return rows.map(row => row.option);

  return rows.reduce<{ label: string; options: SelectOption[] }[]>((groups, { option, groupHeader }) => {
    if (groupHeader != null || groups.length === 0) groups.push({ label: option.group ?? '', options: [] });
    groups[groups.length - 1]!.options.push(option);
    return groups;
  }, []);
};

export const Select = React.forwardRef<SelectRef, SelectProps>(function Select(props, ref) {
  const { label, labelRight, hint, error, success, disabled, options, onSearchChange, creatable, onCreateOption } =
    props;

  const { loadingMessage, emptyMessage, createLabel } = textesDuPanneau(props);

  // `multiple`, `value` et `onChange` ne sont jamais déstructurés : l'union
  // n'est discriminée que sur l'objet `props` entier.
  const multiple = props.multiple === true;
  const values = toSelectedValues(props);

  const selectStyles = useSelectStyles();
  const listStyles = useListStyles();
  const { color } = useTheme();

  const instanceRef = React.useRef<SelectInstance<SelectOption, boolean, Group>>(null);

  React.useImperativeHandle(ref, () => ({
    focus: () => instanceRef.current?.focus(),
    blur: () => instanceRef.current?.blur(),
    open: () => instanceRef.current?.openMenu('first'),
    close: () => instanceRef.current?.blur(),
  }));

  const debouncedSearchChange = useDebouncedCallback((query: string) => onSearchChange?.(query));

  // L'ordre suit celui de `value`, pas celui d'`options` : c'est la sélection
  // que l'appelant a construite.
  const selectedOptions = values
    .map(value => options.find(option => option.value === value))
    .filter(option => option != null);

  // Le filtrage reste à react-select : le hook ne sert ici qu'au regroupement.
  const { rows } = useSelectOptions({ options, query: '' });
  const groupedOptions = React.useMemo(() => toGroupedOptions(rows), [rows]);

  const styles: StylesConfig<SelectOption, boolean, Group> = {
    control: (base, state) => ({
      ...base,
      ...selectStyles.inputInner,
      ...(state.isDisabled
        ? { ...selectStyles.inputDisabled, ...selectStyles.inputCursorDisabled }
        : selectStyles.inputCursor),
      ...(error ? selectStyles.inputError : {}),
      ...(success ? selectStyles.inputSuccess : {}),
      boxShadow: 'none',
      outline: state.isFocused ? `2px solid ${color.light.system.focus}` : 'none',
      outlineOffset: 2,
      ':hover': { borderColor: selectStyles.inputInner.borderColor },
    }),
    valueContainer: base => ({ ...base, padding: 0, gap: 4, flexWrap: 'wrap' }),
    singleValue: base => ({ ...base, ...selectStyles.value, margin: 0 }),
    // La puce porte son propre fond : react-select ne doit pas le doubler.
    multiValue: () => ({ display: 'flex', margin: 0, padding: 0, backgroundColor: 'transparent' }),
    placeholder: base => ({ ...base, ...selectStyles.value, ...selectStyles.valuePlaceholder, margin: 0 }),
    input: base => ({ ...base, margin: 0, padding: 0 }),
    indicatorSeparator: () => ({ display: 'none' }),
    dropdownIndicator: base => ({ ...base, padding: 0 }),
    clearIndicator: base => ({ ...base, padding: 0 }),
    menu: base => ({ ...base, ...listStyles.panel, marginTop: 4, overflow: 'hidden' }),
    menuList: base => ({ ...base, padding: 0, maxHeight: SELECT_ROW_HEIGHT * 9 }),
    // Le fond et l'espacement appartiennent à SelectItem : react-select ne doit pas les doubler.
    option: () => ({ padding: 0, backgroundColor: 'transparent' }),
    group: base => ({ ...base, paddingTop: 0, paddingBottom: 0 }),
    groupHeading: () => ({ ...listStyles.groupHeader, marginBottom: 0 }),
    noOptionsMessage: base => ({ ...base, ...listStyles.emptyMessage }),
    loadingMessage: base => ({ ...base, ...listStyles.emptyMessage }),
  };

  const selectComponents = useSelectComponents({
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

  const fieldProps = selectFieldProps({
    props,
    multiple,
    selectedOptions,
    groupedOptions,
    styles,
    components: selectComponents,
    onSearch: debouncedSearchChange,
    loadingMessage,
    emptyMessage,
  });

  return (
    <FormControl style={selectStyles.pickerContainer}>
      <InputHeading>
        {!!label && (
          <FormControlLabel labelRight={labelRight} label={label} disabled={disabled} error={error} success={success} />
        )}
        {!!hint && <FormControlHint hint={hint} disabled={disabled} />}
      </InputHeading>

      <Box tag="form-control-select-input" style={selectStyles.inputContainer}>
        {creatable ? (
          <CreatableSelect<SelectOption, boolean, Group>
            {...fieldProps}
            ref={instanceRef}
            onCreateOption={query => onCreateOption?.(query.trim())}
            formatCreateLabel={query => createLabel(query.trim())}
            createOptionPosition="first"
          />
        ) : (
          <ReactSelect<SelectOption, boolean, Group> {...fieldProps} ref={instanceRef} />
        )}
      </Box>

      {(error || success) && <FormControlCaption error={error} success={success} />}
    </FormControl>
  );
});
