import type { ReactNode } from 'react';

/** Variante mail de A : un lien dans le texte. */
export const A = ({ href, children }: { href: string; children: ReactNode }) => (
  <a className="link" href={href}>
    {children}
  </a>
);
