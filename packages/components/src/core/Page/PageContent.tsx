import { useTheme } from '@alveole/theme';
import { useFocusEffect } from 'expo-router';
import * as SystemUI from 'expo-system-ui';
import React from 'react';
import { AppState, Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Box } from '../../core/Box';
import { PageProps, PageStatusBarProps } from './Page';
import { useStyles } from './Page.styles';
import { PageBackground } from './PageBackground';
import { PageContentDefault } from './PageContentDefault';
import { PageContentScrollable } from './PageContentScrollable';

export type PageContentProps = PageProps;

const DEFAULT_STATUS_BAR: Required<PageStatusBarProps> = {
  barStyle: 'dark-content',
  backgroundColor: 'white',
};

const applyStatusBar = (statusBar: Required<PageStatusBarProps>) => {
  StatusBar.setBarStyle(statusBar.barStyle);
  if (Platform.OS === 'android') StatusBar.setBackgroundColor(statusBar.backgroundColor);
  void SystemUI.setBackgroundColorAsync(statusBar.backgroundColor);
};

export const PageContent = (props: PageContentProps) => {
  const { scrollable = false, renderToolbar, sidebar, sideBarController, onScrollChange, statusBar } = props;

  const { isVariant } = useTheme();
  const styles = useStyles();
  const { top } = useSafeAreaInsets();

  const mobileOrTablet = isVariant('mobile') || isVariant('tablet');
  const resolvedStatusBar = React.useMemo<Required<PageStatusBarProps>>(
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
    (scrollY: number) => {
      const scrolled = scrollY > 0;
      setIsScrolled(scrolled);
      onScrollChange?.(scrollY);
    },
    [onScrollChange],
  );

  const renderPageWithSidebar = (children: React.ReactNode) => (
    <Box style={styles.sidebarContainer} overflow={mobileOrTablet && sideBarController?.open ? 'hidden' : undefined}>
      {sidebar}

      <Box flex={1}>
        {mobileOrTablet && (
          <Box
            tag="mobile-menu"
            style={statusBar?.backgroundColor ? { backgroundColor: statusBar.backgroundColor } : undefined}
          >
            <Box pt={Platform.OS === 'android' ? top : 0}>{renderToolbar?.({ isScrolled })}</Box>
          </Box>
        )}

        <Box flex={1}>{children}</Box>
      </Box>
    </Box>
  );

  const isScrollable = React.useMemo(
    () =>
      scrollable === true ||
      (scrollable === 'desktop-only' && isVariant!('desktop')) ||
      (scrollable === 'mobile-only' && mobileOrTablet),
    [isVariant, mobileOrTablet, scrollable],
  );

  const renderContent = () =>
    isScrollable ? (
      <PageContentScrollable
        {...props}
        style={{ backgroundColor: 'transparent' }}
        onScrollChange={handleInternalScrollChange}
      />
    ) : (
      <PageContentDefault {...props} style={{ backgroundColor: 'transparent' }} />
    );

  return (
    <PageBackground>
      {sidebar || renderToolbar ? renderPageWithSidebar(renderContent()) : renderContent()}
    </PageBackground>
  );
};
