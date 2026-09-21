import { Box, Toasts } from '@alveole/components';
import { ThemeProvider } from '@alveole/theme';
import '@alveole/theme/dist/default.css';
import { Stack } from 'expo-router';
import { KeyboardProvider } from 'react-native-keyboard-controller';
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
  const topBar = useUIKitTopBar();
  const column = useUIKitColumn();

  return (
    <Box flex={1}>
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
  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
      <KeyboardProvider>
        <ThemeProvider loader={false} staticCSS>
          <Toasts>
            <UIKitChrome />
          </Toasts>
        </ThemeProvider>
      </KeyboardProvider>
    </TamaguiProvider>
  );
}
