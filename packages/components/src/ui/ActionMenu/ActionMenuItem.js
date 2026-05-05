import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Box, Typography } from '../../core';
import { LucideIcon } from '../LucideIcon';
import { useStyles } from '../Sidebar/Sidebar.styles';
import { useStyles as useActionMenuItemStyles } from './ActionMenuItem.styles';
export const ActionMenuItem = props => {
  const { title, icon, onPress, selected = false, style, ...boxProps } = props;
  const styles = useStyles();
  const actionMenuItemStyles = useActionMenuItemStyles();
  const itemStyleSelected = selected ? styles.sidebarItemSelectedDesktop : {};
  const titleStyleSelected = selected ? styles.sidebarItemTitleSelectedDesktop : {};
  const sidebarItemHover = selected ? styles.sidebarItemCurrentHover : styles.sidebarItemHover;
  const sidebarItemTitleDesktop = selected ? styles.sidebarItemTitleCurrentHoverDesktop : {};
  return _jsx(Box, {
    tag: 'action-menu-item',
    onPress: onPress,
    style: style,
    ...boxProps,
    children: _jsxs(Box, {
      style: { ...styles.sidebarItemContainerDesktop, ...actionMenuItemStyles.actionMenuItemContainerDesktop },
      children: [
        selected &&
          _jsx(Box, {
            tag: 'sidebar-item-indicator',
            style: styles.sidebarItemSelectedIndicator,
            children: _jsx(Box, { style: styles.sidebarItemSelectedIndicatorContent }),
          }),
        _jsxs(Box, {
          tag: 'sidebar-item',
          style: { ...styles.sidebarItemDesktop, ...itemStyleSelected },
          hoverStyle: { ...sidebarItemHover },
          children: [
            icon &&
              _jsx(LucideIcon, {
                size: 'md',
                name: icon,
                color: selected
                  ? styles.sidebarItemTitleSelectedDesktop.color
                  : styles.sidebarItemTitleSelectedDesktop.stroke,
              }),
            _jsx(Typography, {
              style: { ...styles.sidebarItemTitleDesktop, ...titleStyleSelected },
              hoverStyle: { ...sidebarItemTitleDesktop },
              children: title,
            }),
          ],
        }),
      ],
    }),
  });
};
