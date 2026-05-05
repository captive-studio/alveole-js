import { useTheme } from '@alveole/theme';
import { useRoute } from '@react-navigation/native';
import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { A, Box, Typography } from '../../core';
import { LucideIcon } from '../LucideIcon';
import { useStyles } from './Sidebar.styles';
const SidebarItemDesktop = props => {
  const { title, icon } = props;
  const route = useRoute();
  const styles = useStyles();
  const currentRouteName = route.name;
  const isCurrentPage = !props.pressable && currentRouteName === props.routeName;
  const itemStyleSelected = isCurrentPage ? styles.sidebarItemSelectedDesktop : {};
  const titleStyleSelected = isCurrentPage ? styles.sidebarItemTitleSelectedDesktop : {};
  const sidebarItemHover = isCurrentPage ? styles.sidebarItemCurrentHover : styles.sidebarItemHover;
  const sidebarItemTitleDesktop = isCurrentPage ? styles.sidebarItemTitleCurrentHoverDesktop : {};
  const renderItem = content => {
    if (props.pressable) return _jsx(Box, { onPress: props.onPress, children: content });
    else return _jsx(A, { href: props.href, direction: props.direction, children: content });
  };
  return renderItem(
    _jsxs(Box, {
      style: styles.sidebarItemContainerDesktop,
      children: [
        isCurrentPage &&
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
            icon && _jsx(LucideIcon, { size: 'md', name: icon }),
            _jsx(Typography, {
              style: { ...styles.sidebarItemTitleDesktop, ...titleStyleSelected },
              hoverStyle: { ...sidebarItemTitleDesktop },
              children: title,
            }),
          ],
        }),
      ],
    }),
  );
};
const SidebarItemMobile = props => {
  const { title, icon } = props;
  const route = useRoute();
  const styles = useStyles();
  const currentRouteName = route.name;
  const isCurrentPage = !props.pressable && currentRouteName === props.routeName;
  const itemStyleSelected = isCurrentPage ? styles.sidebarItemSelectedMobile : {};
  const titleStyleSelected = isCurrentPage ? styles.sidebarItemTitleSelectedMobile : {};
  const sidebarItemHover = isCurrentPage ? styles.sidebarItemCurrentHover : styles.sidebarItemHover;
  const sidebarItemTitleMobile = isCurrentPage ? styles.sidebarItemTitleCurrentHoverMobile : {};
  const renderItem = content => {
    if (props.pressable) return _jsx(Box, { onPress: props.onPress, children: content });
    else return _jsx(A, { href: props.href, direction: props.direction, children: content });
  };
  return renderItem(
    _jsxs(Box, {
      children: [
        isCurrentPage &&
          _jsx(Box, {
            tag: 'sidebar-item-indicator',
            style: styles.sidebarItemSelectedIndicator,
            children: _jsx(Box, { style: styles.sidebarItemSelectedIndicatorContent }),
          }),
        _jsxs(Box, {
          tag: 'sidebar-item',
          style: { ...styles.sidebarItemMobile, ...itemStyleSelected },
          hoverStyle: { ...sidebarItemHover },
          children: [
            icon &&
              _jsx(LucideIcon, {
                size: 'md',
                name: icon,
                color: isCurrentPage
                  ? styles.sidebarItemTitleSelectedMobile.color
                  : styles.sidebarItemTitleSelectedMobile.stroke,
              }),
            _jsx(Typography, {
              style: { ...styles.sidebarItemTitleMobile, ...titleStyleSelected },
              hoverStyle: { ...sidebarItemTitleMobile },
              children: title,
            }),
          ],
        }),
      ],
    }),
  );
};
export const SidebarItem = props => {
  const { isVariant } = useTheme();
  const mobileOrTablet = React.useMemo(() => isVariant('mobile') || isVariant('tablet'), [isVariant]);
  return mobileOrTablet ? _jsx(SidebarItemMobile, { ...props }) : _jsx(SidebarItemDesktop, { ...props });
};
