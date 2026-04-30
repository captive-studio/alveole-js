import { ToastProvider, ToastViewport } from '@tamagui/toast';
import React from 'react';
import { Toast } from './Toast';
import { ToastBridge } from './ToastBridge';
import { ToastContext } from './ToastContext';

export type ToastsProps = React.PropsWithChildren<object>;

export function Toasts(props: ToastsProps) {
  const { children } = props;

  return (
    <ToastProvider swipeDirection="horizontal" native={['ios', 'android']}>
      <ToastBridge>
        <Toast />
        <ToastViewport name="app-toasts" multipleToasts bottom={32} left={0} right={0} />
        {children}
      </ToastBridge>
    </ToastProvider>
  );
}

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <Toasts> provider');
  return ctx;
}
