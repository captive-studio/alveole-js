import { ToastProvider, ToastViewport } from '@tamagui/toast';
import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Toast } from './Toast';
import { ToastBridge } from './ToastBridge';
import { ToastContext } from './ToastContext';
export function Toasts(props) {
  const { children } = props;
  return _jsx(ToastProvider, {
    swipeDirection: 'horizontal',
    native: ['ios', 'android'],
    children: _jsxs(ToastBridge, {
      children: [
        _jsx(Toast, {}),
        _jsx(ToastViewport, { name: 'app-toasts', multipleToasts: true, bottom: 32, left: 0, right: 0 }),
        children,
      ],
    }),
  });
}
export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <Toasts> provider');
  return ctx;
}
