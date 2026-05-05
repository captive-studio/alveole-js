import * as SystemUI from 'expo-system-ui';
import React, { createContext, useContext } from 'react';
import { Platform } from 'react-native';
import { jsx as _jsx } from 'react/jsx-runtime';
import { injectVariableCSS } from './helpers/injectVariableCSS';
import { useThemeBuilder } from './helpers/useThemeBuilder';
import { ThemeProviderLoader } from './ThemeProviderLoader';
const ThemeContext = createContext(null);
const MIN_LOADING_DELAY = 0;
export const ThemeProvider = props => {
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
  if ((!theme.isReady || showLoader) && loader !== false) return _jsx(ThemeProviderLoader, {});
  return _jsx(ThemeContext.Provider, { value: theme, children: props.children });
};
export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
};
