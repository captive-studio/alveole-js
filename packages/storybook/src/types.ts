import React from 'react';

export type StorybookTag = 'Kit' | 'Composant' | 'Template' | (string & {});

export type StorybookMeta = {
  title: string;
  tags: readonly StorybookTag[];
  experimental: boolean;
  figmaURL?: string;
  mobileOnly?: boolean;
  webOnly?: boolean;
  description: string;
  component?: React.ComponentType<any>;
  config?: object;
  props?: unknown;
  styleFn: () => string | object;
};

export type StorybookExample = React.ComponentType<any>;

export type StorybookModule<TMeta extends StorybookMeta = StorybookMeta> = {
  default: TMeta;
} & Record<string, StorybookExample | TMeta>;

export type StorybookFlagKey = 'figma' | 'experimental' | 'props' | 'webOnly' | 'mobileOnly';

export type StorybookFlag = {
  key: StorybookFlagKey;
  label: string;
};
