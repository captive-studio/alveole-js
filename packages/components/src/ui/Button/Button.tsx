import { focusRingProps } from '@alveole/theme';
import React from 'react';
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
      // La bague de focus vient du CSS du theme, pose sur `:focus-visible` : cet attribut est
      // la demande. Un state React branche sur `onFocus` la montrerait aussi au clic, faute
      // de modalite dans le `focused` de react-native-web.
      {...focusRingProps()}
      style={(state: CustomPressableState) => styleDuPressable(styles, etat, { hovered: !!state.hovered })}
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
