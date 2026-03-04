import { Tabs as ExpoTabs } from 'expo-router';
import React from 'react';
import { useStyles } from './ToolbarBottomNav.styles';

export type ToolbarBottomNavProps = React.ComponentProps<typeof ExpoTabs>;
export const TabItemHeight = 60;

export const ToolbarBottomNav = (props: ToolbarBottomNavProps) => {
  const { screenOptions, ...tabProps } = props;

  const { tabBarActiveTintColor, tabBarInactiveTintColor, ...styles } = useStyles();

  return (
    <ExpoTabs
      screenOptions={{
        headerShown: false,
        ...styles,
        tabBarStyle: { ...styles.tabBarStyle, height: TabItemHeight },
        tabBarActiveTintColor: tabBarActiveTintColor.color,
        tabBarInactiveTintColor: tabBarInactiveTintColor.color,
        ...screenOptions,
      }}
      {...tabProps}
    />
  );
};
