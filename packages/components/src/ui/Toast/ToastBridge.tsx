import { useToastController } from '@tamagui/toast';
import React from 'react';
import { ToastContext, type ToastAPI, type ToastAPIOptions } from './ToastContext';

export type ToastBridgeProps = React.PropsWithChildren<object>;

export function ToastBridge(props: ToastBridgeProps) {
  const { children } = props;
  const controller = useToastController();

  const api = React.useMemo<ToastAPI>(
    () => ({
      present: (title, message, opts) => {
        controller.show(title, {
          message,
          duration: opts?.duration ?? 8000,
          customData: { ...opts, presentAt: Date.now() },
        });
      },
    }),
    [controller],
  );

  return <ToastContext.Provider value={api}>{children}</ToastContext.Provider>;
}

declare module '@tamagui/toast' {
  interface CustomData extends ToastAPIOptions {
    presentAt?: number;
  }
}
