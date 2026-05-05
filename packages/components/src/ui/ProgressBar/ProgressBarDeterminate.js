import React from 'react';
import { Animated, Easing } from 'react-native';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Box } from '../../core';
import { Typography } from '../../core/Typography';
import { PROGRESS_BAR_GAP, PROGRESS_BAR_HEIGHT, PROGRESS_DETERMINATE_DURATION } from './ProgressBar.constants';
import { useStyles } from './ProgressBar.styles';
export const ProgressBarDeterminate = props => {
  const { clamped, indicator, indicatorPrecision = 3, style, onLayout, ...boxProps } = props;
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
  return _jsxs(Box, {
    children: [
      _jsxs(Box, {
        style: [styles.determinate, { height: PROGRESS_BAR_HEIGHT }, style],
        ...boxProps,
        children: [
          _jsx(Animated.View, { style: [styles.progressed, { flex: animatedProgress }] }),
          _jsx(Animated.View, { style: { width: animatedGap } }),
          _jsx(Animated.View, { style: [styles.remaining, { flex: remaining }] }),
        ],
      }),
      indicator &&
        _jsx(Box, {
          children: _jsxs(Typography, {
            style: styles.indicator,
            children: [(clamped * 100).toFixed(indicatorPrecision), '%'],
          }),
        }),
    ],
  });
};
