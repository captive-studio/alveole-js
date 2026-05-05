import { jsx as _jsx } from 'react/jsx-runtime';
import { ProgressBarDeterminate } from './ProgressBarDeterminate';
import { ProgressBarIndeterminate } from './ProgressBarIndeterminate';
import { ProgressBarLoop } from './ProgressBarLoop';
export const ProgressBar = props => {
  const { visible = true, value, mode } = props;
  const clampedValue = typeof value === 'number' ? Math.max(0, Math.min(1, value)) : undefined;
  const resolvedMode = mode ?? (typeof clampedValue === 'number' ? 'determinate' : 'indeterminate');
  if (!visible) return null;
  if (resolvedMode === 'determinate' && typeof clampedValue === 'number')
    return _jsx(ProgressBarDeterminate, { clamped: clampedValue, ...props });
  if (resolvedMode === 'loop') return _jsx(ProgressBarLoop, { ...props });
  return _jsx(ProgressBarIndeterminate, { ...props });
};
