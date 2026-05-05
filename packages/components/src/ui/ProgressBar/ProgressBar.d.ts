import { BoxProps } from '../../core';
type ProgressBarMode = 'determinate' | 'indeterminate' | 'loop';
export type ProgressBarProps = BoxProps & {
  value?: number;
  visible?: boolean;
  indicator?: boolean;
  indicatorPrecision?: 0 | 1 | 2 | 3;
  mode?: ProgressBarMode;
};
export declare const ProgressBar: (props: ProgressBarProps) => import('react/jsx-runtime').JSX.Element | null;
export {};
//# sourceMappingURL=ProgressBar.d.ts.map
