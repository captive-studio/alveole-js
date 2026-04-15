import React from 'react';
import { Animated, PanResponder, Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';

type DevFabProps = {
  onPress?: () => void;
  initial?: { x?: number; y?: number };
};

/**
 * Composant completement autonome, hors theme, ou autre.
 * Simple bouton avec un onLongPress
 */
export default function DevFab(props: DevFabProps) {
  const { onPress, initial = {} } = props;

  const { width, height } = useWindowDimensions();

  const MARGIN = 12;
  const BTN_SIZE = 40;

  const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

  const pos = React.useRef(
    new Animated.ValueXY({
      x: initial.x ?? width - BTN_SIZE - MARGIN,
      y: initial.y ?? height - BTN_SIZE - MARGIN,
    }),
  ).current;

  React.useEffect(() => {
    pos.setValue({
      x: clamp(initial.x ?? width - BTN_SIZE - MARGIN, MARGIN, width - BTN_SIZE - MARGIN),
      y: clamp(initial.y ?? height - BTN_SIZE - MARGIN, MARGIN, height - BTN_SIZE - MARGIN),
    });
  }, [width, height, initial.x, initial.y]);

  const start = React.useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    const x = clamp(initial.x ?? width - BTN_SIZE - MARGIN, MARGIN, width - BTN_SIZE - MARGIN);
    const y = clamp(initial.y ?? height - BTN_SIZE - MARGIN, MARGIN, height - BTN_SIZE - MARGIN);
    start.current = { x, y };
    pos.setValue({ x, y });
  }, [width, height, initial.x, initial.y]);

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) + Math.abs(g.dy) > 2,
        onPanResponderTerminationRequest: () => false,
        onPanResponderMove: (_, g) => {
          const nx = clamp(start.current.x + g.dx, MARGIN, width - BTN_SIZE - MARGIN);
          const ny = clamp(start.current.y + g.dy, MARGIN, height - BTN_SIZE - MARGIN);
          pos.setValue({ x: nx, y: ny });
        },
        onPanResponderRelease: () => {
          const x = (pos as any).x.__getValue();
          const y = (pos as any).y.__getValue();
          start.current = { x, y };
        },
        onPanResponderTerminate: () => {
          const x = (pos as any).x.__getValue();
          const y = (pos as any).y.__getValue();
          start.current = { x, y };
        },
      }),
    [pos, width, height],
  );

  const originalConsoleError = console.error;
  console.error = (...args: any[]) => {
    const firstArg = args[0];
    const isTagWarning =
      typeof firstArg === 'string' &&
      firstArg.includes('is unrecognized in this browser') &&
      firstArg.includes('The tag <');
    if (isTagWarning) return;
    originalConsoleError(...args);
  };

  return (
    <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.fab,
          {
            transform: [{ translateX: pos.x }, { translateY: pos.y }],
            width: BTN_SIZE,
            height: BTN_SIZE,
            borderRadius: BTN_SIZE / 2,
          },
        ]}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Pressable onLongPress={onPress} style={styles.pressable}>
          <View style={styles.dot} />
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1000000000,
    elevation: 1000000000,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderWidth: 1,
    borderColor: 'rgba(1, 36, 72, 0.5)',
    shadowColor: 'rgba(1, 36, 72, 0.5)',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  pressable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 2,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(1, 36, 72, 0.25)',
  },
});
