import { Toast as TamaguiToast, toast } from '@tamagui/toast';
import React from 'react';
import { Toast, ToastView } from './Toast';
import { defaultDuration, ToastContext, type ToastAPI } from './ToastContext';

export type ToastsProps = React.PropsWithChildren<object>;

const api: ToastAPI = {
  present: (title, message, opts) => {
    toast.custom(
      id => (
        <ToastView
          title={title}
          message={message}
          variant={opts?.variant}
          leading={opts?.leading}
          onClose={() => toast.dismiss(id)}
        />
      ),
      { duration: opts?.duration },
    );
  },
};

export function Toasts(props: ToastsProps) {
  const { children } = props;

  return (
    <TamaguiToast position="bottom-center" duration={defaultDuration} swipeDirection="horizontal">
      <ToastContext.Provider value={api}>
        {children}
        <TamaguiToast.Viewport offset={32}>
          <TamaguiToast.List renderItem={item => <Toast {...item} />} />
        </TamaguiToast.Viewport>
      </ToastContext.Provider>
    </TamaguiToast>
  );
}

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <Toasts> provider');
  return ctx;
}
