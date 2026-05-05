import { useTheme } from '@alveole/theme';
import React from 'react';
import { ScrollView } from 'react-native';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Box } from '../../core';
import { useStyles } from './Sidebar.styles';
import { SidebarFooter } from './SidebarFooter';
import { SidebarHeader } from './SidebarHeader';
export const SidebarWidth = 286;
export const SidebarHeight = 58;
const SidebarDesktop = props => {
  const { children, controller, footer, logo } = props;
  const styles = useStyles();
  return _jsx(Box, {
    tag: 'sidebar',
    width: SidebarWidth,
    style: styles.sidebar,
    children: _jsxs(Box, {
      style: styles.sidebarContent,
      children: [
        _jsx(SidebarHeader, { controller: controller, logo: logo }),
        _jsx(ScrollView, { style: styles.scrollView, children: children }),
        footer && _jsx(SidebarFooter, { children: footer }),
      ],
    }),
  });
};
const SidebarMobile = props => {
  const { children, controller, footer, logo } = props;
  const styles = useStyles();
  const navWidth = React.useMemo(() => {
    if (controller?.open) return '100%';
    return 0;
  }, [controller?.open]);
  return _jsx(Box, {
    tag: 'sidebar',
    width: navWidth,
    style: styles.sidebar,
    children: _jsxs(Box, {
      style: styles.sidebarContent,
      pb: '3V',
      pr: '3V',
      pl: '3V',
      children: [
        _jsx(SidebarHeader, { controller: controller, logo: logo }),
        _jsx(ScrollView, { style: styles.scrollView, children: children }),
        footer && controller?.open && _jsx(SidebarFooter, { children: footer }),
      ],
    }),
  });
};
export const Sidebar = props => {
  const { isVariant } = useTheme();
  const mobileOrTablet = React.useMemo(() => isVariant('mobile') || isVariant('tablet'), [isVariant]);
  return mobileOrTablet ? _jsx(SidebarMobile, { ...props }) : _jsx(SidebarDesktop, { ...props });
};
