import React from 'react';
import { Animated, Easing } from 'react-native';
import { Box, BoxProps } from '../../core/Box';
import { useStyles } from './Skeleton.styles';

export type SkeletonProps = Omit<BoxProps, 'children'>;

const PULSE_DURATION = 700;

export const Skeleton = (props: SkeletonProps) => {
  const { width = '100%', height = 16, borderRadius = 4, style, ...rest } = props;
  const styles = useStyles();
  const [opacity] = React.useState(() => new Animated.Value(0.5));

  React.useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: PULSE_DURATION, easing: Easing.ease, useNativeDriver: true }),
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: PULSE_DURATION,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]),
    );
    anim.start();
    return () => anim.stop();
  }, [opacity]);

  return (
    <Box
      tag="skeleton"
      width={width}
      height={height}
      borderRadius={borderRadius}
      {...rest}
      style={[styles.skeleton, style]}
    >
      <Animated.View style={[styles.pulse, { opacity }]} />
    </Box>
  );
};
