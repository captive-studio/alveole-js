import { Tabs as ExpoTabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { jsx as _jsx } from 'react/jsx-runtime';
import { useStyles } from './ToolbarBottomNav.styles';
export const TabItemHeight = 60;
export const ToolbarBottomNav = props => {
  const { screenOptions, ...tabProps } = props;
  const { tabBarActiveTintColor, tabBarInactiveTintColor, ...styles } = useStyles();
  const { bottom } = useSafeAreaInsets();
  return _jsx(ExpoTabs, {
    screenOptions: {
      headerShown: false,
      ...styles,
      tabBarStyle: { ...styles.tabBarStyle, height: TabItemHeight + bottom },
      sceneStyle: {
        backgroundColor: styles.tabBarStyle.backgroundColor,
      },
      tabBarActiveTintColor: tabBarActiveTintColor.color,
      tabBarInactiveTintColor: tabBarInactiveTintColor.color,
      ...screenOptions,
    },
    ...tabProps,
  });
};
