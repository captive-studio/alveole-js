import { PressableProps } from 'react-native';
import { IconProps } from '../LucideIcon';
export type ButtonIconProps = Omit<PressableProps, 'children' | 'style'> & {
  size?: 'sm' | 'md' | 'lg';
  iconSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant: 'primary' | 'secondary' | 'tertiary';
} & {
  style?: {
    width?: number | string;
    height?: number | string;
    borderTop?: string;
    borderBottom?: string;
    borderLeft?: string;
    borderRight?: string;
    borderRadius?: number;
    borderTopLeftRadius?: number;
    borderBottomLeftRadius?: number;
    borderTopRightRadius?: number;
    borderBottomRightRadius?: number;
    backgroundColor?: string;
  };
} & {
  icon: IconProps['name'] | number;
};
export declare const ButtonIcon: (props: ButtonIconProps) => import('react/jsx-runtime').JSX.Element;
//# sourceMappingURL=ButtonIcon.d.ts.map
