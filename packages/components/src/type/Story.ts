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
  shortDescription?: string;
  component?: ComponentType<never>;
  config?: object;
  props?: unknown;
  styleFn: () => string | object;
};

export type Story = StoryMeta;

export type StoryExample = ComponentType<never>;

export type StorySourceValue = string | (() => string);

/**
 * Le bloc que le generateur de sources ajoute a une fiche a la compilation. Il n'est pas ecrit
 * a la main : une fiche redigee sans generateur n'en a pas, d'ou l'optionnalite.
 */
export type StorySources = {
  storySources?: Record<string, StorySourceValue>;
  storyDescriptions?: Record<string, string>;
  /** Forme historique : la source posee a la racine du bloc, sous le nom de l'exemple. */
  [nomDeLExemple: string]: StorySourceValue | Record<string, StorySourceValue> | Record<string, string> | undefined;
};

/**
 * Une fiche : son meta sous `default`, ses exemples sous leurs noms, et le bloc `Sources` quand
 * le generateur l'a ecrit. La signature d'index enumere ces trois natures au lieu de pretendre
 * que toute cle est un exemple ou un meta : c'est ce mensonge qui obligeait chaque appelant a
 * construire ses fiches derriere un `as unknown as`.
 */
export type StoryModule<TMeta extends StoryMeta = StoryMeta> = {
  default: TMeta;
  Sources?: StorySources;
  [exemple: string]: StoryExample | TMeta | StorySources | undefined;
};
