import { Platform, StyleProp, ViewStyle } from 'react-native';
import { LucideIconName, LucideIconProps } from './LucideIcon.props';
import * as LabIcons from './vendor/lab';
import * as LucideIcons from './vendor/lucide';
import { Icon as BaseIcon, LucideIcon as Icon } from './vendor/lucide';

export const strokeWidth = 1.5;

export type IconProps = LucideIconProps;

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

  const iconMap = LucideIcons as unknown as Record<string, Icon | undefined>;

  const sizeMap: Record<IconProps['size'], number> = {
    xs: 12,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 64,
  };

  const defaultStyle = { stroke: color ?? 'currentColor' };
  const mergedStyle = [defaultStyle, style];

  const IconComponent = iconMap[name];

  if (IconComponent) {
    return (
      <IconComponent
        style={mergedStyle as StyleProp<ViewStyle>}
        strokeWidth={strokeWidth}
        color={color}
        size={sizeMap[size]}
      />
    );
  }

  return (
    <BaseIcon
      iconNode={(LabIcons as any)?.[name]}
      style={mergedStyle as StyleProp<ViewStyle>}
      strokeWidth={strokeWidth}
      color={color}
      size={sizeMap[size]}
    />
  );
};
