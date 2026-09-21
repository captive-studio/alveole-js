import React from 'react';
import { Animated, Easing } from 'react-native';
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
  const spin = rotation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  React.useEffect(() => {
    const anim = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    );
    anim.start();
    return () => anim.stop();
  }, [rotation]);

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
