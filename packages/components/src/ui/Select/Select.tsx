import { useTheme } from '@alveole/theme';
import React from 'react';
import { Keyboard, Pressable, StyleProp, ViewStyle } from 'react-native';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { FormControl, FormControlCaption, FormControlHint, FormControlLabel } from '../FormControl';
import { InputHeading } from '../InputHeading';
import { LucideIcon } from '../LucideIcon';
import { useStyles } from './Select.styles';
import type { SelectProps, SelectRef } from './Select.types';
import { SelectBottomSheet } from './SelectBottomSheet';

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
    sheetTitle,
    clearable,
    onChange,
    onBlur,
    onFocus,
  } = props;

  const styles = useStyles();
  const { color } = useTheme();

  const [open, setOpen] = React.useState(false);

  const selectedOption = React.useMemo(() => options.find(option => option.value === value), [options, value]);

  const openSheet = React.useCallback(() => {
    if (disabled) return;
    if (Keyboard.isVisible()) Keyboard.dismiss();
    setOpen(true);
    onFocus?.();
  }, [disabled, onFocus]);

  const closeSheet = React.useCallback(() => {
    setOpen(false);
    onBlur?.();
  }, [onBlur]);

  const handleOpenChange = React.useCallback(
    (nextOpen: boolean) => {
      if (nextOpen) openSheet();
      else closeSheet();
    },
    [closeSheet, openSheet],
  );

  React.useImperativeHandle(ref, () => ({ focus: openSheet, blur: closeSheet, open: openSheet, close: closeSheet }), [
    closeSheet,
    openSheet,
  ]);

  const iconColor = disabled ? color.light.text['disabled-grey'] : color.light.text['default-grey'];

  return (
    <FormControl style={styles.pickerContainer}>
      <InputHeading>
        {!!label && (
          <FormControlLabel labelRight={labelRight} label={label} disabled={disabled} error={error} success={success} />
        )}
        {!!hint && <FormControlHint hint={hint} disabled={disabled} />}
      </InputHeading>

      <Box tag="form-control-select-input" style={styles.inputContainer}>
        <Pressable
          testID="select-trigger"
          accessibilityRole="button"
          accessibilityState={{ disabled: Boolean(disabled), expanded: open }}
          disabled={disabled}
          onPress={openSheet}
          // `makeStyles` produit des CSSProperties (spacing renvoie une CSS var sur web) :
          // le cast est le même que celui des autres champs, cf. FormControl/TextInput.
          style={
            {
              ...styles.inputInner,
              ...(disabled ? styles.inputDisabled : {}),
              ...(open ? styles.inputFocused : {}),
              ...(error ? styles.inputError : {}),
              ...(success ? styles.inputSuccess : {}),
            } as StyleProp<ViewStyle>
          }
        >
          {selectedOption?.icon && <LucideIcon size="sm" name={selectedOption.icon} color={iconColor} />}

          <Typography
            style={{
              ...styles.value,
              ...(selectedOption ? {} : styles.valuePlaceholder),
              ...(disabled ? styles.valueDisabled : {}),
            }}
          >
            {selectedOption?.label ?? placeholder ?? ''}
          </Typography>

          <LucideIcon size="sm" name="ChevronDown" color={iconColor} />
        </Pressable>
      </Box>

      {(error || success) && <FormControlCaption error={error} success={success} />}

      <SelectBottomSheet
        open={open}
        setOpen={handleOpenChange}
        title={sheetTitle ?? label}
        options={options}
        value={value}
        onSelect={nextValue => onChange?.(nextValue)}
        clearable={clearable}
      />
    </FormControl>
  );
});
