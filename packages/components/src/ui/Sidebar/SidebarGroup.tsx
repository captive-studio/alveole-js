import { useTheme } from '@alveole/theme';
import React from 'react';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { useStyles } from './Sidebar.styles';

export type SidebarGroupProps = React.PropsWithChildren & {
  title: string;
};

const SidebarGroupDesktop = (props: SidebarGroupProps) => {
  const { children, title } = props;

  const styles = useStyles();

  return (
    <Box tag="sidebar-group">
      <Typography style={styles.groupTitleDesktop}>{title}</Typography>
      {children}
    </Box>
  );
};

const SidebarGroupMobile = (props: SidebarGroupProps) => {
  const { children, title } = props;

  const styles = useStyles();

  return (
    <Box tag="sidebar-group">
      <Typography style={styles.groupTitleMobile}>{title}</Typography>
      {children}
    </Box>
  );
};

export const SidebarGroup = (props: SidebarGroupProps) => {
  const { isVariant } = useTheme();
  const mobileOrTablet = React.useMemo(() => isVariant('mobile') || isVariant('tablet'), [isVariant]);
  return mobileOrTablet ? <SidebarGroupMobile {...props} /> : <SidebarGroupDesktop {...props} />;
};
