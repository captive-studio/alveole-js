import React from 'react';
import { Animated, Easing } from 'react-native';
import { jsx as _jsx } from 'react/jsx-runtime';
import { Box } from '../../core';
import { PROGRESS_BAR_HEIGHT, PROGRESS_DURATION } from './ProgressBar.constants';
import { useStyles } from './ProgressBar.styles';
export const ProgressBarIndeterminate = props => {
  const { style, ...boxProps } = props;
  const progress = React.useRef(new Animated.Value(0)).current;
  const styles = useStyles();
  const translateRange = React.useMemo(
    () =>
      progress.interpolate({
        inputRange: [0, 1],
        outputRange: ['-50%', '150%'],
      }),
    [progress],
  );
  const scaleRange = React.useMemo(
    () =>
      progress.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0.2, 1, 0.2],
      }),
    [progress],
  );
  React.useEffect(() => {
    let anim = null;
    const run = () => {
      progress.setValue(0);
      anim = Animated.timing(progress, {
        toValue: 1,
        duration: PROGRESS_DURATION,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      });
      anim.start(({ finished }) => {
        if (finished) run();
      });
    };
    run();
    return () => anim?.stop();
  }, [progress]);
  return _jsx(Box, {
    style: [styles.progress, { height: PROGRESS_BAR_HEIGHT, marginTop: -PROGRESS_BAR_HEIGHT }, style],
    ...boxProps,
    children: _jsx(Animated.View, {
      style: [
        {
          transform: [{ translateX: translateRange }, { scaleX: scaleRange }],
        },
        styles.bar,
      ],
    }),
  });
};
