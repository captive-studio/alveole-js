import { useTheme } from '@alveole/theme';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Avatar as TamaguiAvatar } from 'tamagui';
import { Typography } from '../../core';
import { useStyles } from './Avatar.styles';
const getInitials = name => {
  const words = name.trim().split(/\s+/);
  if (words.length === 0) return '';
  if (words.length === 1) return words[0][0]?.toUpperCase() ?? '';
  return (words[0][0] + words[1][0]).toUpperCase();
};
export const Avatar = props => {
  const { style, fallbackText, src, size, carre, ...avatarProps } = props;
  const initials = getInitials(fallbackText ?? '');
  const { spacing } = useTheme();
  const styles = useStyles();
  const avatarSize = {
    xs: 20,
    sm: spacing('3W'),
    md: spacing('4W'),
    lg: spacing('5W'),
    xl: spacing('8W'),
  };
  return _jsxs(TamaguiAvatar, {
    style: { ...styles.avatar, ...(carre ? styles.carre : {}), ...style },
    circular: !carre,
    size: avatarSize[size],
    ...avatarProps,
    children: [
      _jsx(TamaguiAvatar.Image, { src: src }),
      _jsx(Typography, { style: styles.fallbackText, children: initials }),
    ],
  });
};
