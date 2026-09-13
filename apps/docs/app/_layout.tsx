import { Toasts } from '@alveole/components';
import { ThemeProvider } from '@alveole/theme';
import '@alveole/theme/dist/default.css';
import { Stack } from 'expo-router';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { TamaguiProvider } from 'tamagui';
import { tamaguiConfig } from '../tamagui.config';
import './global.css';

export default function RootLayout() {
  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
      <KeyboardProvider>
        <ThemeProvider loader={false} staticCSS>
          <Toasts>
            <Stack screenOptions={{ headerShown: false }} />
          </Toasts>
        </ThemeProvider>
      </KeyboardProvider>
    </TamaguiProvider>
  );
}
