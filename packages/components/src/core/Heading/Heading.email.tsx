import type { ReactNode } from 'react';
import type { HeadingLevel } from './Heading';

/** Variante mail de Heading : memes niveaux `as` et meme defaut, style dans emailCss (.heading-N). */
export const Heading = ({ as: Tag = 'h2', children }: { as?: HeadingLevel; children: ReactNode }) => (
  <Tag className={`heading-${Tag.slice(1)}`}>{children}</Tag>
);
