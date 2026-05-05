import React from 'react';
import { LucideIconProps } from '../LucideIcon';
export type ToastAPIOptions = {
  icon?: LucideIconProps['name'];
  duration?: number;
  variant?: 'default' | 'success' | 'error' | 'info';
};
export type ToastAPI = {
  present: (title: string, message?: string, opts?: ToastAPIOptions) => void;
};
export declare const ToastContext: React.Context<ToastAPI | null>;
//# sourceMappingURL=ToastContext.d.ts.map
