import { CSSProperties } from 'react';
import { Pressable, PressableProps, PressableStateCallbackType } from 'react-native';
import { Typography } from '../../core/Typography';
import { IconProps, LucideIcon } from '../LucideIcon';
import { useStyles } from './Button.styles';
import {
  ButtonTaille,
  cleDEtat,
  CONTENEUR_PAR_TAILLE,
  CONTENEUR_PAR_VARIANT,
  EtatVisuel,
  ICONE_PAR_VARIANT,
  styleDe,
  SURVOL_PAR_VARIANT,
  TEXTE_PAR_VARIANT,
} from './buttonVariants';

type CustomPressableState = PressableStateCallbackType & {
  hovered?: boolean;
};

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
  style?: {
    width?: number | string;
    height?: number | string;
    borderTop?: string;
    borderBottom?: string;
    borderLeft?: string;
    borderRight?: string;
    borderRadius?: number;
    borderTopLeftRadius?: number;
    borderBottomLeftRadius?: number;
    borderTopRightRadius?: number;
    borderBottomRightRadius?: number;
    backgroundColor?: string;
  };
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

  const containerSize = styleDe(styles, CONTENEUR_PAR_TAILLE[taille].iconeSeule);

  // Le survol tient ici le role que l'appui tient sur `Button` : c'est le seul etat actif
  // qu'un bouton sans libelle connaisse. D'ou l'etat actif emprunte a la table de survol,
  // le repos et le desactive restant ceux du conteneur.
  const etatsDuFond: EtatVisuel = { ...CONTENEUR_PAR_VARIANT[variant], actif: SURVOL_PAR_VARIANT[variant] };

  const containerStyle = (state: CustomPressableState) => ({
    ...styles.container,
    ...styles[etatsDuFond.repos],
    ...styleDe(styles, cleDEtat(etatsDuFond, { disabled, actif: state.hovered })),
    ...containerSize,
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
    // Le systeme de design decrit ses styles en vocabulaire CSS, la ou `Pressable` attend un
    // `ViewStyle` : les deux se recouvrent sans se confondre, `backgroundColor` par exemple n'y
    // a pas le meme type. La conversion est explicite ici parce que c'est la frontiere. Le code
    // precedent l'effacait en typant son accumulateur `any`, ce qui masquait aussi le reste.
    <Pressable
      accessibilityRole="button"
      style={containerStyle as PressableProps['style']}
      disabled={disabled}
      {...buttonProps}
    >
      {(state: CustomPressableState) =>
        typeof props.icon === 'number' ? (
          <Typography style={{ ...textStyle({ hovered: !!state.hovered }) }}>{props.icon}</Typography>
        ) : (
          <LucideIcon name={props.icon} {...iconStyle({ hovered: !!state.hovered })} />
        )
      }
    </Pressable>
  );
};
