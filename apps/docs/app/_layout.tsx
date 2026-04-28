import { ThemeProvider } from '@alveole/theme';
import { Stack } from 'expo-router';
import { TamaguiProvider } from 'tamagui';
import { tamaguiConfig } from '../tamagui.config';

export default function RootLayout() {
  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
      <ThemeProvider loader={false}>
        <Stack screenOptions={{ headerShown: false }} />
      </ThemeProvider>
    </TamaguiProvider>
  );
}
