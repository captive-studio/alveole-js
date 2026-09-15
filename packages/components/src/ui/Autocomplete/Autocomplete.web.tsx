import { useTheme } from '@alveole/theme';
import React, { useEffect, useMemo, useState } from 'react';
import ReactSelect, { components, GroupBase, StylesConfig } from 'react-select';
import { Box } from '../../core/Box';
import { FormControl, FormControlCaption, FormControlHint, FormControlLabel } from '../FormControl';
import { InputHeading } from '../InputHeading';
import { LucideIcon } from '../LucideIcon';
import { AutocompleteOption, AutocompleteProps } from './Autocomplete';
import { useStyles } from './Autocomplete.styles';

export const Autocomplete = React.forwardRef<any, AutocompleteProps>(function Select(props, ref) {
  const {
    value,
    disabledFilterSearch,
    label,
    labelRight,
    hint,
    error,
    success,
    placeholder,
    disabled,
    isMulti,
    isSearchable,
    onChange,
    onSearchChange,
  } = props;

  const styles = useStyles();
  const { color, spacing } = useTheme();

  const [selectedOptions, setSelectedOptions] = useState(value ?? []);
  const [syncedValueKey, setSyncedValueKey] = useState(() => value?.map(o => o.value).join('|') ?? '');
  const [searchValue, setSearchValue] = useState('');

  const isGrouped = props.options.length > 0 && 'group' in props.options[0];

  const currentValueKey = value?.map(o => o.value).join('|') ?? '';
  if (syncedValueKey !== currentValueKey) {
    setSyncedValueKey(currentValueKey);
    setSelectedOptions(value ?? []);
  }

  const options = useMemo(() => {
    if (isGrouped) {
      const groups = new Map<string, any[]>();
      for (const opt of props.options as any[]) {
        const existing = groups.get(opt.group) ?? [];
        groups.set(opt.group, [...existing, opt]);
      }
      return Array.from(groups.entries()).map(([label, opts]) => ({ label, options: opts }));
    }
    const differentOptions = (props.options as any[]).filter(option => !selectedOptions.includes(option));
    const allOptions = [...differentOptions, ...selectedOptions];
    return allOptions.length === 0 ? undefined : allOptions;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.options, isGrouped]);

  const selectStyles: StylesConfig<AutocompleteOption, true, GroupBase<AutocompleteOption>> = {
    control: (s, p) => ({
      ...s,
      ...styles.control,
      ...(p.isDisabled ? styles.controlDisabled : {}),
      boxShadow: 'none',
      outline: p.isFocused ? `2px solid ${color.light.system.focus}` : 'none',
      outlineOffset: 2,
      ':hover': { borderColor: styles.control.borderColor },
    }),
    multiValue: (s, p) => ({
      ...s,
      ...styles.multiValue,
      ...(p.isDisabled ? styles.multiValueDisabled : {}),
      ...(isMulti !== false ? {} : { padding: 0, margin: 0 }),
      ...(isMulti !== false ? {} : { backgroundColor: 'transparent', fontSize: 16 }),
    }),
    multiValueLabel: s => ({ ...s, fontSize: 14 }),
    multiValueRemove: (s, p) => ({
      ...s,
      ':hover': styles.multiValueRemoveHover,
      ...(p.isDisabled ? styles.multiValueRemoveDisabled : {}),
      ...(isMulti !== false ? {} : { display: 'none' }),
    }),
    dropdownIndicator: (s, p) => ({
      ...s,
      ...styles.dropdownIndicator,
      ...(p.isDisabled ? styles.dropdownIndicatorDisabled : {}),
    }),
    indicatorSeparator: () => ({ display: 'none' }),
    placeholder: s => ({ ...s, color: color.light.text['mention-grey'] }),
    clearIndicator: s => ({ ...s, ...styles.clearIndicator }),
    valueContainer: s => ({
      ...s,
      ...(isMulti !== false ? { padding: '0 8px' } : {}),
    }),
    group: s => ({ ...s, paddingTop: 0, paddingBottom: 0 }),
    groupHeading: () => ({
      backgroundColor: color.light.background['disabled-grey'],
      padding: `${spacing('050')}px ${spacing('100')}px`,
      fontSize: 11,
      fontWeight: 600,
      color: color.light.text['default-grey'],
      textTransform: 'uppercase' as const,
      marginBottom: 0,
      letterSpacing: 0.5,
    }),
  };

  const MultiValueRemove = (props: any) => (
    <components.MultiValueRemove {...props}>
      <LucideIcon name="X" size="xs" color={color.light.text['default-grey']} />
    </components.MultiValueRemove>
  );

  const DropdownIndicator = (props: any) => (
    <components.DropdownIndicator {...props}>
      <LucideIcon
        name="ChevronDown"
        size="sm"
        color={props.isDisabled ? color.light.text['disabled-grey'] : color.light.text['default-grey']}
      />
    </components.DropdownIndicator>
  );

  const clearValues = () => {
    setSelectedOptions([]);
    onChange?.([]);
  };

  const onSingleChange = (value: any) => {
    if (typeof value != 'object' || value === null) return clearValues();
    setSelectedOptions([value]);
    return onChange?.([value]);
  };

  const onMultiChange = (values: any[]) => {
    if (typeof value != 'object' || value === null) return clearValues();
    setSelectedOptions(values);
    return onChange?.(values);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      const newSearchValue = searchValue ?? '';
      onSearchChange?.(newSearchValue);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  return (
    <FormControl style={styles.select}>
      <InputHeading>
        {!!label && (
          <FormControlLabel labelRight={labelRight} label={label} disabled={disabled} error={error} success={success} />
        )}
        {!!hint && <FormControlHint hint={hint} disabled={disabled} />}
      </InputHeading>

      <Box tag="form-control-select-input" style={styles.inputContainer}>
        <Box style={{ ...(disabled ? styles.inputDisabled : {}) }}>
          <ReactSelect
            ref={ref}
            aria-label={label}
            value={selectedOptions}
            styles={selectStyles}
            isMulti
            placeholder={placeholder}
            options={options}
            filterOption={disabledFilterSearch ? () => true : undefined}
            isSearchable={isSearchable}
            onInputChange={inputValue => setSearchValue(inputValue)}
            noOptionsMessage={() => 'Aucun résultat'}
            onChange={options => {
              const lastOption = Array.isArray(options) ? options[options.length - 1] : undefined;
              if (isMulti === false && lastOption) return onSingleChange(lastOption);
              if (Array.isArray(options)) return onMultiChange(options);
              return clearValues();
            }}
            isDisabled={disabled}
            components={{ DropdownIndicator, MultiValueRemove }}
          />
        </Box>
      </Box>

      {(error || success) && <FormControlCaption error={error} success={success} />}
    </FormControl>
  );
});
