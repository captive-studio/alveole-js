import type { Story, StoryModule, StoryTag } from '@alveole/components';

export type StorybookTag = StoryTag;

export type StorybookMeta = Story;

export type StorybookModule<TMeta extends StorybookMeta = StorybookMeta> = StoryModule<TMeta>;

export type StorybookFlagKey = 'figma' | 'experimental' | 'props' | 'webOnly' | 'mobileOnly';

export type StorybookFlag = {
  key: StorybookFlagKey;
  label: string;
};
