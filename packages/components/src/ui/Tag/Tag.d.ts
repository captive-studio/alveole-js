import React, { CSSProperties } from 'react';
export type TagColors = 'default' | 'action';
export type TagProps = {
  children: React.ReactNode;
  color: TagColors;
  size: 'sm' | 'md';
  style?: CSSProperties;
};
export declare const Tag: (props: TagProps) => import('react/jsx-runtime').JSX.Element;
//# sourceMappingURL=Tag.d.ts.map
