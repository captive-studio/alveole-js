import { Toasts } from '@alveole/components';
import { ThemeProvider } from '@alveole/theme';
import '@alveole/theme/dist/default.css';
import { Stack } from 'expo-router';
import { TamaguiProvider } from 'tamagui';
import { tamaguiConfig } from '../tamagui.config';
import './global.css';

export default function RootLayout() {
  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
      <ThemeProvider loader={false} staticCSS>
        <Toasts>
          <Stack screenOptions={{ headerShown: false }} />
        </Toasts>
      </ThemeProvider>
    </TamaguiProvider>
  );
}
