import LottieView from 'lottie-react-native';
import { View } from 'react-native';
import { jsx as _jsx } from 'react/jsx-runtime';
export const isLottieDimensionValue = dimension => {
  if (dimension === null) return false;
  if (dimension === undefined) return true;
  if (typeof dimension === 'number') return true;
  if (typeof dimension === 'string' && dimension.includes('%')) return true;
  return false;
};
export const Lottie = props => {
  const { style } = props;
  const height = style && 'height' in style && isLottieDimensionValue(style.height) ? style.height : undefined;
  const width = style && 'width' in style && isLottieDimensionValue(style.width) ? style.width : undefined;
  return _jsx(View, {
    style: { height, width },
    children: _jsx(LottieView, { autoPlay: true, resizeMode: 'contain', ...props }),
  });
};
