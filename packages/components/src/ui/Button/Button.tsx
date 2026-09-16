import { focusRing } from '@alveole/theme';
import React, { CSSProperties, useState } from 'react';
import { Pressable, PressableProps, PressableStateCallbackType, View } from 'react-native';
import { Box, BoxProps } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { IconProps, LucideIcon } from '../LucideIcon';
import { Spinner } from '../Spinner';
import { useStyles } from './Button.styles';
import {
  BORDURE_PAR_VARIANT,
  ButtonTaille,
  ButtonVariant,
  cleDEtat,
  CONTENEUR_PAR_TAILLE,
  CONTENEUR_PAR_VARIANT,
  ICONE_PAR_VARIANT,
  styleDe,
  SURVOL_PAR_VARIANT,
  TEXTE_PAR_VARIANT,
  TITRE_PAR_TAILLE,
} from './buttonVariants';

type CustomPressableState = PressableStateCallbackType & {
  hovered?: boolean;
};

export type ButtonProps = Omit<PressableProps, 'children' | 'style'> & {
  /** Sans `title`, le bouton passe en mode icône seule (nécessite `startIcon` ou `endIcon`). */
  title?: string;
  size?: ButtonTaille;
  variant: ButtonVariant;
  startIcon?: IconProps['name'];
  endIcon?: IconProps['name'];
  selected?: boolean;
  ContainerProps?: BoxProps;
  fullWidth?: boolean;
  noPadding?: boolean;
  borderNone?: boolean;
  leftAlign?: boolean;
  type?: 'button' | 'submit';
  /** @deprecated Utiliser `expanded`, qui decrit un menu deplie et pose l'etat accessible. */
  active?: boolean;
  /** Le bouton commande un menu ou un panneau actuellement deplie. */
  expanded?: boolean;
  isLoading?: boolean;
};

type Styles = ReturnType<typeof useStyles>;

// `disabled` vient de PressableProps, qui autorise `null` en plus de `undefined`.
type EtatDeFond = {
  variant: ButtonVariant;
  selected?: boolean;
  disabled?: boolean | null;
  isActivated: boolean;
};

/**
 * Choisit le style de fond du conteneur. `selected` court-circuite la variante : un bouton
 * selectionne a le meme fond quelle que soit sa variante et quel que soit son etat.
 */
const styleDeFond = (styles: Styles, { variant, selected, disabled, isActivated }: EtatDeFond) => {
  if (selected) return styles.selectedContainer;

  const etats = CONTENEUR_PAR_VARIANT[variant];

  return { ...styles[etats.repos], ...styleDe(styles, cleDEtat(etats, { disabled, actif: isActivated })) };
};

export const Button = React.forwardRef<View, ButtonProps>(function Button(props, ref) {
  const {
    title,
    type,
    size,
    variant,
    disabled,
    startIcon,
    endIcon,
    noPadding,
    borderNone,
    leftAlign,
    isLoading,
    selected,
    fullWidth = false,
    ContainerProps = {},
    active = false,
    expanded = false,
    ...buttonProps
  } = props;
  const { style, hoverStyle, ...containerProps } = ContainerProps;

  const styles = useStyles();

  const isIconOnly = !title;
  const isInactive = !!disabled || !!isLoading;
  const [isFocused, setIsFocused] = useState(false);

  const taille: ButtonTaille = size ?? 'md';
  const containerSize = styles[CONTENEUR_PAR_TAILLE[taille][isIconOnly ? 'iconeSeule' : 'avecLibelle']];
  const titleSize = styles[TITRE_PAR_TAILLE[taille]];

  const noPaddingStyle = { paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0 };

  const buttonContainerStyle = (state?: { pressed?: boolean }) => {
    const isActivated = !!state?.pressed || active || expanded;

    return {
      ...styles.container,
      ...styleDeFond(styles, { variant, selected, disabled, isActivated }),
      ...containerSize,
      ...(noPadding ? noPaddingStyle : {}),
      ...(leftAlign ? { justifyContent: 'left' } : {}),
      borderWidth: 0,
      borderColor: undefined,
      borderStyle: undefined,
      ...(borderNone
        ? {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }
        : {}),
    };
  };

  const buttonContainerHoverStyle = () => {
    if (disabled) return {};
    if (selected) return styles.selectedContainerHover;
    return styles[SURVOL_PAR_VARIANT[variant]];
  };

  const textStyle = (state: { hovered: boolean; pressed: boolean }) => {
    let applicableStyles: CSSProperties = styles.title;

    if (selected) {
      applicableStyles = { ...applicableStyles, ...styles.selectedTitle };
    } else {
      const etats = TEXTE_PAR_VARIANT[variant];
      const etat = cleDEtat(etats, { disabled, actif: state.hovered });
      applicableStyles = { ...applicableStyles, ...styles[etats.repos], ...styleDe(styles, etat) };
      // Seul `danger` distingue l'appui du survol sur son libelle.
      if (variant === 'danger' && !disabled && !state.hovered && state.pressed) {
        applicableStyles = { ...applicableStyles, ...styles.dangerTitlePressed };
      }
    }

    return { ...applicableStyles, ...titleSize };
  };

  const iconStyle = (state: { hovered: boolean }): Omit<IconProps, 'name'> => {
    const iconSize = size === 'lg' ? 'md' : 'sm';

    if (selected) return { size: iconSize, color: styles.selectedIcon.color };

    const etat = cleDEtat(ICONE_PAR_VARIANT[variant], { disabled, actif: state.hovered });

    return { size: iconSize, color: styles[etat].color };
  };

  const getPressableStyle = (state: CustomPressableState) => {
    const sizeRadii =
      size === 'sm'
        ? {
            borderTopLeftRadius: styles.smContainer.borderTopLeftRadius,
            borderBottomLeftRadius: styles.smContainer.borderBottomLeftRadius,
            borderTopRightRadius: styles.smContainer.borderTopRightRadius,
            borderBottomRightRadius: styles.smContainer.borderBottomRightRadius,
          }
        : {
            borderTopLeftRadius: styles.container.borderTopLeftRadius,
            borderBottomLeftRadius: styles.container.borderBottomLeftRadius,
            borderTopRightRadius: styles.container.borderTopRightRadius,
            borderBottomRightRadius: styles.container.borderBottomRightRadius,
          };

    const radiusStyle = borderNone
      ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0 }
      : sizeRadii;

    const bordure = (borderColor: string) => ({ borderWidth: 1, borderStyle: 'solid' as const, borderColor });

    const etats = BORDURE_PAR_VARIANT[variant];
    const borderProps = selected
      ? bordure(styles.selectedContainer.borderColor)
      : etats
        ? bordure(styles[cleDEtat(etats, { disabled, actif: state.hovered })].borderColor)
        : {};

    return {
      ...radiusStyle,
      ...borderProps,
      overflow: 'hidden' as const,
      ...(fullWidth ? { width: '100%' as const } : {}),
      ...(isFocused ? focusRing('default') : {}),
    };
  };

  return (
    <Pressable
      ref={ref}
      disabled={disabled}
      accessibilityRole="button"
      {...(type === 'submit' ? { 'aria-selected': true } : {})}
      {...buttonProps}
      accessibilityState={{ disabled: isInactive, expanded }}
      onFocus={event => {
        setIsFocused(true);
        buttonProps.onFocus?.(event);
      }}
      onBlur={event => {
        setIsFocused(false);
        buttonProps.onBlur?.(event);
      }}
      style={(state: CustomPressableState) => getPressableStyle(state)}
    >
      {(state: CustomPressableState) => (
        <Box
          style={[buttonContainerStyle({ pressed: state.pressed }), style]}
          hoverStyle={{ ...buttonContainerHoverStyle(), ...hoverStyle }}
          {...containerProps}
        >
          {startIcon && <LucideIcon name={startIcon} {...iconStyle({ hovered: !!state.hovered })} />}
          {!isIconOnly && (
            <Typography user-select="false" style={textStyle({ hovered: !!state.hovered, pressed: !!state.pressed })}>
              {title}
            </Typography>
          )}
          {isLoading ? (
            <Spinner size="sm" delay="long" style={styles.buttonLoader} />
          ) : (
            endIcon && <LucideIcon name={endIcon} {...iconStyle({ hovered: !!state.hovered })} />
          )}
        </Box>
      )}
    </Pressable>
  );
});
