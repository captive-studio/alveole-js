import { CSSProperties } from 'react';
import { AvatarImageProps } from 'tamagui';
export type AvatarProps = {
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fallbackText?: string;
  style?: CSSProperties;
  src?: AvatarImageProps['src'];
  carre?: boolean;
};
export declare const Avatar: (props: AvatarProps) => import('react/jsx-runtime').JSX.Element;
//# sourceMappingURL=Avatar.d.ts.map
