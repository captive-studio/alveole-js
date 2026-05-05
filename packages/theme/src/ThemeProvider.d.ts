import { type PropsWithChildren } from 'react';
import { CustomBuilder } from './helpers/useThemeBuilder';
import type { Theme } from './type';
export type ThemeProviderProps = PropsWithChildren<
  CustomBuilder & {
    loader?: boolean;
    onReady?: () => void;
  }
>;
export declare const ThemeProvider: (props: ThemeProviderProps) => import('react/jsx-runtime').JSX.Element;
export declare const useTheme: () => Theme;
//# sourceMappingURL=ThemeProvider.d.ts.map
