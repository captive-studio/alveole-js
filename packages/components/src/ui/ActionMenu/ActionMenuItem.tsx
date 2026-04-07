import { Box, BoxProps, Typography } from '../../core';
import { LucideIcon, LucideIconProps } from '../LucideIcon';
import { useStyles } from '../Sidebar/Sidebar.styles';
import { useStyles as useActionMenuItemStyles } from './ActionMenuItem.styles';

export type ActionMenuItemProps = Omit<BoxProps, 'children'> & {
  title: string;
  icon?: LucideIconProps['name'];
  onPress?: () => void;
  selected?: boolean;
};

export const ActionMenuItem = (props: ActionMenuItemProps) => {
  const { title, icon, onPress, selected = false, style, ...boxProps } = props;

  const styles = useStyles();
  const actionMenuItemStyles = useActionMenuItemStyles();

  const itemStyleSelected = selected ? styles.sidebarItemSelectedDesktop : {};
  const titleStyleSelected = selected ? styles.sidebarItemTitleSelectedDesktop : {};
  const sidebarItemHover = selected ? styles.sidebarItemCurrentHover : styles.sidebarItemHover;
  const sidebarItemTitleDesktop = selected ? styles.sidebarItemTitleCurrentHoverDesktop : {};

  return (
    <Box tag="action-menu-item" onPress={onPress} style={style} {...boxProps}>
      <Box style={{ ...styles.sidebarItemContainerDesktop, ...actionMenuItemStyles.actionMenuItemContainerDesktop }}>
        {selected && (
          <Box tag="sidebar-item-indicator" style={styles.sidebarItemSelectedIndicator}>
            <Box style={styles.sidebarItemSelectedIndicatorContent} />
          </Box>
        )}
        <Box
          tag="sidebar-item"
          style={{ ...styles.sidebarItemDesktop, ...itemStyleSelected }}
          hoverStyle={{ ...sidebarItemHover }}
        >
          {icon && <LucideIcon size="md" name={icon} />}
          <Typography
            style={{ ...styles.sidebarItemTitleDesktop, ...titleStyleSelected }}
            hoverStyle={{ ...sidebarItemTitleDesktop }}
          >
            {title}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
