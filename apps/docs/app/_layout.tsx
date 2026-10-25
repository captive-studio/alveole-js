import { Box, Toasts } from '@alveole/components';
import { Spacings, ThemeProvider } from '@alveole/theme';
import '@alveole/theme/dist/default.css';
import { Stack } from 'expo-router';
import { Platform } from 'react-native';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { initialWindowMetrics, SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { TamaguiProvider } from 'tamagui';
import { useUIKitColumn, useUIKitTopBar } from '../components/uiKitNavigation';
import { tamaguiConfig } from '../tamagui.config';
import './global.css';

/**
 * La barre et la colonne sont montées ici, une fois, plutôt que dans chaque écran : `Page`
 * les rendrait à l'intérieur de l'écran courant, que le `Stack` démonte et remonte à chaque
 * navigation - la colonne perdrait alors sa position de scroll à chaque clic. Voir docs/adr/0007.
 */
function UIKitChrome() {
  const { top } = useSafeAreaInsets();
  const topBar = useUIKitTopBar();
  const column = useUIKitColumn();

  return (
    <Box flex={1} style={{ paddingTop: Platform.OS === 'web' ? Spacings['0V'] : top }}>
      {topBar}
      <Box style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
        {column}
        <Box flex={1}>
          <Stack screenOptions={{ headerShown: false }} />
        </Box>
      </Box>
    </Box>
  );
}

export default function RootLayout() {
  // Le Sheet de Tamagui v3 lit ses retraits dans `SafeAreaProvider`, qui enveloppe donc
  // `TamaguiProvider`. Le thème enveloppe aussi son hôte de portails natifs pour que
  // les menus et popovers conservent le contexte Alveole.
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ThemeProvider loader={false} staticCSS>
        <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
          <KeyboardProvider>
            <Toasts>
              <UIKitChrome />
            </Toasts>
          </KeyboardProvider>
        </TamaguiProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
