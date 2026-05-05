import LottieView from 'lottie-react-native';
import React from 'react';
export type LottieDimensionValue = number | `${string}%` | undefined;
export declare const isLottieDimensionValue: (dimension: unknown) => dimension is LottieDimensionValue;
export type LottieLoopProps = {
  loop: true;
  onAnimationLoop?: React.ComponentProps<typeof LottieView>['onAnimationLoop'];
};
export type LottieOneTimeProps = {
  loop: false;
  onAnimationFinish?: React.ComponentProps<typeof LottieView>['onAnimationFinish'];
};
export type LottieProps = (LottieLoopProps | LottieOneTimeProps) & {
  style: React.ComponentProps<typeof LottieView>['style'];
  source: React.ComponentProps<typeof LottieView>['source'];
};
export declare const Lottie: (props: LottieProps) => import('react/jsx-runtime').JSX.Element;
//# sourceMappingURL=Lottie.d.ts.map
