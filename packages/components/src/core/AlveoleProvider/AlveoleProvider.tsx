import { ThemeProvider, type ThemeProviderProps } from '@alveole/theme';
import React from 'react';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import { TamaguiProvider, type TamaguiInternalConfig } from 'tamagui';
import { Toasts } from '../../ui/Toast';

export type AlveoleProviderProps = React.PropsWithChildren<
  Omit<ThemeProviderProps, 'color' | 'children'> & {
    /** Config Tamagui de l'application, qui porte aussi son `declare module 'tamagui'`. */
    tamaguiConfig: TamaguiInternalConfig;
    /** Surcharge partielle des couleurs Alveole, transmise au `ThemeProvider`. */
    palette?: ThemeProviderProps['color'];
    /** `false` pour une application qui monte déjà son propre `KeyboardProvider`. */
    keyboardProvider?: boolean;
  }
>;

/**
 * Monte la pile obligatoire dans l'ordre que les composants attendent (ADR 0034) : le Sheet
 * de Tamagui v3 lit ses retraits dans `SafeAreaProvider`, qui enveloppe donc `TamaguiProvider`.
 */
export const AlveoleProvider = (props: AlveoleProviderProps) => {
  const { tamaguiConfig, palette, keyboardProvider = true, children, ...themeProps } = props;
  const content = <Toasts>{children}</Toasts>;

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ThemeProvider {...themeProps} color={palette}>
        <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
          {keyboardProvider ? <KeyboardProvider>{content}</KeyboardProvider> : content}
        </TamaguiProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};
