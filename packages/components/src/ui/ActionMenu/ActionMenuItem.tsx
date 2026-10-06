import { Pressable } from 'react-native';
import { Box, BoxProps } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { Leading, LeadingSlot } from '../Leading';
import { useStyles } from '../Sidebar/Sidebar.styles';
import { useStyles as useActionMenuItemStyles } from './ActionMenuItem.styles';

export type ActionMenuItemProps = Omit<BoxProps, 'children'> & {
  title: string;
  leading?: Leading;
  onPress?: () => void;
  selected?: boolean;
};

export const ActionMenuItem = (props: ActionMenuItemProps) => {
  const { title, leading, onPress, selected = false, style, ...boxProps } = props;

  const styles = useStyles();
  const actionMenuItemStyles = useActionMenuItemStyles();

  const itemStyleSelected = selected ? styles.sidebarItemSelectedDesktop : {};
  const titleStyleSelected = selected ? styles.sidebarItemTitleSelectedDesktop : {};
  const sidebarItemTitleDesktop = selected ? styles.sidebarItemTitleCurrentHoverDesktop : {};

  return (
    <Pressable accessibilityRole="button" onPress={onPress}>
      <Box tag="action-menu-item" style={style} {...boxProps}>
        <Box style={{ ...styles.sidebarItemContainerDesktop, ...actionMenuItemStyles.actionMenuItemContainerDesktop }}>
          {selected && (
            <Box tag="sidebar-item-indicator" style={styles.sidebarItemSelectedIndicator}>
              <Box style={styles.sidebarItemSelectedIndicatorContent} />
            </Box>
          )}
          <Box
            tag="sidebar-item"
            style={{ ...styles.sidebarItemDesktop, ...itemStyleSelected }}
            // L'entrée sélectionnée se survole comme les autres. Lui réserver une teinte propre
            // n'ajoutait qu'un cas particulier, et celle qui était posée valait son fond de repos :
            // le survol ne produisait rien.
            hoverStyle={{ ...styles.sidebarItemHover }}
          >
            <LeadingSlot
              contenu={leading}
              apparence={{
                size: 'md',
                color: selected
                  ? styles.sidebarItemTitleSelectedDesktop.color
                  : styles.sidebarItemTitleSelectedDesktop.stroke,
              }}
            />
            <Typography
              style={{ ...styles.sidebarItemTitleDesktop, ...titleStyleSelected }}
              hoverStyle={{ ...sidebarItemTitleDesktop }}
            >
              {title}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Pressable>
  );
};
