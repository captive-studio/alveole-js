import { Picker, PickerProps } from '@react-native-picker/picker';
import React from 'react';
import { NativeSyntheticEvent, Platform, StyleProp, TextStyle } from 'react-native';
import { Box } from '../../core/Box';
import {
  FormControl,
  FormControlCaption,
  FormControlCaptionProps,
  FormControlHint,
  FormControlHintProps,
  FormControlLabel,
  FormControlLabelProps,
} from '../FormControl';
import { InputHeading } from '../InputHeading';
import { LucideIcon } from '../LucideIcon';
import { useStyles } from './Select.styles';
import { SelectInput } from './SelectInput';

export type SelectOption = { label: string; value: string };

export type SelectProps = Partial<Pick<PickerProps, 'onBlur' | 'onFocus'>> &
  FormControlLabelProps &
  FormControlHintProps &
  FormControlCaptionProps & {
    value: string | null;
    placeholder?: string;
    options: SelectOption[];
    onChange?: (value: string | null) => void;
  };

export const Select = React.forwardRef<Picker<string | number | object>, SelectProps>(function Select(props, ref) {
  const { value, label, labelRight, hint, error, success, disabled, options, placeholder, onChange, onBlur, onFocus } =
    props;

  const styles = useStyles();

  const [focus, setFocus] = React.useState(false);

  const handleFocus = (e: NativeSyntheticEvent<any>) => {
    if (!disabled) setFocus(true);
    onFocus?.(e);
  };

  const handleBlur = (e: NativeSyntheticEvent<any>) => {
    if (!disabled) setFocus(false);
    onBlur?.(e);
  };

  return (
    <FormControl style={styles.pickerContainer}>
      <InputHeading>
        {!!label && (
          <FormControlLabel labelRight={labelRight} label={label} disabled={disabled} error={error} success={success} />
        )}
        {!!hint && <FormControlHint hint={hint} disabled={disabled} />}
      </InputHeading>

      <Box tag="form-control-text-input" style={styles.inputContainer}>
        <Box
          tag="form-control-text-input-inner"
          style={{
            ...styles.inputInner,
            ...(disabled ? styles.inputDisabled : {}),
            ...(focus ? styles.inputFocused : {}),
            ...(error ? styles.inputError : {}),
            ...(success ? styles.inputSuccess : {}),
          }}
        >
          <SelectInput
            ref={ref}
            value={value}
            placeholder={placeholder}
            options={options}
            onChange={onChange}
            disabled={disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={styles.picker as StyleProp<TextStyle>}
          />

          {Platform.OS === 'web' && (
            <LucideIcon
              style={{ ...styles.indicator, ...(focus ? styles.indicatorFocus : {}) }}
              size="sm"
              name="ChevronDown"
            />
          )}
        </Box>
      </Box>

      {(error || success) && <FormControlCaption error={error} success={success} />}
    </FormControl>
  );
});
