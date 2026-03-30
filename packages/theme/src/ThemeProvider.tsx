import * as SystemUI from 'expo-system-ui';
import React, { createContext, useContext, type PropsWithChildren } from 'react';
import { Platform, StatusBar } from 'react-native';
import { injectVariableCSS } from './helpers/injectVariableCSS';
import { CustomBuilder, useThemeBuilder } from './helpers/useThemeBuilder';
import { ThemeProviderLoader } from './ThemeProviderLoader';
import type { Theme, ThemeStatusBarOptions } from './type';

const ThemeContext = createContext<Theme | null>(null);
const MIN_LOADING_DELAY = 0;
const DEFAULT_STATUS_BAR: ThemeStatusBarOptions = {
  barStyle: 'dark-content',
  backgroundColor: 'white',
};

const applyStatusBar = (options: ThemeStatusBarOptions) => {
  if (Platform.OS !== 'web') {
    StatusBar.setBarStyle(options.barStyle);
    if (Platform.OS === 'android') StatusBar.setBackgroundColor(options.backgroundColor);
  }

  void SystemUI.setBackgroundColorAsync(options.backgroundColor);
};

export const ThemeProvider = (props: PropsWithChildren<CustomBuilder & { loader?: boolean }>) => {
  const { loader = true, ...builder } = props;
  const theme = useThemeBuilder(builder);
  const [showLoader, setShowLoader] = React.useState(true);
  const currentStatusBarRef = React.useRef<ThemeStatusBarOptions>(DEFAULT_STATUS_BAR);
  const statusBarStackRef = React.useRef<ThemeStatusBarOptions[]>([]);

  const setStatusBar = React.useCallback((options: Partial<ThemeStatusBarOptions>) => {
    const nextStatusBar = { ...currentStatusBarRef.current, ...options };
    statusBarStackRef.current.push(currentStatusBarRef.current);
    currentStatusBarRef.current = nextStatusBar;
    applyStatusBar(nextStatusBar);
  }, []);

  const resetStatusBar = React.useCallback(() => {
    const nextStatusBar = statusBarStackRef.current.pop() ?? DEFAULT_STATUS_BAR;
    currentStatusBarRef.current = nextStatusBar;
    applyStatusBar(nextStatusBar);
  }, []);

  React.useEffect(() => {
    const timeout = setTimeout(() => setShowLoader(false), MIN_LOADING_DELAY);
    return () => clearTimeout(timeout);
  }, []);

  React.useEffect(() => {
    if (Platform.OS === 'web') injectVariableCSS(theme);
  }, []);

  React.useEffect(() => {
    applyStatusBar(DEFAULT_STATUS_BAR);
  }, []);

  const contextValue = React.useMemo(
    () => ({
      ...theme,
      setStatusBar,
      resetStatusBar,
    }),
    [resetStatusBar, setStatusBar, theme],
  );

  if ((!theme.isReady || showLoader) && loader !== false) return <ThemeProviderLoader />;
  return <ThemeContext.Provider value={contextValue}>{props.children}</ThemeContext.Provider>;
};

export const useTheme = (): Theme => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
};
