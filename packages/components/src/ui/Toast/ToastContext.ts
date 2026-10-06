import React from 'react';
import { Leading } from '../Leading';

export type ToastAPIOptions = {
  leading?: Leading;
  duration?: number;
  variant?: 'default' | 'success' | 'error' | 'info' | 'warning';
};

export type ToastAPI = {
  present: (title: string, message?: string, opts?: ToastAPIOptions) => void;
};

export const ToastContext = React.createContext<ToastAPI | null>(null);
