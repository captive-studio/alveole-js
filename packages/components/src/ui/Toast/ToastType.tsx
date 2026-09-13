import React from 'react';
import { Box } from '../../core/Box';
import { LucideIcon, LucideIconProps } from '../LucideIcon';
import { useStyles } from './Toast.styles';
import type { ToastAPIOptions } from './ToastContext';

type ToastVariant = NonNullable<ToastAPIOptions['variant']>;

export type ToastTypeProps = {
  variant: ToastVariant;
  icon?: LucideIconProps['name'];
};

export function ToastType({ variant, icon }: ToastTypeProps) {
  const styles = useStyles();

  const iconBlockStyle = React.useMemo(() => {
    switch (variant) {
      case 'default':
        return styles.iconBlockDefault;
      case 'success':
        return styles.iconBlockSuccess;
      case 'error':
        return styles.iconBlockError;
      case 'info':
        return styles.iconBlockInfo;
      case 'warning':
        return styles.iconBlockWarning;
      default:
        ((_: never) => {})(variant);
    }
  }, [styles, variant]);

  const iconName = React.useMemo<LucideIconProps['name'] | null>(() => {
    if (icon) return icon;
    switch (variant) {
      case 'default':
        return null;
      case 'success':
        return 'CircleCheck';
      case 'error':
        return 'OctagonAlert';
      case 'info':
        return 'Info';
      case 'warning':
        return 'TriangleAlert';
      default:
        ((_: never) => {})(variant);
    }
    return null;
  }, [icon, variant]);

  if (!iconName) return null;

  return (
    <Box style={[styles.iconBlock, iconBlockStyle]}>
      <LucideIcon color="#FFFFFF" name={iconName} size="sm" />
    </Box>
  );
}
