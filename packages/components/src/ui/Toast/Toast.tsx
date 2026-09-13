import { Toast as TamaguiToast, useToastController, useToastState } from '@tamagui/toast';
import { Pressable } from 'react-native';
import { Box, BoxProps } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { LucideIcon, LucideIconProps } from '../LucideIcon';
import { useStyles } from './Toast.styles';
import type { ToastAPIOptions } from './ToastContext';
import { ToastType } from './ToastType';

type ToastVariant = NonNullable<ToastAPIOptions['variant']>;

export type ToastViewProps = {
  title: string;
  message?: string;
  variant?: ToastVariant;
  icon?: LucideIconProps['name'];
  onClose?: () => void;
};

export function ToastView({ title, message, variant = 'default', icon, onClose }: ToastViewProps) {
  const styles = useStyles();

  return (
    <Box style={styles.container}>
      <ToastType variant={variant} icon={icon} />
      <Box style={styles.contenu}>
        <Box style={styles.titleContainer}>
          <Typography style={styles.title}>{title}</Typography>
          <Pressable onPress={onClose}>
            <LucideIcon name="X" size="md" />
          </Pressable>
        </Box>
        {message && (
          <Box>
            <Typography style={styles.message}>{message}</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export type ToastProps = Omit<BoxProps, 'children'>;

export function Toast() {
  const toast = useToastState();
  const controller = useToastController();
  const styles = useStyles();

  if (!toast) return null;

  return (
    <TamaguiToast
      key={toast.id}
      duration={toast.duration}
      enterStyle={{ opacity: 0, y: 10, scale: 0.98 }}
      exitStyle={{ opacity: 0, y: 10, scale: 0.98 }}
      viewportName="app-toasts"
      style={styles.tamaguiToastContainer}
    >
      <ToastView
        title={toast.title}
        message={toast.message}
        variant={toast.customData?.variant ?? 'default'}
        icon={toast.customData?.icon}
        onClose={() => controller.hide()}
      />
    </TamaguiToast>
  );
}
