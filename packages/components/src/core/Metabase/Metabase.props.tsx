import { BoxProps } from '../Box';

export type MetabaseProps =
  | {
      source: string;
      style?: BoxProps['style'];
    }
  | {
      token: string;
      instanceUrl: string;
      style?: BoxProps['style'];
    };
