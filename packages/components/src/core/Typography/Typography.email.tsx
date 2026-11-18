import type { ReactNode } from 'react';

/** Variante mail de Typography : corps de texte, ou mention (texte secondaire, plus petit). */
export const Typography = ({ mention = false, children }: { mention?: boolean; children: ReactNode }) => (
  <p className={mention ? 'text text-mention' : 'text'}>{children}</p>
);
