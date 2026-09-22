import { Tabs as ExpoTabs } from 'expo-router';
import { ToolbarBottomNav as ToolbarBottomNavBase } from './ToolbarBottomNav';
import { toolbarBottomNavIcon } from './ToolbarBottomNavIcon';

// L'annotation explicite évite de faire fuiter des types internes de React Navigation.
export const ToolbarBottomNav: typeof ToolbarBottomNavBase & {
  Screen: typeof ExpoTabs.Screen;
  Icon: typeof toolbarBottomNavIcon;
} = Object.assign(ToolbarBottomNavBase, {
  Screen: ExpoTabs.Screen,
  Icon: toolbarBottomNavIcon,
});
