import { Toast as TamaguiToast, useToastController, useToastState } from '@tamagui/toast';
import React from 'react';
import { Pressable } from 'react-native';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Box, Typography } from '../../core';
import { LucideIcon } from '../LucideIcon';
import { useStyles } from './Toast.styles';
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
        (_ => {})(variant);
    }
  }, [styles, variant]);
  const iconName = React.useMemo(() => {
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
        (_ => {})(variant);
    }
    return null;
  }, [icon, variant]);
  if (!toast) return null;
  return _jsxs(
    TamaguiToast,
    {
      style: styles.container,
      duration: toast.duration,
      enterStyle: { opacity: 0, y: 10, scale: 0.98 },
      exitStyle: { opacity: 0, y: 10, scale: 0.98 },
      viewportName: 'app-toasts',
      children: [
        iconName &&
          _jsx(Box, {
            style: styles.icon,
            children: _jsx(LucideIcon, { color: iconColor, name: iconName, size: 'sm' }),
          }),
        _jsxs(Box, {
          style: styles.contenu,
          children: [
            _jsxs(Box, {
              style: styles.titleContainer,
              children: [
                _jsx(Typography, { style: styles.title, children: toast.title }),
                _jsx(Pressable, {
                  onPress: () => controller.hide(),
                  children: _jsx(LucideIcon, { name: 'X', size: 'md' }),
                }),
              ],
            }),
            toast.message &&
              _jsx(Box, { children: _jsx(Typography, { style: styles.message, children: toast.message }) }),
          ],
        }),
      ],
    },
    toast.id,
  );
}
