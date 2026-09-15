import { focusRing } from '@alveole/theme';
import React, { CSSProperties, useState } from 'react';
import { Pressable, PressableProps, PressableStateCallbackType, View } from 'react-native';
import { Box, BoxProps } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { IconProps, LucideIcon } from '../LucideIcon';
import { Spinner } from '../Spinner';
import { useStyles } from './Button.styles';

type CustomPressableState = PressableStateCallbackType & {
  hovered?: boolean;
};

export type ButtonProps = Omit<PressableProps, 'children' | 'style'> & {
  /** Sans `title`, le bouton passe en mode icône seule (nécessite `startIcon` ou `endIcon`). */
  title?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg'; // xs n'est pas censé exister
  variant: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'link'; // link n'est pas censé exister
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
type StyleKey = keyof Styles;
type EtatVisuel = { repos: StyleKey; desactive: StyleKey; actif: StyleKey };

/** Styles porteurs d'une couleur, seuls utilisables pour teinter une icone. */
type StyleCouleurKey = { [K in StyleKey]: Styles[K] extends { color: string } ? K : never }[StyleKey];
type EtatCouleur = { repos: StyleCouleurKey; desactive: StyleCouleurKey; actif: StyleCouleurKey };

/** Styles porteurs d'une bordure. Seuls `secondary` et `danger` en ont une. */
type StyleBordureKey = { [K in StyleKey]: Styles[K] extends { borderColor: string } ? K : never }[StyleKey];
type EtatBordure = { repos: StyleBordureKey; desactive: StyleBordureKey; actif: StyleBordureKey };

type Taille = NonNullable<ButtonProps['size']>;

/** Le conteneur change de famille de styles selon que le bouton porte un libelle ou non. */
const CONTENEUR_PAR_TAILLE: Record<Taille, { avecLibelle: StyleKey; iconeSeule: StyleKey }> = {
  xs: { avecLibelle: 'xsContainer', iconeSeule: 'xsContainerIconOnly' },
  sm: { avecLibelle: 'smContainer', iconeSeule: 'smContainerIconOnly' },
  md: { avecLibelle: 'mdContainer', iconeSeule: 'mdContainerIconOnly' },
  lg: { avecLibelle: 'lgContainer', iconeSeule: 'lgContainerIconOnly' },
};

const TITRE_PAR_TAILLE: Record<Taille, StyleKey> = {
  xs: 'xsTitle',
  sm: 'smTitle',
  md: 'mdTitle',
  lg: 'lgTitle',
};

// `disabled` vient de PressableProps, qui autorise `null` en plus de `undefined`.
type EtatDeFond = {
  variant: ButtonProps['variant'];
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
  const etat = disabled ? etats.desactive : isActivated ? etats.actif : undefined;

  return { ...styles[etats.repos], ...(etat ? styles[etat] : {}) };
};

/** `link` n'a pas de style desactive propre et emprunte celui de `tertiary`. */
const CONTENEUR_PAR_VARIANT: Record<ButtonProps['variant'], EtatVisuel> = {
  primary: { repos: 'primaryContainer', desactive: 'primaryContainerDisabled', actif: 'primaryContainerPressed' },
  secondary: {
    repos: 'secondaryContainer',
    desactive: 'secondaryContainerDisabled',
    actif: 'secondaryContainerPressed',
  },
  tertiary: { repos: 'tertiaryContainer', desactive: 'tertiaryContainerDisabled', actif: 'tertiaryContainerPressed' },
  danger: { repos: 'dangerContainer', desactive: 'dangerContainerDisabled', actif: 'dangerContainerPressed' },
  link: { repos: 'linkContainer', desactive: 'tertiaryContainerDisabled', actif: 'linkContainerPressed' },
};

const BORDURE_PAR_VARIANT: Partial<Record<ButtonProps['variant'], EtatBordure>> = {
  secondary: {
    repos: 'secondaryContainer',
    desactive: 'secondaryContainerDisabled',
    actif: 'secondaryContainerHover',
  },
  danger: { repos: 'dangerContainer', desactive: 'dangerContainerDisabled', actif: 'dangerContainerHover' },
};

const SURVOL_PAR_VARIANT: Record<ButtonProps['variant'], StyleKey> = {
  primary: 'primaryContainerHover',
  secondary: 'secondaryContainerHover',
  tertiary: 'tertiaryContainerHover',
  danger: 'dangerContainerHover',
  link: 'linkContainerHover',
};

const TEXTE_PAR_VARIANT: Record<ButtonProps['variant'], EtatVisuel> = {
  primary: { repos: 'primaryTitle', desactive: 'primaryTitleDisabled', actif: 'primaryTitleHover' },
  secondary: { repos: 'secondaryTitle', desactive: 'secondaryTitleDisabled', actif: 'secondaryTitleHover' },
  tertiary: { repos: 'tertiaryTitle', desactive: 'tertiaryTitleDisabled', actif: 'tertiaryTitleHover' },
  danger: { repos: 'dangerTitle', desactive: 'dangerTitleDisabled', actif: 'dangerTitleHover' },
  link: { repos: 'linkTitle', desactive: 'tertiaryTitleDisabled', actif: 'linkTitleHover' },
};

const ICONE_PAR_VARIANT: Record<ButtonProps['variant'], EtatCouleur> = {
  primary: { repos: 'primaryIcon', desactive: 'primaryIconDisabled', actif: 'primaryIconHover' },
  secondary: { repos: 'secondaryIcon', desactive: 'secondaryIconDisabled', actif: 'secondaryIconHover' },
  tertiary: { repos: 'tertiaryIcon', desactive: 'tertiaryIconDisabled', actif: 'tertiaryIconHover' },
  danger: { repos: 'dangerIcon', desactive: 'dangerIconDisabled', actif: 'dangerIconHover' },
  link: { repos: 'linkIcon', desactive: 'linkIconDisabled', actif: 'linkTitleHover' },
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

  const taille: Taille = size ?? 'md';
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
      const etat = disabled ? etats.desactive : state.hovered ? etats.actif : undefined;
      applicableStyles = { ...applicableStyles, ...styles[etats.repos], ...(etat ? styles[etat] : {}) };
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

    const etats = ICONE_PAR_VARIANT[variant];
    const etat = disabled ? etats.desactive : state.hovered ? etats.actif : etats.repos;
    return { size: iconSize, color: styles[etat].color };
  };

  const getPressableStyle = (state: CustomPressableState) => {
    const sizeRadii =
      size === 'xs' || size === 'sm'
        ? {
            borderTopLeftRadius: styles.xsContainer.borderTopLeftRadius,
            borderBottomLeftRadius: styles.xsContainer.borderBottomLeftRadius,
            borderTopRightRadius: styles.xsContainer.borderTopRightRadius,
            borderBottomRightRadius: styles.xsContainer.borderBottomRightRadius,
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
        ? bordure(styles[disabled ? etats.desactive : state.hovered ? etats.actif : etats.repos].borderColor)
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
