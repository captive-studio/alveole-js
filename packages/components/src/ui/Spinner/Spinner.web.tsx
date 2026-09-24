import { Animated } from 'react-native';
import type { SpinnerProps } from './Spinner.shared';
import { useSpinner } from './useSpinner';

export const Spinner = ({ style, ...props }: SpinnerProps) => {
  const { styles, spin, visible, px, strokeWidth } = useSpinner(props, false);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        {
          width: px,
          height: px,
          borderRadius: px / 2,
          borderWidth: strokeWidth,
          borderColor: styles.track.color,
          borderTopColor: styles.arc.color,
          transform: [{ rotate: spin }],
        },
        style,
      ]}
    />
  );
};
