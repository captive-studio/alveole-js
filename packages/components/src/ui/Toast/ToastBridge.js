import { useToastController } from '@tamagui/toast';
import React from 'react';
import { jsx as _jsx } from 'react/jsx-runtime';
import { ToastContext } from './ToastContext';
export const defaultDuration = 8000;
export function ToastBridge(props) {
  const { children } = props;
  const controller = useToastController();
  const api = React.useMemo(
    () => ({
      present: (title, message, opts) => {
        controller.show(title, {
          message,
          duration: opts?.duration ?? defaultDuration,
          customData: { ...opts, presentAt: Date.now() },
        });
      },
    }),
    [controller],
  );
  return _jsx(ToastContext.Provider, { value: api, children: children });
}
