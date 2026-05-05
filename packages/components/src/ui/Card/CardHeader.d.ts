import React from 'react';
import { BoxProps } from '../../core';
export type CardHeaderVariant = 'default' | 'disabled';
export type CardHeaderProps = BoxProps & {
  variant?: CardHeaderVariant;
  titre?: string;
  sousTitre?: string;
  image?: React.ReactNode;
  badge?: React.ReactNode;
};
export declare const CardHeader: (props: CardHeaderProps) => import('react/jsx-runtime').JSX.Element;
//# sourceMappingURL=CardHeader.d.ts.map
