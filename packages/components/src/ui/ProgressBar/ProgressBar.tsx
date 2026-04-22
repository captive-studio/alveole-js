import { BoxProps } from '../../core';
import { ProgressBarDeterminate } from './ProgressBarDeterminate';
import { ProgressBarIndeterminate } from './ProgressBarIndeterminate';
import { ProgressBarLoop } from './ProgressBarLoop';

type ProgressBarMode = 'determinate' | 'indeterminate' | 'loop';

export type ProgressBarProps = BoxProps & {
  value?: number;
  visible?: boolean;
  indicator?: boolean;
  indicatorPrecision?: 0 | 1 | 2 | 3;
  mode?: ProgressBarMode;
};

export const ProgressBar = (props: ProgressBarProps) => {
  const { visible = true, value, mode } = props;

  const clampedValue = typeof value === 'number' ? Math.max(0, Math.min(1, value)) : undefined;
  const resolvedMode = mode ?? (typeof clampedValue === 'number' ? 'determinate' : 'indeterminate');

  if (!visible) return null;

  if (resolvedMode === 'determinate' && typeof clampedValue === 'number')
    return <ProgressBarDeterminate clamped={clampedValue} {...props} />;

  if (resolvedMode === 'loop') return <ProgressBarLoop {...props} />;

  return <ProgressBarIndeterminate {...props} />;
};
