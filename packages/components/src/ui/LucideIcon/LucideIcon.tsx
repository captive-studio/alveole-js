import { ComponentProps } from 'react';
import { Platform, StyleProp, ViewStyle } from 'react-native';
import { versStyleNatif } from '../../core/styleNatif/versStyleNatif';
import { LucideIconName, LucideIconProps } from './LucideIcon.props';
import * as LabIcons from './vendor/lab';
import * as LucideIcons from './vendor/lucide';
import { Icon as BaseIcon, LucideIcon as Icon } from './vendor/lucide';

export const strokeWidth = 1.5;

export type IconProps = LucideIconProps;

// Les deux paquets vendor exposent leurs icones comme exports nommes : c'est un objet de module,
// pas une table indexable par un nom calcule. Les aplatir une fois au chargement donne la table
// que le rendu cherchait, sans forcer le typage et sans la reconstruire a chaque icone rendue.
const iconesLucide = Object.fromEntries(Object.entries(LucideIcons)) as Record<string, Icon | undefined>;
const iconesLab = Object.fromEntries(Object.entries(LabIcons)) as Record<
  string,
  NonNullable<ComponentProps<typeof BaseIcon>['iconNode']>
>;

// Chaque plateforme a une convention visuelle différente pour le partage :
// iOS utilise la flèche vers le haut (Share), Android le symbole à trois points (Share2),
// et le web la flèche vers l'avant (Forward).
export const resolveShareIconName = (platform: typeof Platform.OS): LucideIconName => {
  switch (platform) {
    case 'ios':
      return 'Share';
    case 'android':
      return 'Share2';
    case 'web':
      return 'Forward';
    default:
      return 'Share';
  }
};

export const LucideIcon = (props: IconProps) => {
  const { style, size, color, _platformOverride } = props;
  let { name } = props;

  if (name === 'Share') {
    name = resolveShareIconName(_platformOverride ?? Platform.OS);
  }

  const sizeMap: Record<IconProps['size'], number> = {
    xs: 12,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 64,
  };

  const mergedStyle = versStyleNatif<StyleProp<ViewStyle>>({ stroke: color ?? 'currentColor', ...style });

  const IconComponent = iconesLucide[name];

  if (IconComponent) {
    return <IconComponent style={mergedStyle} strokeWidth={strokeWidth} color={color} size={sizeMap[size]} />;
  }

  return (
    <BaseIcon
      iconNode={iconesLab[name]}
      style={mergedStyle}
      strokeWidth={strokeWidth}
      color={color}
      size={sizeMap[size]}
    />
  );
};
