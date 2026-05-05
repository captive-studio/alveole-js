import { TypographyProps } from '../../core/Typography';
import { LucideIconProps } from '../LucideIcon';
export type BadgeProps = TypographyProps & {
  variant: 'default' | 'info' | 'success' | 'error' | 'new' | 'warning';
  size: 'sm' | 'md';
  icon?: LucideIconProps['name'];
};
export declare const Badge: (props: BadgeProps) => import('react/jsx-runtime').JSX.Element;
//# sourceMappingURL=Badge.d.ts.map
