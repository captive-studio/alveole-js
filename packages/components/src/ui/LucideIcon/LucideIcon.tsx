import * as LabIcons from '@lucide/lab';
import { Icon as BaseIcon, LucideIcon as Icon, icons } from 'lucide-react-native';
import { StyleProp, ViewStyle } from 'react-native';
import { isLucideIconName, LucideIconName, LucideIconProps } from './LucideIcon.props';

export const strokeWidth = 1.5;

export type IconProps = LucideIconProps;

export const LucideIcon = (props: IconProps) => {
  const { style, size, color } = props;

  const iconMap: Record<LucideIconName, Icon> = icons;

  const sizeMap: Record<IconProps['size'], number> = {
    xs: 12,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 64,
  };

  const defaultStyle = { stroke: color ?? 'currentColor' };
  const mergedStyle = [defaultStyle, style];

  if (isLucideIconName(props.name)) {
    const IconComponent = iconMap[props.name];
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
      iconNode={(LabIcons as any)?.[props.name]}
      style={mergedStyle as StyleProp<ViewStyle>}
      strokeWidth={strokeWidth}
      color={color}
      size={sizeMap[size]}
    />
  );
};
