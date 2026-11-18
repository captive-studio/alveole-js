import type { ReactNode } from 'react';

/** Le texte d'aperçu affiché par la boîte de réception, sous l'objet. Absent du corps du mail. */
export const Preview = ({ children }: { children: ReactNode }) => (
  <>
    {'{{preview}}'}
    {children}
    {'{{/preview}}'}
  </>
);
