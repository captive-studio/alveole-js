import { Box, BoxProps } from '@alveole/components';
import React from 'react';
import { Animated, Easing, LayoutChangeEvent } from 'react-native';
import { PROGRESS_BAR_GAP, PROGRESS_BAR_HEIGHT, PROGRESS_DURATION } from './ProgressBar';
import { useStyles } from './ProgressBar.styles';

export type ProgressBarLoopProps = BoxProps;

export const ProgressBarLoop = (props: ProgressBarLoopProps) => {
  const { style, onLayout, ...boxProps } = props;

  const progress = React.useRef(new Animated.Value(0)).current;

  const styles = useStyles();

  const [width, setWidth] = React.useState(0);

  const loopProgressWidth = React.useMemo(() => Math.max(width - PROGRESS_BAR_GAP, 0), [width]);

  const loopFillWidth = React.useMemo(
    () =>
      progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, loopProgressWidth],
      }),
    [loopProgressWidth, progress],
  );

  const loopRemainingLeft = React.useMemo(
    () =>
      progress.interpolate({
        inputRange: [0, 1],
        outputRange: [Math.min(PROGRESS_BAR_GAP, width), width],
      }),
    [progress, width],
  );

  React.useEffect(() => {
    const anim = Animated.loop(
      Animated.timing(progress, {
        toValue: 1,
        duration: PROGRESS_DURATION,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    );

    progress.setValue(0);
    anim.start();

    return () => anim.stop();
  }, [progress]);

  const handleLayout = React.useCallback(
    (event: LayoutChangeEvent) => {
      setWidth(event.nativeEvent.layout.width);
      onLayout?.(event);
    },
    [onLayout],
  );

  return (
    <Box style={[styles.progressTrack, { height: PROGRESS_BAR_HEIGHT }, style]} onLayout={handleLayout} {...boxProps}>
      <Animated.View style={[styles.progressedAbsolute, { width: loopFillWidth }]} />
      <Animated.View style={[styles.remainingAbsolute, { left: loopRemainingLeft }]} />
    </Box>
  );
};
