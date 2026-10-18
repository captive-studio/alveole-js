import { Toast as TamaguiToast, type ToastItemRenderProps } from '@tamagui/toast';
import { Pressable } from 'react-native';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { Leading } from '../Leading';
import { LucideIcon } from '../LucideIcon';
import { useStyles } from './Toast.styles';
import type { ToastAPIOptions } from './ToastContext';
import { ToastType } from './ToastType';

type ToastVariant = NonNullable<ToastAPIOptions['variant']>;

export type ToastViewProps = {
  title: string;
  message?: string;
  variant?: ToastVariant;
  leading?: Leading;
  onClose?: () => void;
};

export function ToastView({ title, message, variant = 'default', leading, onClose }: ToastViewProps) {
  const styles = useStyles();

  return (
    <Box style={styles.container}>
      <ToastType variant={variant} leading={leading} />
      <Box style={styles.contenu}>
        <Box style={styles.titleContainer}>
          <Typography style={styles.title}>{title}</Typography>
          <Pressable accessibilityRole="button" accessibilityLabel="Fermer la notification" onPress={onClose}>
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

export type ToastProps = ToastItemRenderProps;

const horsEcran = { opacity: 0, y: 10, scale: 0.98 };
const animationDuToast = { enter: horsEcran, exit: horsEcran };

export function Toast({ toast, index }: ToastProps) {
  const styles = useStyles();

  return (
    <TamaguiToast.Item toast={toast} index={index} {...animationDuToast} style={styles.tamaguiToastContainer}>
      {toast.jsx}
    </TamaguiToast.Item>
  );
}
