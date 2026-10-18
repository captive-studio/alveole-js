import { focusRingProps } from '@alveole/theme';
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

    // Survol et appui reprenaient le style de repos pour masquer ceux de Tamagui : en v3, le
    // style inline l'emporte sur ses clauses. La bague passe par la seule marque du theme
    // (ADR 0017, amendement Tamagui v3).

    return (
      <TamaguiCheckbox ref={ref} disabled={disabled} style={checkboxStyles} {...focusRingProps()} {...checkboxProps} />
    );
  },
);
