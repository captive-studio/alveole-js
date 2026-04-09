import * as SystemUI from 'expo-system-ui';
import React, { createContext, useContext, type PropsWithChildren } from 'react';
import { Platform } from 'react-native';
import { injectVariableCSS } from './helpers/injectVariableCSS';
import { CustomBuilder, useThemeBuilder } from './helpers/useThemeBuilder';
import { ThemeProviderLoader } from './ThemeProviderLoader';
import type { Theme } from './type';

const ThemeContext = createContext<Theme | null>(null);
const MIN_LOADING_DELAY = 0;

export type ThemeProviderProps = PropsWithChildren<
  CustomBuilder & {
    loader?: boolean;
    onReady?: () => void;
  }
>;

export const ThemeProvider = (props: ThemeProviderProps) => {
  const { loader = true, onReady, ...builder } = props;
  const theme = useThemeBuilder(builder);

  const [showLoader, setShowLoader] = React.useState(true);

  React.useEffect(() => {
    const timeout = setTimeout(() => setShowLoader(false), MIN_LOADING_DELAY);
    return () => clearTimeout(timeout);
  }, []);

  React.useEffect(() => {
    void SystemUI.setBackgroundColorAsync('white');
    if (Platform.OS === 'web') injectVariableCSS(theme);
  }, []);

  React.useEffect(() => {
    if (onReady && theme.isReady) onReady();
  }, [onReady, theme.isReady]);

  if ((!theme.isReady || showLoader) && loader !== false) return <ThemeProviderLoader />;
  return <ThemeContext.Provider value={theme}>{props.children}</ThemeContext.Provider>;
};

export const useTheme = (): Theme => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
};
