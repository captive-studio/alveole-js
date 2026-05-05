import { BoxProps } from '../../core';
import { LucideIconProps } from '../LucideIcon';
export type CardSectionVariant = 'default' | 'disabled';
export type CardSectionProps = BoxProps & {
  variant?: CardSectionVariant;
  titre?: string;
  description?: string;
  titreIcone?: LucideIconProps['name'];
  descriptionIcone?: LucideIconProps['name'];
};
export declare const CardSection: (props: CardSectionProps) => import('react/jsx-runtime').JSX.Element | null;
//# sourceMappingURL=CardSection.d.ts.map
