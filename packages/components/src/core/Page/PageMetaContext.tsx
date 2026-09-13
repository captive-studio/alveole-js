import React from 'react';
import type { MetaTagProps } from './Page.types';

type PageMetaContextValue = {
  meta: MetaTagProps[];
};

const PageMetaContext = React.createContext<PageMetaContextValue>({ meta: [] });

export const usePageMeta = () => React.useContext(PageMetaContext);

/**
 * Injecte des balises `<meta>` par défaut dans tous les `PageHead` enfants.
 *
 * Placez ce provider à la racine du layout (ex. `app/_layout.tsx`).
 * Les meta du provider sont fusionnées avec celles passées en prop sur chaque `<Page>` :
 * la prop `meta` de la page est placée après et prend le dessus en cas de doublon.
 *
 * @example
 * // Rendre toutes les pages noindex sans répéter la balise sur chaque <Page> :
 * <PageMetaProvider meta={[{ name: 'robots', content: 'noindex, nofollow' }]}>
 *   <Stack />
 * </PageMetaProvider>
 */
export const PageMetaProvider = ({ meta, children }: { meta: MetaTagProps[]; children: React.ReactNode }) => (
  <PageMetaContext.Provider value={{ meta }}>{children}</PageMetaContext.Provider>
);
