import React from 'react';
import { Animated, Easing } from 'react-native';
import { Circle, Svg } from 'react-native-svg';
import { SIZE_MAP, SpinnerProps, STROKE_MAP } from './Spinner.shared';
import { useStyles } from './Spinner.styles';
import { useDelaiDAffichage } from './useDelaiDAffichage';

export type { SpinnerProps };

export const Spinner = ({ size = 'md', delay, style }: SpinnerProps) => {
  const styles = useStyles();
  const [rotation] = React.useState(() => new Animated.Value(0));
  const visible = useDelaiDAffichage(delay);

  const px = SIZE_MAP[size];
  const strokeWidth = STROKE_MAP[size];
  const r = (px - strokeWidth) / 2;
  const cx = px / 2;
  const circumference = 2 * Math.PI * r;
  const dashArray = `${circumference * 0.75} ${circumference * 0.25}`;
  const spin = rotation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  React.useEffect(() => {
    const anim = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    anim.start();
    return () => anim.stop();
  }, [rotation]);

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
