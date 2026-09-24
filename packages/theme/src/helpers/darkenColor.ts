import { Color } from '../constants';
import { hexToRgb } from './hexToRgb';

type Between0And1 = number;
type HexColor = `#${string}`;

const toHexDigits = (channel: number) => channel.toString(16).padStart(2, '0');

export const darken = (hexadecimalColor: Color, amount: Between0And1): HexColor => {
  const shade = Math.round(255 * amount);
  const channels = hexToRgb(hexadecimalColor).map(channel => Math.max(0, channel - shade));
  return `#${channels.map(toHexDigits).join('')}`;
};
