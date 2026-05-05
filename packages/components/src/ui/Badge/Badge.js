import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { LucideIcon } from '../LucideIcon';
import { useStyles } from './Badge.styles';
export const Badge = props => {
  const { variant, style, size, icon, ...badgeProps } = props;
  const styles = useStyles();
  const badgeSize = size === 'sm' ? styles.badgeSm : styles.badgeMd;
  const badgeVariant = () => {
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
        (_ => {})(variant);
    }
    return {};
  };
  if (icon) {
    const iconSize = size === 'sm' ? 'xs' : 'sm';
    return _jsxs(Box, {
      tag: 'badge',
      style: [styles.badge, badgeVariant(), badgeSize, style],
      children: [
        _jsx(LucideIcon, { name: icon, size: iconSize }),
        _jsx(Typography, { tag: 'badge-text', ...badgeProps }),
      ],
    });
  }
  return _jsx(Typography, { tag: 'badge', style: [styles.badge, badgeVariant(), badgeSize, style], ...badgeProps });
};
