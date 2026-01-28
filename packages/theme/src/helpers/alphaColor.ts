import { Color } from '../constants';

type Between0And1 = number;
type RGBAColor = `rgba${string}`;

/**
 * Génère une couleur avec de l’opacité à partir d’une valeur hexadecimal
 * @param hexadecimalColor - La couleur hexadecimal (Issue du thème ou string)
 * @param opacity - Entre 0 et 1
 * @returns La valeur rgba, par exemple: 'rgba(235, 220, 200, 0.5)'
 */
export const alpha = (hexadecimalColor: Color, opacity: Between0And1): RGBAColor => {
  hexadecimalColor = hexadecimalColor.replace(/^#/, '');
  if (hexadecimalColor.length === 3)
    hexadecimalColor = hexadecimalColor
      .split('')
      .map(c => c + c)
      .join('');
  if (hexadecimalColor.length !== 6) throw new Error('Invalid hex color');
  const r = parseInt(hexadecimalColor.slice(0, 2), 16);
  const g = parseInt(hexadecimalColor.slice(2, 4), 16);
  const b = parseInt(hexadecimalColor.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
