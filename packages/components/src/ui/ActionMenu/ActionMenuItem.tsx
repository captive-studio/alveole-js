import { Platform, Pressable } from 'react-native';
import { Box, BoxProps } from '../../core/Box';
import { fondAuSurvol } from '../../core/styleTamagui/fondAuSurvol';
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

  const { forme, fond } = fondAuSurvol(
    selected ? styles.sidebarItemSelectedDesktop : {},
    styles.sidebarItemHover.backgroundColor,
  );
  const titleStyleSelected = selected ? styles.sidebarItemTitleSelectedDesktop : {};

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      // En natif, les vues Tamagui du libellé et du survol peuvent capter le toucher.
      // Toute la ligne appartient au Pressable ; le web garde le survol de ses enfants.
      pointerEvents={Platform.OS === 'web' ? 'auto' : 'box-only'}
    >
      <Box tag="action-menu-item" style={style} {...boxProps}>
        <Box style={{ ...styles.sidebarItemContainerDesktop, ...actionMenuItemStyles.actionMenuItemContainerDesktop }}>
          {selected && (
            <Box tag="sidebar-item-indicator" style={styles.sidebarItemSelectedIndicator}>
              <Box style={styles.sidebarItemSelectedIndicatorContent} />
            </Box>
          )}
          <Box
            tag="sidebar-item"
            style={{ ...styles.sidebarItemDesktop, ...forme }}
            // L'entrée sélectionnée se survole comme les autres. Lui réserver une teinte propre
            // n'ajoutait qu'un cas particulier, et celle qui était posée valait son fond de repos :
            // le survol ne produisait rien.
            backgroundColor={fond}
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
            <Typography style={{ ...styles.sidebarItemTitleDesktop, ...titleStyleSelected }}>{title}</Typography>
          </Box>
        </Box>
      </Box>
    </Pressable>
  );
};
