import { Box, Toasts } from '@alveole/components';
import { ThemeProvider } from '@alveole/theme';
import '@alveole/theme/dist/default.css';
import { Stack } from 'expo-router';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { TamaguiProvider } from 'tamagui';
import { useUIKitTopBar } from '../components/uiKitNavigation';
import { tamaguiConfig } from '../tamagui.config';
import './global.css';

/**
 * La barre est montée ici, une fois, plutôt que dans le `beforeContent` de chaque écran :
 * `Page` rend son `beforeContent` à l'intérieur de sa colonne de droite, donc une barre
 * passée par là démarrerait au bord de la colonne au lieu de la surplomber. Voir docs/adr/0007.
 */
function UIKitChrome() {
  const topBar = useUIKitTopBar();

  return (
    <Box flex={1}>
      {topBar}
      <Stack screenOptions={{ headerShown: false }} />
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
