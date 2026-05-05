import * as LabIcons from '@lucide/lab';
import { Icon as BaseIcon } from 'lucide-react-native';
import * as LucideIcons from 'lucide-react-native/icons';
import { jsx as _jsx } from 'react/jsx-runtime';
import { isLucideIconName } from './LucideIcon.props';
export const strokeWidth = 1.5;
export const LucideIcon = props => {
  const { style, size, color } = props;
  const iconMap = LucideIcons;
  const sizeMap = {
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
    return _jsx(IconComponent, { style: mergedStyle, strokeWidth: strokeWidth, color: color, size: sizeMap[size] });
  }
  return _jsx(BaseIcon, {
    iconNode: LabIcons?.[props.name],
    style: mergedStyle,
    strokeWidth: strokeWidth,
    color: color,
    size: sizeMap[size],
  });
};
