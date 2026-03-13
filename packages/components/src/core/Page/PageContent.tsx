import { Box } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import React from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PageProps } from './Page';
import { PageBackground } from './PageBackground';
import { useStyles } from './Page.styles';
import { PageContentDefault } from './PageContentDefault';
import { PageContentScrollable } from './PageContentScrollable';

export type PageContentProps = PageProps;

export const PageContent = (props: PageContentProps) => {
  const { scrollable = false, renderToolbar, sidebar, sideBarController, onScrollChange } = props;

  const { isVariant } = useTheme();
  const styles = useStyles();
  const { top } = useSafeAreaInsets();

  const mobileOrTablet = isVariant('mobile') || isVariant('tablet');

  const [isScrolled, setIsScrolled] = React.useState(false);

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
          <Box tag="mobile-menu">
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
