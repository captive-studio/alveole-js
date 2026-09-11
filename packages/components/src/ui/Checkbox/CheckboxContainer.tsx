import React from 'react';
import { Checkbox as TamaguiCheckbox, CheckboxProps as TamaguiCheckboxProps, TamaguiElement } from 'tamagui';
import { useStyles } from './Checkbox.styles';
import { CheckboxSize, CheckboxVariant, resolveCheckboxSize } from './Checkbox.utils';

export type CheckboxElement = TamaguiElement;
export type CheckboxContainerProps = TamaguiCheckboxProps & {
  size?: CheckboxSize;
  /** @deprecated use `size` ('sm' | 'md') instead */
  variant?: CheckboxVariant;
  error?: string;
  success?: string;
};

export const CheckboxContainer = React.forwardRef<CheckboxElement, CheckboxContainerProps>(
  function Checkbox(props, ref) {
    const { size, variant, error, success, disabled, ...checkboxProps } = props;

    const styles = useStyles();

    const resolvedSize = resolveCheckboxSize(size, variant);
    const baseCheckboxStyles = { ...styles.checkbox, ...(resolvedSize === 'sm' ? styles.checkboxSm : {}) };

    const checkboxStyles = {
      ...baseCheckboxStyles,
      ...(disabled ? styles.checkboxDisabled : {}),
      ...(success ? styles.checkboxSuccess : {}),
      ...(error ? styles.checkboxError : {}),
      marginTop: 'auto',
      marginBottom: 'auto',
    };

    const checkboxHoverStyles = disabled ? styles.checkboxDisabled : baseCheckboxStyles;
    const checkboxFocusStyles = disabled ? styles.checkboxDisabled : baseCheckboxStyles;
    const checkboxPressStyles = disabled ? styles.checkboxDisabled : baseCheckboxStyles;

    return (
      <TamaguiCheckbox
        ref={ref}
        disabled={disabled}
        style={checkboxStyles}
        focusStyle={checkboxFocusStyles}
        hoverStyle={checkboxHoverStyles}
        pressStyle={checkboxPressStyles}
        {...checkboxProps}
      />
    );
  },
);
