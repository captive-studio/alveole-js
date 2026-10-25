import { useFocusEffect } from 'expo-router';
import * as SystemUI from 'expo-system-ui';
import React from 'react';
import { AppState, StatusBar } from 'react-native';
import { PageStatusBarProps } from './Page.types';

const DEFAULT_STATUS_BAR: Required<PageStatusBarProps> = {
  barStyle: 'dark-content',
  backgroundColor: 'white',
};

// Pas de `StatusBar.setBackgroundColor` : sans effet en edge-to-edge, mode par défaut des apps
// Expo, et retiré de React Native 0.88. Le fond sous la barre est celui que pose expo-system-ui.
export const applyStatusBar = (statusBar: Required<PageStatusBarProps>) => {
  StatusBar.setBarStyle(statusBar.barStyle);
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
