import { Toast as TamaguiToast, useToastController, useToastState } from '@tamagui/toast';
import React from 'react';
import { Pressable } from 'react-native';
import { Box, BoxProps, Typography } from '../../core';
import { LucideIcon, LucideIconProps } from '../LucideIcon';
import { useStyles } from './Toast.styles';

export type ToastProps = Omit<BoxProps, 'children'>;

export function Toast() {
  const toast = useToastState();
  const controller = useToastController();
  const styles = useStyles();

  const variant = toast?.customData?.variant ?? 'default';
  const icon = toast?.customData?.icon;

  const iconColor = React.useMemo(() => {
    switch (variant) {
      case 'default':
        return styles.iconDefault.color;
      case 'success':
        return styles.iconSuccess.color;
      case 'error':
        return styles.iconError.color;
      case 'info':
        return styles.iconInfo.color;
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
        return 'BadgeCheck';
      case 'error':
        return 'BadgeX';
      case 'info':
        return 'BadgeInfo';
      default:
        ((_: never) => {})(variant);
    }

    return null;
  }, [icon, variant]);

  if (!toast) return null;

  return (
    <TamaguiToast
      key={toast.id}
      style={styles.container}
      duration={toast.duration}
      enterStyle={{ opacity: 0, y: 10, scale: 0.98 }}
      exitStyle={{ opacity: 0, y: 10, scale: 0.98 }}
      viewportName="app-toasts"
    >
      {iconName && (
        <Box style={styles.icon}>
          <LucideIcon color={iconColor} name={iconName} size="sm" />
        </Box>
      )}

      <Box style={styles.contenu}>
        <Box style={styles.titleContainer}>
          <Typography style={styles.title}>{toast.title}</Typography>

          <Pressable onPress={() => controller.hide()}>
            <LucideIcon name="X" size="md" />
          </Pressable>
        </Box>

        {toast.message && (
          <Box>
            <Typography style={styles.message}>{toast.message}</Typography>
          </Box>
        )}
      </Box>
    </TamaguiToast>
  );
}
