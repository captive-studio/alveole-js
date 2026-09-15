import { useTheme } from '@alveole/theme';
import React from 'react';
import ReactSelect, {
  components,
  DropdownIndicatorProps,
  GroupBase,
  OptionProps,
  SelectInstance,
  SingleValueProps,
  StylesConfig,
} from 'react-select';
import { Box } from '../../core/Box';
import { FormControl, FormControlCaption, FormControlHint, FormControlLabel } from '../FormControl';
import { InputHeading } from '../InputHeading';
import { LucideIcon } from '../LucideIcon';
import { useStyles as useSelectStyles } from './Select.styles';
import type { SelectOption, SelectProps, SelectRef } from './Select.types';
import { SelectItem } from './SelectItem';
import { SELECT_ROW_HEIGHT, useStyles as useListStyles } from './SelectList.styles';

type Group = GroupBase<SelectOption>;

/** Regroupe les options consécutives partageant le même `group`. */
const toGroupedOptions = (options: SelectOption[]): SelectOption[] | Group[] => {
  if (!options.some(option => option.group)) return options;

  return options.reduce<{ label: string; options: SelectOption[] }[]>((groups, option) => {
    const label = option.group ?? '';
    const current = groups[groups.length - 1];
    if (current?.label === label) current.options.push(option);
    else groups.push({ label, options: [option] });
    return groups;
  }, []);
};

export const Select = React.forwardRef<SelectRef, SelectProps>(function Select(props, ref) {
  const {
    value,
    label,
    labelRight,
    hint,
    error,
    success,
    disabled,
    options,
    placeholder,
    clearable,
    onChange,
    onBlur,
    onFocus,
  } = props;

  const selectStyles = useSelectStyles();
  const listStyles = useListStyles();
  const { color } = useTheme();

  const instanceRef = React.useRef<SelectInstance<SelectOption, false, Group>>(null);

  React.useImperativeHandle(ref, () => ({
    focus: () => instanceRef.current?.focus(),
    blur: () => instanceRef.current?.blur(),
    open: () => instanceRef.current?.openMenu('first'),
    close: () => instanceRef.current?.blur(),
  }));

  const selectedOption = React.useMemo(() => options.find(option => option.value === value) ?? null, [options, value]);
  const groupedOptions = React.useMemo(() => toGroupedOptions(options), [options]);

  const styles: StylesConfig<SelectOption, false, Group> = {
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
    valueContainer: base => ({ ...base, padding: 0 }),
    singleValue: base => ({ ...base, ...selectStyles.value, margin: 0 }),
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
  };

  const Option = (optionProps: OptionProps<SelectOption, false, Group>) => (
    <components.Option {...optionProps}>
      <SelectItem
        label={optionProps.data.label}
        icon={optionProps.data.icon}
        selected={optionProps.isSelected}
        highlighted={optionProps.isFocused}
        disabled={optionProps.isDisabled}
      />
    </components.Option>
  );

  const SingleValue = (singleValueProps: SingleValueProps<SelectOption, false, Group>) => (
    <components.SingleValue {...singleValueProps}>
      <span style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        {singleValueProps.data.icon && (
          <LucideIcon size="sm" name={singleValueProps.data.icon} color={color.light.text['default-grey']} />
        )}
        {singleValueProps.data.label}
      </span>
    </components.SingleValue>
  );

  const DropdownIndicator = (indicatorProps: DropdownIndicatorProps<SelectOption, false, Group>) => (
    <components.DropdownIndicator {...indicatorProps}>
      <LucideIcon
        name="ChevronDown"
        size="sm"
        color={disabled ? color.light.text['disabled-grey'] : color.light.text['default-grey']}
      />
    </components.DropdownIndicator>
  );

  return (
    <FormControl style={selectStyles.pickerContainer}>
      <InputHeading>
        {!!label && (
          <FormControlLabel labelRight={labelRight} label={label} disabled={disabled} error={error} success={success} />
        )}
        {!!hint && <FormControlHint hint={hint} disabled={disabled} />}
      </InputHeading>

      <Box tag="form-control-select-input" style={selectStyles.inputContainer}>
        <ReactSelect<SelectOption, false, Group>
          ref={instanceRef}
          aria-label={label}
          value={selectedOption}
          options={groupedOptions}
          styles={styles}
          placeholder={placeholder ?? ''}
          isSearchable={false}
          isClearable={clearable}
          isDisabled={disabled}
          isOptionDisabled={option => option.disabled === true}
          noOptionsMessage={() => 'Aucune option'}
          onFocus={() => onFocus?.()}
          onBlur={() => onBlur?.()}
          onChange={option => onChange?.(option?.value ?? null)}
          components={{ Option, SingleValue, DropdownIndicator }}
        />
      </Box>

      {(error || success) && <FormControlCaption error={error} success={success} />}
    </FormControl>
  );
});
