import { focusRingProps } from '@alveole/theme';
import React from 'react';
import { Pressable, View } from 'react-native';
import { EtatDuPointeur } from '../pointeur';
import { useStyles } from './Button.styles';
import { ButtonProps, etatDuBouton } from './Button.types';
import { ButtonContent } from './ButtonContent';
import { styleDuPressable } from './buttonStyling';

export * from './Button.types';

export const Button = React.forwardRef<View, ButtonProps>(function Button(props, ref) {
  const { type, disabled, isLoading, active = false, expanded = false, ...buttonProps } = props;
  const styles = useStyles();
  const etat = etatDuBouton(props);
  /** Ne repond plus : desactive par l'appelant, ou occupe a charger. */
  const inerte = !!disabled || !!isLoading;

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
    loadingDelay,
    ...pressableProps
  } = buttonProps;

  return (
    <Pressable
      ref={ref}
      // `inerte` plutot que `disabled` seul, et il n'entre pas dans `etat` : le Pressable se
      // ferme aux clics et pose `aria-disabled`, mais l'apparence reste celle du repos. C'est
      // le choix de Primer, qui pose `aria-disabled` et retire son `onClick` sans griser le
      // bouton pendant qu'il charge.
      disabled={inerte}
      accessibilityRole="button"
      {...(type === 'submit' ? { 'aria-selected': true } : {})}
      {...pressableProps}
      accessibilityState={{ disabled: inerte, expanded }}
      // `accessibilityState` ne produit aucun attribut avec cette version de
      // react-native-web : l'etat deplie se pose donc directement. `undefined` plutot que
      // `false`, pour qu'un bouton qui ne commande aucun panneau n'annonce pas qu'il en a un.
      aria-expanded={expanded || undefined}
      // La bague de focus vient du CSS du theme, pose sur `:focus-visible` : cet attribut est
      // la demande. Un state React branche sur `onFocus` la montrerait aussi au clic, faute
      // de modalite dans le `focused` de react-native-web.
      {...focusRingProps()}
      style={(state: EtatDuPointeur) => styleDuPressable(styles, etat, { hovered: !!state.hovered })}
    >
      {(state: EtatDuPointeur) => (
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
