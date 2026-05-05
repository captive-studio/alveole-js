import { ImageProps as ExpoImageProps } from 'expo-image';
type Dimension = number | `${number}%`;
export type ImageProps = ExpoImageProps & {
  width?: Dimension;
  height?: Dimension;
  maxWidth?: number;
  maxHeight?: number;
};
export declare const Image: (props: ImageProps) => import('react/jsx-runtime').JSX.Element;
export {};
//# sourceMappingURL=Image.d.ts.map
