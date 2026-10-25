import React from 'react';
import { Animated, Easing } from 'react-native';

// Une interface, pas un alias : la declaration publiee la nomme au lieu de deplier le type
// d'Animated, que React Native 0.88 ne publie que sous un chemin prive.
export interface Rotation extends Animated.AnimatedInterpolation<string> {}

/**
 * L'angle d'un spinner qui tourne sans fin, un tour toutes les 800 ms.
 *
 * Seul le pilote differe : le natif tourne hors du fil JavaScript, le navigateur n'en a pas.
 */
export const useRotation = (useNativeDriver: boolean): Rotation => {
  const [rotation] = React.useState(() => new Animated.Value(0));

  React.useEffect(() => {
    const anim = Animated.loop(
      Animated.timing(rotation, { toValue: 1, duration: 800, easing: Easing.linear, useNativeDriver }),
    );
    anim.start();
    return () => anim.stop();
  }, [rotation, useNativeDriver]);

  return rotation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
};
