import LottieView from 'lottie-react-native';
import React from 'react';
import { View } from 'react-native';

export type LottieDimensionValue = number | `${string}%` | undefined;
export const isLottieDimensionValue = (dimension: unknown): dimension is LottieDimensionValue => {
  if (dimension === null) return false;
  if (dimension === undefined) return true;
  if (typeof dimension === 'number') return true;
  if (typeof dimension === 'string' && dimension.includes('%')) return true;
  return false;
};

export type LottieProps = {
  style: React.ComponentProps<typeof LottieView>['style'];
  source: React.ComponentProps<typeof LottieView>['source'];
};

export const Lottie = (props: LottieProps) => {
  const { style } = props;
  const height = style && 'height' in style && isLottieDimensionValue(style.height) ? style.height : undefined;
  const width = style && 'width' in style && isLottieDimensionValue(style.width) ? style.width : undefined;

  return (
    <View style={{ height, width }}>
      <LottieView autoPlay loop resizeMode="contain" {...props} />
    </View>
  );
};
