import { ThemeProvider } from '@alveole/theme';
import { Stack } from 'expo-router';
import { TamaguiProvider } from 'tamagui';
import '@tamagui/core/reset.css';
import { tamaguiConfig } from '../tamagui.config';

export default function RootLayout() {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <ThemeProvider loader={false}>
        <Stack screenOptions={{ headerShown: false }} />
      </ThemeProvider>
    </TamaguiProvider>
  );
}
