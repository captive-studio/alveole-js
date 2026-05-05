import { useTheme } from '@alveole/theme';
import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Box, Typography } from '../../core';
import { useStyles } from './Sidebar.styles';
const SidebarGroupDesktop = props => {
  const { children, title } = props;
  const styles = useStyles();
  return _jsxs(Box, {
    tag: 'sidebar-group',
    children: [_jsx(Typography, { style: styles.groupTitleDesktop, children: title }), children],
  });
};
const SidebarGroupMobile = props => {
  const { children, title } = props;
  const styles = useStyles();
  return _jsxs(Box, {
    tag: 'sidebar-group',
    children: [_jsx(Typography, { style: styles.groupTitleMobile, children: title }), children],
  });
};
export const SidebarGroup = props => {
  const { isVariant } = useTheme();
  const mobileOrTablet = React.useMemo(() => isVariant('mobile') || isVariant('tablet'), [isVariant]);
  return mobileOrTablet ? _jsx(SidebarGroupMobile, { ...props }) : _jsx(SidebarGroupDesktop, { ...props });
};
