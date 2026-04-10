import { BoxProps } from '@alveole/components';
import { ProgressBarDeterminate } from './ProgressBarDeterminate';
import { ProgressBarIndeterminate } from './ProgressBarIndeterminate';
import { ProgressBarLoop } from './ProgressBarLoop';

type ProgressBarMode = 'determinate' | 'indeterminate' | 'loop';

export const PROGRESS_BAR_GAP = 8;
export const PROGRESS_BAR_HEIGHT = 8;
export const PROGRESS_DURATION = 2000;
export const PROGRESS_DETERMINATE_DURATION = 400;

export type ProgressBarProps = BoxProps & {
  value?: number;
  visible?: boolean;
  indicator?: boolean;
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
