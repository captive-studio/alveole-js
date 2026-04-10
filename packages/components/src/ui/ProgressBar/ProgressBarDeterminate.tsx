import { Box, BoxProps, Typography } from '@alveole/components';
import React from 'react';
import { Animated, Easing } from 'react-native';
import { PROGRESS_BAR_GAP, PROGRESS_BAR_HEIGHT, PROGRESS_DETERMINATE_DURATION } from './ProgressBar';
import { useStyles } from './ProgressBar.styles';

export type ProgressBarDeterminateProps = BoxProps & {
  indicator?: boolean;
  clamped: number;
};

export const ProgressBarDeterminate = (props: ProgressBarDeterminateProps) => {
  const { clamped, indicator, style, onLayout, ...boxProps } = props;

  const styles = useStyles();
  const animatedProgress = React.useRef(new Animated.Value(clamped)).current;
  const remaining = React.useMemo(() => Animated.subtract(1, animatedProgress), [animatedProgress]);
  const animatedGap = React.useMemo(
    () =>
      animatedProgress.interpolate({
        inputRange: [0, 0.0001, 0.9999, 1],
        outputRange: [0, PROGRESS_BAR_GAP, PROGRESS_BAR_GAP, 0],
        extrapolate: 'clamp',
      }),
    [animatedProgress],
  );

  React.useEffect(() => {
    const anim = Animated.timing(animatedProgress, {
      toValue: clamped,
      duration: PROGRESS_DETERMINATE_DURATION,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    });

    anim.start();

    return () => anim.stop();
  }, [animatedProgress, clamped]);

  return (
    <Box>
      <Box style={[styles.determinate, { height: PROGRESS_BAR_HEIGHT }, style]} {...boxProps}>
        <Animated.View style={[styles.progressed, { flex: animatedProgress }]} />
        <Animated.View style={{ width: animatedGap }} />
        <Animated.View style={[styles.remaining, { flex: remaining }]} />
      </Box>
      {indicator && (
        <Box>
          <Typography style={styles.indicator}>{clamped * 100}%</Typography>
        </Box>
      )}
    </Box>
  );
};
