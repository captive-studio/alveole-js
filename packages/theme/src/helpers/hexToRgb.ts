import { Color } from '../constants';

type Rgb = [number, number, number];

/** Decompose une couleur hexadecimale, courte (`#369`) ou longue (`#336699`), en ses trois canaux. */
export const hexToRgb = (hexadecimalColor: Color): Rgb => {
  let digits = hexadecimalColor.replace(/^#/, '');
  if (digits.length === 3)
    digits = digits
      .split('')
      .map(c => c + c)
      .join('');
  if (digits.length !== 6) throw new Error('Invalid hex color');
  const channel = (start: number) => parseInt(digits.slice(start, start + 2), 16);
  return [channel(0), channel(2), channel(4)];
};
