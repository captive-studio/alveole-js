import { Tabs as ExpoTabs } from 'expo-router';
import React from 'react';
import { useStyles } from './ToolbarBottomNav.styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type ToolbarBottomNavProps = React.ComponentProps<typeof ExpoTabs>;
export const TabItemHeight = 60;

export const ToolbarBottomNav = (props: ToolbarBottomNavProps) => {
  const { screenOptions, ...tabProps } = props;

  const { tabBarActiveTintColor, tabBarInactiveTintColor, ...styles } = useStyles();

  const { bottom } = useSafeAreaInsets();

  return (
    <ExpoTabs
      screenOptions={{
        headerShown: false,
        ...styles,
        tabBarStyle: { ...styles.tabBarStyle, height: TabItemHeight, marginBottom: bottom },
        tabBarActiveTintColor: tabBarActiveTintColor.color,
        tabBarInactiveTintColor: tabBarInactiveTintColor.color,
        ...screenOptions,
      }}
      {...tabProps}
    />
  );
};
