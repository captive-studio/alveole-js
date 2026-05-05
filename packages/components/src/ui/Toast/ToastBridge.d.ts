import React from 'react';
import { type ToastAPIOptions } from './ToastContext';
export type ToastBridgeProps = React.PropsWithChildren<object>;
export declare const defaultDuration = 8000;
export declare function ToastBridge(props: ToastBridgeProps): import('react/jsx-runtime').JSX.Element;
declare module '@tamagui/toast' {
  interface CustomData extends ToastAPIOptions {
    presentAt?: number;
  }
}
//# sourceMappingURL=ToastBridge.d.ts.map
