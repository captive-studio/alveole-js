import { focusRingProps } from '@alveole/theme';
import { CSSProperties } from 'react';
import { Pressable, PressableProps, ViewStyle } from 'react-native';
import { Typography } from '../../core/Typography';
import { IconProps, LucideIcon } from '../LucideIcon';
import { EtatDuPointeur } from '../pointeur';
import { useStyles } from './Button.styles';
import { styleDuPressable } from './buttonStyling';
import {
  ButtonTaille,
  cleDEtat,
  CONTENEUR_PAR_VARIANT,
  EtatVisuel,
  HAUTEUR_PAR_TAILLE,
  ICONE_PAR_VARIANT,
  styleDe,
  SURVOL_PAR_VARIANT,
  TEXTE_PAR_VARIANT,
} from './buttonVariants';

export type ButtonIconProps = Omit<PressableProps, 'children' | 'style' | 'accessibilityLabel'> & {
  /**
   * Obligatoire : un bouton sans libelle n'a rien d'autre pour se decrire. Le rendre optionnel
   * laissait passer dix appels muets, qu'aucun audit ne pouvait signaler.
   */
  accessibilityLabel: string;
  size?: ButtonTaille;
  iconSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant: 'primary' | 'secondary' | 'tertiary';
} & {
  // Styles props
  style?: Pick<
    ViewStyle,
    | 'width'
    | 'height'
    | 'borderRadius'
    | 'borderTopLeftRadius'
    | 'borderBottomLeftRadius'
    | 'borderTopRightRadius'
    | 'borderBottomRightRadius'
    | 'backgroundColor'
  >;
} & { icon: IconProps['name'] | number };

/** Faute d'`iconSize`, l'icone suit la taille du bouton, en repliant `md` sur elle-meme. */
const ICONE_PAR_TAILLE: Record<ButtonTaille, NonNullable<ButtonIconProps['iconSize']>> = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

export const ButtonIcon = (props: ButtonIconProps) => {
  const { size, variant, disabled, style, iconSize: iconSizeProp, ...buttonProps } = props;
  const taille: ButtonTaille = size ?? 'md';
  const iconSize = iconSizeProp ?? ICONE_PAR_TAILLE[taille];

  const styles = useStyles();

  // Le survol tient ici le role que l'appui tient sur `Button` : c'est le seul etat actif
  // qu'un bouton sans libelle connaisse. D'ou l'etat actif emprunte a la table de survol,
  // le repos et le desactive restant ceux du conteneur.
  const etatsDuFond: EtatVisuel = { ...CONTENEUR_PAR_VARIANT[variant], actif: SURVOL_PAR_VARIANT[variant] };

  const containerStyle = (state: EtatDuPointeur) => ({
    justifyContent: styles.container.justifyContent,
    alignItems: styles.container.alignItems,
    transitionProperty: styles.container.transitionProperty,
    transitionDuration: styles.container.transitionDuration,
    transitionTimingFunction: styles.container.transitionTimingFunction,
    backgroundColor: {
      ...styles[etatsDuFond.repos],
      ...styleDe(styles, cleDEtat(etatsDuFond, { disabled, actif: state.hovered })),
    }.backgroundColor,
    ...styleDuPressable(styles, { variant, taille, disabled }, { hovered: !!state.hovered }),
    // Le socle de `Button` pose la hauteur du cran de controle ; le carre n'a qu'a la reprendre.
    width: styles[HAUTEUR_PAR_TAILLE[taille]].height,
    ...(style ?? {}),
  });

  const iconStyle = (state: { hovered: boolean }): Omit<IconProps, 'name'> => ({
    size: iconSize,
    color: styles[cleDEtat(ICONE_PAR_VARIANT[variant], { disabled, actif: state.hovered })].color,
  });

  const textStyle = (state: { hovered: boolean }): CSSProperties => {
    const etats = TEXTE_PAR_VARIANT[variant];

    return {
      ...styles.title,
      ...styles[etats.repos],
      ...styleDe(styles, cleDEtat(etats, { disabled, actif: state.hovered })),
      minWidth: 16,
    };
  };

  return (
    <Pressable
      accessibilityRole="button"
      style={containerStyle}
      disabled={disabled}
      {...focusRingProps()}
      {...buttonProps}
    >
      {(state: EtatDuPointeur) =>
        typeof props.icon === 'number' ? (
          <Typography style={{ ...textStyle({ hovered: !!state.hovered }) }}>{props.icon}</Typography>
        ) : (
          <LucideIcon name={props.icon} {...iconStyle({ hovered: !!state.hovered })} />
        )
      }
    </Pressable>
  );
};
