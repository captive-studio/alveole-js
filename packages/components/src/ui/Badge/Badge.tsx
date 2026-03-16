import { Typography, TypographyProps } from '@alveole/components';
import React from 'react';
import { TextStyle } from 'react-native';
import { useStyles } from './Badge.styles';
import { LucideIcon, LucideIconProps } from '../LucideIcon';
import { Box } from '../../core';

export type BadgeProps = TypographyProps & {
  variant: 'default' | 'info' | 'success' | 'error' | 'new' | 'warning';
  size: 'sm' | 'md';
  icon?: LucideIconProps['name'];
};

export const Badge = (props: BadgeProps) => {
  const { variant, style, size, icon, ...badgeProps } = props;

  const styles = useStyles();
  const badgeSize: TextStyle = size === 'sm' ? styles.badgeSm : styles.badgeMd;

  const badgeVariant = (): TextStyle => {
    switch (variant) {
      case 'default':
        return styles.badgeDefault;
      case 'success':
        return styles.badgeSuccess;
      case 'warning':
        return styles.badgeWarning;
      case 'error':
        return styles.badgeError;
      case 'info':
        return styles.badgeInfo;
      case 'new':
        return styles.badgeNew;
      default:
        ((_: never) => {})(variant);
    }
    return {};
  };


  if (icon) {
    const iconSize = size === 'sm' ? 'xs' : 'sm';
    return (
      <Box tag="badge" style={[styles.badge, badgeVariant(), badgeSize, style]}>
        <LucideIcon name={icon} size={iconSize} />
        <Typography tag="badge-text" {...badgeProps} />
      </Box>
    );
  }
  return <Typography tag="badge" style={[styles.badge, badgeVariant(), badgeSize, style]} {...badgeProps} />;
};
