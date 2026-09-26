import { focusRingProps } from '@alveole/theme';
import { Pressable, PressableProps, ViewStyle } from 'react-native';
import { Typography } from '../../core/Typography';
import { IconProps, LucideIcon } from '../LucideIcon';
import { EtatDuPointeur } from '../pointeur';
import { useStyles } from './Button.styles';
import { apparenceDeLIcone, EtatDuBoutonIcone, styleDuCadreDIcone, styleDuNombre } from './buttonIconStyling';
import { ButtonTaille } from './buttonVariants';

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

export const ButtonIcon = (props: ButtonIconProps) => {
  const { size, variant, disabled, style, iconSize, ...buttonProps } = props;
  const etat: EtatDuBoutonIcone = { variant, taille: size ?? 'md', disabled, iconSize, style };
  const styles = useStyles();

  return (
    <Pressable
      accessibilityRole="button"
      style={(state: EtatDuPointeur) => styleDuCadreDIcone(styles, etat, !!state.hovered)}
      disabled={disabled}
      {...focusRingProps()}
      {...buttonProps}
    >
      {(state: EtatDuPointeur) =>
        typeof props.icon === 'number' ? (
          <Typography style={styleDuNombre(styles, etat, !!state.hovered)}>{props.icon}</Typography>
        ) : (
          <LucideIcon name={props.icon} {...apparenceDeLIcone(styles, etat, !!state.hovered)} />
        )
      }
    </Pressable>
  );
};
