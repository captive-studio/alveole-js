import { useTheme } from '@alveole/theme';
import { useFocusEffect } from 'expo-router';
import * as SystemUI from 'expo-system-ui';
import React from 'react';
import { AppState, Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Box } from '../../core/Box';
import { useStyles } from './Page.styles';
import { PageBackground } from './PageBackground';
import { PageContentDefault } from './PageContentDefault';
import { PageContentScrollable } from './PageContentScrollable';
const DEFAULT_STATUS_BAR = {
  barStyle: 'dark-content',
  backgroundColor: 'white',
};
const applyStatusBar = statusBar => {
  StatusBar.setBarStyle(statusBar.barStyle);
  if (Platform.OS === 'android') StatusBar.setBackgroundColor(statusBar.backgroundColor);
  void SystemUI.setBackgroundColorAsync(statusBar.backgroundColor);
};
export const PageContent = props => {
  const { scrollable = false, renderToolbar, sidebar, sideBarController, onScrollChange, statusBar } = props;
  const { isVariant } = useTheme();
  const styles = useStyles();
  const { top } = useSafeAreaInsets();
  const mobileOrTablet = isVariant('mobile') || isVariant('tablet');
  const resolvedStatusBar = React.useMemo(
    () => ({
      barStyle: statusBar?.barStyle ?? DEFAULT_STATUS_BAR.barStyle,
      backgroundColor: statusBar?.backgroundColor ?? DEFAULT_STATUS_BAR.backgroundColor,
    }),
    [statusBar?.backgroundColor, statusBar?.barStyle],
  );
  const [isScrolled, setIsScrolled] = React.useState(false);
  useFocusEffect(
    React.useCallback(() => {
      applyStatusBar(resolvedStatusBar);
      return () => applyStatusBar(DEFAULT_STATUS_BAR);
    }, [resolvedStatusBar]),
  );
  React.useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState !== 'active') return;
      applyStatusBar(resolvedStatusBar);
    });
    return () => {
      subscription.remove();
    };
  }, [resolvedStatusBar]);
  const handleInternalScrollChange = React.useCallback(
    scrollY => {
      const scrolled = scrollY > 0;
      setIsScrolled(scrolled);
      onScrollChange?.(scrollY);
    },
    [onScrollChange],
  );
  const renderPageWithSidebar = children =>
    _jsxs(Box, {
      style: styles.sidebarContainer,
      overflow: mobileOrTablet && sideBarController?.open ? 'hidden' : undefined,
      children: [
        sidebar,
        _jsxs(Box, {
          flex: 1,
          children: [
            mobileOrTablet &&
              _jsx(Box, {
                tag: 'mobile-menu',
                style: statusBar?.backgroundColor ? { backgroundColor: statusBar.backgroundColor } : undefined,
                children: _jsx(Box, {
                  pt: Platform.OS === 'android' ? top : 0,
                  children: renderToolbar?.({ isScrolled }),
                }),
              }),
            _jsx(Box, { flex: 1, children: children }),
          ],
        }),
      ],
    });
  const isScrollable = React.useMemo(
    () =>
      scrollable === true ||
      (scrollable === 'desktop-only' && isVariant('desktop')) ||
      (scrollable === 'mobile-only' && mobileOrTablet),
    [isVariant, mobileOrTablet, scrollable],
  );
  const renderContent = () =>
    isScrollable
      ? _jsx(PageContentScrollable, {
          ...props,
          style: { backgroundColor: 'transparent' },
          onScrollChange: handleInternalScrollChange,
        })
      : _jsx(PageContentDefault, { ...props, style: { backgroundColor: 'transparent' } });
  return _jsx(PageBackground, {
    children: sidebar || renderToolbar ? renderPageWithSidebar(renderContent()) : renderContent(),
  });
};
