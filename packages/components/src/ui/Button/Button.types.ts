import { PressableProps, PressableStateCallbackType } from 'react-native';
import { BoxProps } from '../../core/Box';
import { IconProps } from '../LucideIcon';
import { ButtonTaille, ButtonVariant } from './buttonVariants';

/** `hovered` n'est pas dans le type de React Native, mais react-native-web le fournit. */
export type CustomPressableState = PressableStateCallbackType & {
  hovered?: boolean;
};

export type ButtonProps = Omit<PressableProps, 'children' | 'style'> & {
  /**
   * Obligatoire : un bouton porte toujours un libellé. Pour un bouton carré sans libellé,
   * c'est `ButtonIcon` qu'il faut prendre - lui seul rend `accessibilityLabel` obligatoire.
   * Tant que l'absence de `title` suffisait à basculer ici en mode icône seule, rien
   * n'empêchait d'écrire un bouton muet : deux des quatre appels mesurés dans les
   * applications l'étaient. Atlassian rend de même ses `children` obligatoires.
   */
  title: string;
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

/**
 * Ce que les styles ont besoin de savoir du bouton, une fois les defauts resolus. Le separer
 * de `ButtonProps` evite de passer les rappels et les props d'accessibilite a des fonctions
 * qui n'ont rien a en faire.
 */
export type EtatDuBouton = {
  variant: ButtonVariant;
  taille: ButtonTaille;
  selected?: boolean;
  disabled?: boolean | null;
  noPadding?: boolean;
  borderNone?: boolean;
  leftAlign?: boolean;
  fullWidth?: boolean;
};

export const etatDuBouton = (props: ButtonProps): EtatDuBouton => ({
  variant: props.variant,
  taille: props.size ?? 'md',
  selected: props.selected,
  disabled: props.disabled,
  noPadding: props.noPadding,
  borderNone: props.borderNone,
  leftAlign: props.leftAlign,
  fullWidth: props.fullWidth,
});
