import { useTheme } from '@alveole/theme';
import React from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Box } from '../../core';
import { ButtonIcon } from '../Button';
import { Divider } from '../Divider';
import { useStyles } from './Sidebar.styles';
const SidebarHeaderDesktop = props => {
  const { logo } = props;
  const styles = useStyles();
  return _jsxs(Box, {
    tag: 'sidebar-header',
    style: styles.header,
    children: [
      _jsx(Box, { style: styles.headerContent, children: _jsx(Box, { flex: 1, children: logo }) }),
      _jsx(Divider, {}),
    ],
  });
};
const SidebarHeaderMobile = props => {
  const { controller } = props;
  const styles = useStyles();
  const { top } = useSafeAreaInsets();
  return _jsxs(Box, {
    tag: 'sidebar-header',
    style: styles.header,
    children: [
      _jsxs(Box, {
        style: styles.headerContent,
        pt: (Platform.OS === 'android' ? top : 0) + styles.headerContent.padding,
        children: [
          _jsx(Box, { flex: 1 }),
          _jsx(ButtonIcon, { icon: 'X', variant: 'tertiary', onPress: () => controller?.setOpen(false) }),
        ],
      }),
      _jsx(Divider, {}),
    ],
  });
};
export const SidebarHeader = props => {
  const { isVariant } = useTheme();
  const { logo } = props;
  const mobileOrTablet = React.useMemo(() => isVariant('mobile') || isVariant('tablet'), [isVariant]);
  return mobileOrTablet ? _jsx(SidebarHeaderMobile, { ...props }) : _jsx(SidebarHeaderDesktop, { logo: logo });
};
