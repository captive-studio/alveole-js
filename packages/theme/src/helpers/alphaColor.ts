import { Color } from '../constants';
import { hexToRgb } from './hexToRgb';

type Between0And1 = number;

export const alpha = (hexadecimalColor: Color, opacity: Between0And1): string => {
  if (hexadecimalColor.startsWith('var(')) {
    return `color-mix(in srgb, ${hexadecimalColor} ${Math.round(opacity * 100)}%, transparent)`;
  }
  const [r, g, b] = hexToRgb(hexadecimalColor);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
