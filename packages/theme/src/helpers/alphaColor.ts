import { Color, ThemeColor } from '../constants';
import { hexToRgb } from './hexToRgb';

type Between0And1 = number;

// Une couleur du theme rendue translucide reste une couleur du theme (ADR 0033).
export function alpha(hexadecimalColor: ThemeColor, opacity: Between0And1): ThemeColor;
export function alpha(hexadecimalColor: Color, opacity: Between0And1): string;
export function alpha(hexadecimalColor: Color, opacity: Between0And1): string {
  if (hexadecimalColor.startsWith('var(')) {
    return `color-mix(in srgb, ${hexadecimalColor} ${Math.round(opacity * 100)}%, transparent)`;
  }
  const [r, g, b] = hexToRgb(hexadecimalColor);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
