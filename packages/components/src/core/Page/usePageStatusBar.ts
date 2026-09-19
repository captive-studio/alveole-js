import { useFocusEffect } from 'expo-router';
import * as SystemUI from 'expo-system-ui';
import React from 'react';
import { AppState, Platform, StatusBar } from 'react-native';
import { PageStatusBarProps } from './Page.types';

const DEFAULT_STATUS_BAR: Required<PageStatusBarProps> = {
  barStyle: 'dark-content',
  backgroundColor: 'white',
};

export const applyStatusBar = (statusBar: Required<PageStatusBarProps>) => {
  StatusBar.setBarStyle(statusBar.barStyle);
  if (Platform.OS === 'android') StatusBar.setBackgroundColor(statusBar.backgroundColor);
  void SystemUI.setBackgroundColorAsync(statusBar.backgroundColor);
};

// La barre de statut est un état global de l'OS : la poser au focus de la page et la restaurer à
// la sortie, puis la réappliquer au retour en premier plan, sont deux effets de cycle de vie qui
// n'ont rien à voir avec le rendu. Les isoler garde `PageContent` à son seul rôle de composition.
export const usePageStatusBar = (statusBar?: PageStatusBarProps) => {
  const resolvedStatusBar = React.useMemo<Required<PageStatusBarProps>>(
    () => ({
      barStyle: statusBar?.barStyle ?? DEFAULT_STATUS_BAR.barStyle,
      backgroundColor: statusBar?.backgroundColor ?? DEFAULT_STATUS_BAR.backgroundColor,
    }),
    [statusBar?.backgroundColor, statusBar?.barStyle],
  );

  useFocusEffect(
    React.useCallback(() => {
      applyStatusBar(resolvedStatusBar);
      return () => applyStatusBar(DEFAULT_STATUS_BAR);
    }, [resolvedStatusBar]),
  );

  React.useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState !== 'active') return;
      applyStatusBar(resolvedStatusBar);
    });

    return () => {
      subscription.remove();
    };
  }, [resolvedStatusBar]);
};
