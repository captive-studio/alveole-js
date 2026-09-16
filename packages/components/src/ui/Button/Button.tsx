import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { useStyles } from './Button.styles';
import { ButtonProps, CustomPressableState, etatDuBouton } from './Button.types';
import { ButtonContent } from './ButtonContent';
import { styleDuPressable } from './buttonStyling';

export * from './Button.types';

export const Button = React.forwardRef<View, ButtonProps>(function Button(props, ref) {
  const { type, disabled, isLoading, active = false, expanded = false, ...buttonProps } = props;
  const styles = useStyles();
  const etat = etatDuBouton(props);
  const [isFocused, setIsFocused] = useState(false);

  // Les props de style et de contenu voyagent dans `etat` et dans `ButtonContent` : les
  // retirer ici evite que le Pressable ne les repande sur la vue native.
  const {
    title,
    size,
    variant,
    startIcon,
    endIcon,
    selected,
    ContainerProps,
    fullWidth,
    noPadding,
    borderNone,
    leftAlign,
    ...pressableProps
  } = buttonProps;

  return (
    <Pressable
      ref={ref}
      disabled={disabled}
      accessibilityRole="button"
      {...(type === 'submit' ? { 'aria-selected': true } : {})}
      {...pressableProps}
      accessibilityState={{ disabled: !!disabled || !!isLoading, expanded }}
      onFocus={event => {
        setIsFocused(true);
        pressableProps.onFocus?.(event);
      }}
      onBlur={event => {
        setIsFocused(false);
        pressableProps.onBlur?.(event);
      }}
      style={(state: CustomPressableState) =>
        styleDuPressable(styles, etat, { hovered: !!state.hovered, focus: isFocused })
      }
    >
      {(state: CustomPressableState) => (
        <ButtonContent
          styles={styles}
          etat={etat}
          state={state}
          actif={!!state.pressed || active || expanded}
          props={props}
        />
      )}
    </Pressable>
  );
});
