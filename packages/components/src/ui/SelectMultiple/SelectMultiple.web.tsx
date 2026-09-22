import { useTheme } from '@alveole/theme';
import React from 'react';
import ReactSelect, { components, DropdownIndicatorProps, MultiValueRemoveProps, SelectInstance } from 'react-select';
import { Box } from '../../core/Box';
import { FieldFrame } from '../FormControl';
import { LucideIcon } from '../LucideIcon';
import type { SelectMultipleOption, SelectMultipleProps } from './SelectMultiple';
import { useStyles } from './SelectMultiple.styles';
import { selectMultipleStylesConfig } from './selectMultipleStylesConfig';

const MultiValueRemove = (props: MultiValueRemoveProps<SelectMultipleOption, true>) => {
  const { color } = useTheme();

  return (
    <components.MultiValueRemove {...props}>
      <LucideIcon name="X" size="xs" color={color.light.text['default-grey']} />
    </components.MultiValueRemove>
  );
};

const DropdownIndicator = (props: DropdownIndicatorProps<SelectMultipleOption, true>) => {
  const { color } = useTheme();

  return (
    <components.DropdownIndicator {...props}>
      <LucideIcon
        name="ChevronDown"
        size="sm"
        color={props.isDisabled ? color.light.text['disabled-grey'] : color.light.text['default-grey']}
      />
    </components.DropdownIndicator>
  );
};

export const SelectMultiple = React.forwardRef<SelectInstance<SelectMultipleOption, true>, SelectMultipleProps>(
  function SelectMultiple(props, ref) {
    const { value, label, error, success, placeholder = '', disabled, options, onChange } = props;

    const styles = useStyles();
    const { color } = useTheme();

    const displayValue = React.useMemo(
      () => options?.filter(option => Array.isArray(value) && value.some(v => `${v}` === `${option.value}`)),
      [options, value],
    );

    return (
      <FieldFrame {...props} style={styles.select}>
        <Box tag="form-control-select-input" style={styles.inputContainer}>
          <Box style={{ ...(disabled ? styles.inputDisabled : {}) }}>
            <ReactSelect
              ref={ref}
              aria-label={label}
              value={displayValue}
              styles={selectMultipleStylesConfig(
                styles,
                { placeholder: color.light.text['mention-grey'] },
                {
                  error,
                  success,
                },
              )}
              isMulti
              placeholder={placeholder}
              options={options}
              noOptionsMessage={() => 'Aucun résultat'}
              // Un effacement complet remonte une liste vide, jamais une absence de valeur.
              onChange={selectedOptions => onChange?.((selectedOptions ?? []).map(option => String(option.value)))}
              isDisabled={disabled}
              components={{ DropdownIndicator, MultiValueRemove }}
            />
          </Box>
        </Box>
      </FieldFrame>
    );
  },
);
