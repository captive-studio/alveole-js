import { Animated } from 'react-native';
import { Circle, Svg } from 'react-native-svg';
import type { SpinnerProps } from './Spinner.shared';
import { useSpinner } from './useSpinner';

export const Spinner = ({ style, ...props }: SpinnerProps) => {
  const { styles, spin, visible, px, strokeWidth } = useSpinner(props, true);
  const r = (px - strokeWidth) / 2;
  const cx = px / 2;
  const circumference = 2 * Math.PI * r;
  const dashArray = `${circumference * 0.75} ${circumference * 0.25}`;

  if (!visible) return null;

  return (
    <Animated.View style={[{ width: px, height: px, transform: [{ rotate: spin }] }, style]}>
      <Svg width={px} height={px} viewBox={`0 0 ${px} ${px}`}>
        <Circle cx={cx} cy={cx} r={r} fill="none" strokeWidth={strokeWidth} stroke={styles.track.color} />
        <Circle
          cx={cx}
          cy={cx}
          r={r}
          fill="none"
          strokeWidth={strokeWidth}
          stroke={styles.arc.color}
          strokeDasharray={dashArray}
          strokeLinecap="round"
          rotation={-90}
          origin={`${cx}, ${cx}`}
        />
      </Svg>
    </Animated.View>
  );
};
