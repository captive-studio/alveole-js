import { useTheme } from '@alveole/theme';
import React from 'react';
import { ScrollView } from 'react-native';
import { Box } from '../../core';
import { useStyles } from './Sidebar.styles';
import { SidebarFooter } from './SidebarFooter';
import { SidebarHeader } from './SidebarHeader';
import { SidebarController } from './useSidebar';

export const SidebarWidth = 286;
export const SidebarHeight = 58;

export type SidebarProps = React.PropsWithChildren & {
  controller?: SidebarController;
  logo: React.ReactNode;
  footer?: React.ReactNode;
};

const SidebarDesktop = (props: SidebarProps) => {
  const { children, controller, footer, logo } = props;

  const styles = useStyles();

  return (
    <Box tag="sidebar" width={SidebarWidth} style={styles.sidebar}>
      <Box style={styles.sidebarContent}>
        <SidebarHeader controller={controller} logo={logo} />
        <ScrollView style={styles.scrollView}>{children}</ScrollView>
        {footer && <SidebarFooter>{footer}</SidebarFooter>}
      </Box>
    </Box>
  );
};

const SidebarMobile = (props: SidebarProps) => {
  const { children, controller, footer, logo } = props;

  const styles = useStyles();

  const navWidth = React.useMemo(() => {
    if (controller?.open) return '100%';
    return 0;
  }, [controller?.open]);

  return (
    <Box tag="sidebar" width={navWidth} style={styles.sidebar}>
      <Box style={styles.sidebarContent} pb={'3V'} pr={'3V'} pl={'3V'}>
        <SidebarHeader controller={controller} logo={logo} />
        <ScrollView style={styles.scrollView}>{children}</ScrollView>
        {footer && controller?.open && <SidebarFooter>{footer}</SidebarFooter>}
      </Box>
    </Box>
  );
};

export const Sidebar = (props: SidebarProps) => {
  const { isVariant } = useTheme();
  const mobileOrTablet = React.useMemo(() => isVariant('mobile') || isVariant('tablet'), [isVariant]);
  return mobileOrTablet ? <SidebarMobile {...props} /> : <SidebarDesktop {...props} />;
};
