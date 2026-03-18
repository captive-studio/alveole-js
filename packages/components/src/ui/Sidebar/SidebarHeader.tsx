import { useTheme } from '@alveole/theme';
import React from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Box } from '../../core';
import { ButtonIcon } from '../Button';
import { Divider } from '../Divider';
import { useStyles } from './Sidebar.styles';
import { SidebarController } from './useSidebar';

export type SidebarHeaderProps = {
  controller?: SidebarController;
  logo: React.ReactNode;
};

const SidebarHeaderDesktop = (props: SidebarHeaderProps) => {
  const { logo } = props;
  const styles = useStyles();

  return (
    <Box tag="sidebar-header" style={styles.header}>
      <Box style={styles.headerContent}>
        <Box flex={1}>{logo}</Box>
      </Box>
      <Divider />
    </Box>
  );
};

const SidebarHeaderMobile = (props: SidebarHeaderProps) => {
  const { controller } = props;

  const styles = useStyles();
  const { top } = useSafeAreaInsets();

  return (
    <Box tag="sidebar-header" style={styles.header}>
      <Box style={styles.headerContent} pt={(Platform.OS === 'android' ? top : 0) + styles.headerContent.padding}>
        <Box flex={1} />
        <ButtonIcon icon="X" variant="tertiary" onPress={() => controller?.setOpen(false)} />
      </Box>
      <Divider />
    </Box>
  );
};

export const SidebarHeader = (props: SidebarHeaderProps) => {
  const { isVariant } = useTheme();
  const { logo } = props;
  const mobileOrTablet = React.useMemo(() => isVariant('mobile') || isVariant('tablet'), [isVariant]);
  return mobileOrTablet ? <SidebarHeaderMobile {...props} /> : <SidebarHeaderDesktop logo={logo} />;
};
