import { Color } from '../constants';

type Between0And1 = number;
type HexColor = `#${string}`;

export const darken = (hexadecimalColor: Color, amount: Between0And1): HexColor => {
  hexadecimalColor = hexadecimalColor.replace(/^#/, '');
  if (hexadecimalColor.length === 3)
    hexadecimalColor = hexadecimalColor
      .split('')
      .map(c => c + c)
      .join('');
  if (hexadecimalColor.length !== 6) throw new Error('Invalid hex color');
  const r = Math.max(0, parseInt(hexadecimalColor.slice(0, 2), 16) - Math.round(255 * amount));
  const g = Math.max(0, parseInt(hexadecimalColor.slice(2, 4), 16) - Math.round(255 * amount));
  const b = Math.max(0, parseInt(hexadecimalColor.slice(4, 6), 16) - Math.round(255 * amount));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};
