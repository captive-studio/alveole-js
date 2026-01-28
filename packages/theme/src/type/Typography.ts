import type { TextStyle } from 'react-native';
import type { Heights, Sizes } from '../constants';

export type CustomStyle = Pick<TextStyle, 'fontSize' | 'lineHeight' | 'fontWeight' | 'fontFamily'>;

export interface Typography {
  fontSize: typeof Sizes;
  lineHeight: typeof Heights;
}
