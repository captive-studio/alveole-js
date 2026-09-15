import { useTheme } from '@alveole/theme';
import React from 'react';
import ReactSelect, { components, StylesConfig } from 'react-select';
import { Box } from '../../core/Box';
import { FormControl, FormControlCaption, FormControlHint, FormControlLabel } from '../FormControl';
import { InputHeading } from '../InputHeading';
import { LucideIcon } from '../LucideIcon';
import type { SelectMultipleOption, SelectMultipleProps } from './SelectMultiple';
import { useStyles } from './SelectMultiple.styles';

export const SelectMultiple = React.forwardRef<any, SelectMultipleProps>(function SelectMultiple(props, ref) {
  const { value, label, labelRight, hint, error, success, placeholder = '', disabled, options, onChange } = props;

  const styles = useStyles();
  const { color } = useTheme();

  const selectStyles: StylesConfig<SelectMultipleOption, true> = {
    control: (s, p) => ({
      ...s,
      ...styles.control,
      ...(p.isDisabled ? styles.controlDisabled : {}),
      boxShadow: 'none',
      outline: p.isFocused ? `2px solid ${color.light.system.focus}` : 'none',
      outlineOffset: 2,
      ':hover': { borderColor: styles.control.borderColor },
    }),
    valueContainer: s => ({
      ...s,
      ...styles.valueContainer,
      padding: '0 8px',
    }),
    placeholder: s => ({ ...s, color: color.light.text['mention-grey'] }),
    multiValue: (s, p) => ({
      ...s,
      ...styles.multiValue,
      ...(p.isDisabled ? styles.multiValueDisabled : {}),
    }),
    multiValueRemove: (s, p) => ({
      ...s,
      ':hover': styles.multiValueRemoveHover,
      ...(p.isDisabled ? styles.multiValueRemoveDisabled : {}),
    }),
    dropdownIndicator: s => ({ ...s, ...styles.dropdownIndicator }),
    indicatorSeparator: () => ({ display: 'none' }),
    clearIndicator: s => ({ ...s, ...styles.clearIndicator }),
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

  const displayValue = React.useMemo(
    () => options?.filter(option => Array.isArray(value) && value.some(v => `${v}` === `${option.value}`)),
    [options, value],
  );

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
            value={displayValue}
            styles={selectStyles}
            isMulti
            placeholder={placeholder}
            options={options}
            noOptionsMessage={() => 'Aucun résultat'}
            onChange={selectedOptions => {
              if (Array.isArray(selectedOptions)) {
                onChange?.(selectedOptions.map(o => String(o.value)));
              } else {
                onChange?.([]);
              }
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
