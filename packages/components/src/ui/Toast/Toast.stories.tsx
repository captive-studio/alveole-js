import { Button } from '@alveole/components';
import { Box, Highlight, Typography } from '../../core';
import { Story } from '../../type';
import { Toast } from './Toast';
import { useStyles } from './Toast.styles';
import { defaultDuration } from './ToastBridge';
import { useToast } from './index';

export default {
  title: 'Toast',
  tags: ['ui'],
  experimental: false,
  figmaURL: 'https://www.figma.com/design/xJz8Z6vfrnZPKTtRbuT2W8/Alveole---Composants?node-id=2084-1372',
  description: `Toaster Tamagui. Contient le provider global et le hook useToast. Par défaut un toast reste affiché pendant ${defaultDuration / 1000} secondes`,
  component: Toast,
  styleFn: useStyles,
} satisfies Story;

export const All = () => {
  const toast = useToast();

  defaultDuration;

  const defaultToast = () => toast.present('Default', 'Message');
  const successToast = () => toast.present('Success', 'Message', { variant: 'success' });
  const errorToast = () => toast.present('Error', 'Message beaucoup plus long', { variant: 'error' });
  const infoToast = () => toast.present('Information', 'Message', { variant: 'info' });
  const infoToastMultiLine = () =>
    toast.present('Information', 'Message beaucoup plus long avec retour à la ligne.\nDeuxième ligne', {
      variant: 'info',
    });
  const withoutMessageToast = () => toast.present('Sans message');
  const withoutMessageToastError = () => toast.present('Sans message', undefined, { variant: 'error' });
  const withCustomIcon = () => toast.present('Avec icon custom', undefined, { icon: 'Worm' });

  return (
    <Box display="flex" flexDirection="column" gap={8}>
      <Box display="flex" flexDirection="row" gap={4} flexWrap="wrap">
        <Button title="Default toast" variant="secondary" onPress={defaultToast} />
        <Button title="Success toast" variant="secondary" onPress={successToast} />
        <Button title="Error toast" variant="secondary" onPress={errorToast} />
        <Button title="Info toast" variant="secondary" onPress={infoToast} />
        <Button title="Message long" variant="secondary" onPress={infoToastMultiLine} />
        <Button title="Without message toast" variant="secondary" onPress={withoutMessageToast} />
        <Button title="Without message toast error" variant="secondary" onPress={withoutMessageToastError} />
        <Button title="WithCustomIcon" variant="secondary" onPress={withCustomIcon} />
      </Box>
      <Box display="flex" flexDirection="column" gap={4}>
        <Typography>{`Le fichier _layout.tsx doit inclure la balise <Toasts> pour fonctionner`}</Typography>
        <Highlight language="tsx">
          {`
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
          `}
        </Highlight>
      </Box>
    </Box>
  );
};

export * as Sources from './Toast.stories.sources';
