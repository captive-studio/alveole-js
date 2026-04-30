import { Box, Highlight, Typography } from '../../core';
import { Button } from '@alveole/components';
import { Story } from '../../type';
import { Toast } from './Toast';
import { useStyles } from './Toast.styles';
import { useToast } from './index';

export default {
  title: 'Toast',
  tags: ['ui'],
  experimental: false,
  figmaURL: 'https://www.figma.com/design/xJz8Z6vfrnZPKTtRbuT2W8/Alveole---Composants?node-id=2084-1372',
  description: 'Toaster Tamagui. Contient le provider global et le hook useToast',
  component: Toast,
  styleFn: useStyles,
} satisfies Story;

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
  const withoutMessageToast = () => toast.present('Sans message');
  const withoutMessageToastError = () => toast.present('Sans message', undefined, { variant: 'error' });
  const withCustomIcon = () => toast.present('Avec icon custom', undefined, { icon: 'Worm' });

  return (
    <Box display="flex" flexDirection="column" gap={16}>
      <Box display="flex" flexDirection="column" gap={'050'}>
        <Button title="Default toast" variant="primary" onPress={defaultToast} />
        <Button title="Success toast" variant="primary" onPress={successToast} />
        <Button title="Error toast" variant="primary" onPress={errorToast} />
        <Button title="Info toast" variant="primary" onPress={infoToast} />
        <Button title="Message long" variant="primary" onPress={infoToastMultiLine} />
        <Button title="Without message toast" variant="primary" onPress={withoutMessageToast} />
        <Button title="Without message toast error" variant="primary" onPress={withoutMessageToastError} />
        <Button title="WithCustomIcon" variant="primary" onPress={withCustomIcon} />
      </Box>
      <Box display="flex" flexDirection="column" gap={4}>
        <Typography>{`Le fichier _layout.tsx doit inclure la balise <Toasts> pour fonctionner`}</Typography>
        <Highlight language="tsx">
          {`
            <Toasts>
              <Stack screenOptions={{ headerShown: false }} />
            </Toasts>
          `}
        </Highlight>
      </Box>
    </Box>
  );
};

export * as Sources from './Toast.stories.sources';
