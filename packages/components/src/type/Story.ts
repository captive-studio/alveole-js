import type { ComponentType } from 'react';

export type StoryTag = 'Kit' | 'Composant' | 'Template' | (string & {});

export type StoryMeta = {
  title: string;
  tags: readonly StoryTag[];
  experimental: boolean;
  figmaURL?: string;
  mobileOnly?: boolean;
  webOnly?: boolean;
  description: string;
  component?: ComponentType<any>;
  config?: object;
  props?: unknown;
  styleFn: () => string | object;
};

export type Story = StoryMeta;

export type StoryExample = ComponentType<any>;

export type StoryModule<TMeta extends StoryMeta = StoryMeta> = {
  default: TMeta;
} & Record<string, StoryExample | TMeta>;
