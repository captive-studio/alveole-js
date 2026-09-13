import { Box } from '../../core/Box';
import { Story } from '../../type';
import { Button } from '../Button';
import { Toast, ToastView } from './Toast';
import { useStyles } from './Toast.styles';
import { defaultDuration } from './ToastBridge';
import { ToastType } from './ToastType';
import { useToast } from './index';

export default {
  title: 'Toast',
  tags: ['ui'],
  experimental: false,
  figmaURL: 'https://www.figma.com/design/xJz8Z6vfrnZPKTtRbuT2W8/Alveole---Composants?node-id=2084-1372',
  description: `Toaster Tamagui. Contient le provider global et le hook \`useToast\`. Par défaut un toast reste affiché pendant ${defaultDuration / 1000} secondes`,
  shortDescription: 'Toaster Tamagui. Fournit le provider global et le hook useToast.',
  component: Toast,
  styleFn: useStyles,
} satisfies Story;

/**
 * Le fichier `_layout.tsx` doit inclure la balise `<Toasts>` pour fonctionner.
 *
 * ```tsx
 * import { Toasts } from '@alveole/components';
 * import { ThemeProvider } from '@alveole/theme';
 * import { Stack } from 'expo-router';
 * import { TamaguiProvider } from 'tamagui';
 * import { tamaguiConfig } from '../tamagui.config';
 *
 * export default function RootLayout() {
 *   return (
 *     <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
 *       <ThemeProvider loader={false}>
 *         <Toasts>
 *           <Stack screenOptions={{ headerShown: false }} />
 *         </Toasts>
 *       </ThemeProvider>
 *     </TamaguiProvider>
 *   );
 * }
 * ```
 */
export const All = () => {
  const toast = useToast();

  const defaultToast = () => toast.present('Default', 'Message');
  const successToast = () => toast.present('Success', 'Message', { variant: 'success' });
  const errorToast = () => toast.present('Error', 'Message beaucoup plus long', { variant: 'error' });
  const infoToast = () => toast.present('Information', 'Message', { variant: 'info' });
  const infoToastMultiLine = () =>
    toast.present('Information', 'Message beaucoup plus long avec retour à la ligne.\nDeuxième ligne', {
      variant: 'info',
    });
  const warningToast = () => toast.present('Attention', 'Message', { variant: 'warning' });
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
        <Button title="Warning toast" variant="secondary" onPress={warningToast} />
        <Button title="Message long" variant="secondary" onPress={infoToastMultiLine} />
        <Button title="Without message toast" variant="secondary" onPress={withoutMessageToast} />
        <Button title="Without message toast error" variant="secondary" onPress={withoutMessageToastError} />
        <Button title="WithCustomIcon" variant="secondary" onPress={withCustomIcon} />
      </Box>
    </Box>
  );
};

export const PreviewInfo = () => (
  <ToastView variant="info" title="Information" message="Description additionnelle du toast." />
);

export const PreviewSuccess = () => (
  <ToastView variant="success" title="Succès" message="Description additionnelle du toast." />
);

export const PreviewError = () => (
  <ToastView variant="error" title="Erreur" message="Description additionnelle du toast." />
);

export const PreviewDefault = () => (
  <ToastView variant="default" title="Default" message="Description additionnelle du toast." />
);

export const PreviewWarning = () => (
  <ToastView variant="warning" title="Attention" message="Description additionnelle du toast." />
);

export const PreviewInfoSansDescription = () => <ToastView variant="info" title="Message seul sans description" />;

export const PreviewSuccessSansDescription = () => (
  <ToastView variant="success" title="Message seul sans description" />
);

export const ToastsTypes = () => (
  <Box display="flex" flexDirection="row" gap={8}>
    <ToastType variant="info" />
    <ToastType variant="success" />
    <ToastType variant="error" />
    <ToastType variant="warning" />
  </Box>
);

export * as Sources from './Toast.stories.sources';
