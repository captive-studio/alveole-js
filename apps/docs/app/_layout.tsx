import { Toasts } from '@alveole/components';
import { ThemeProvider } from '@alveole/theme';
import { Stack } from 'expo-router';
import React from 'react';
import { TamaguiProvider } from 'tamagui';
import { tamaguiConfig } from '../tamagui.config';

export default function RootLayout() {
  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
      <ThemeProvider loader={false}>
        <Toasts>
          <Stack screenOptions={{ headerShown: false }} />
        </Toasts>
      </ThemeProvider>
    </TamaguiProvider>
  );
}
