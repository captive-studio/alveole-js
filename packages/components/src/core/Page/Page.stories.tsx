import { Story } from '../../type';
import { Box } from '../Box';
import { Typography } from '../Typography';
import { Page } from './Page';

export default {
  title: 'Pages',
  tags: ['core'],
  experimental: false,
  description:
    "Permet de définir les valeurs de la balise <head> via Expo router. Doit englober toutes les pages. Permet aussi de rendre la page scrollable via l'attribut `scrollable`. Principalement pour le web.",
  shortDescription:
    'Définit les valeurs de la balise head via Expo Router. Rend la page scrollable. Principalement pour le web.',
  component: Page,
  styleFn: () => 'Aucun style appliqué',
} satisfies Story;

export const Default = () => (
  <Page title="Mon titre" description="Description">
    <Typography>Contenu de la page</Typography>
  </Page>
);

export const WithOg = () => (
  <Page title="Mon titre" description="Description" og={{ title: 'OG titre', description: 'OG description' }}>
    <Typography>Page avec Open Graph personnalisé</Typography>
  </Page>
);

export const WithMetaRobots = () => (
  <Page title="Page privée" meta={[{ name: 'robots', content: 'noindex, nofollow' }]}>
    <Typography>Cette page ne sera pas indexée par les moteurs de recherche.</Typography>
  </Page>
);

export const WithMultipleMeta = () => (
  <Page
    title="Page complète"
    description="Avec plusieurs balises meta"
    meta={[
      { name: 'robots', content: 'noindex, nofollow' },
      { name: 'author', content: 'Alvéole' },
      { httpEquiv: 'X-UA-Compatible', content: 'IE=edge' },
    ]}
  >
    <Typography>Page avec plusieurs balises meta personnalisées.</Typography>
  </Page>
);

/**
 * Configure des meta globales pour toutes les pages via `PageMetaProvider` dans `app/_layout.tsx`.
 * Les meta du provider sont injectées en premier ; la prop `meta` de chaque `<Page>` les complète ou les écrase.
 *
 * ```tsx
 * import { PageMetaProvider } from '@alveole/components';
 *
 * export default function RootLayout() {
 *   return (
 *     <PageMetaProvider meta={[{ name: 'robots', content: 'noindex, nofollow' }]}>
 *       <Stack />
 *     </PageMetaProvider>
 *   );
 * }
 *
 * // Une page peut surcharger ou ajouter des meta sans répéter le noindex :
 * <Page title="Ma page" meta={[{ name: 'author', content: 'Alvéole' }]} />
 * ```
 */
export const WithPageMetaProvider = () => null;

/**
 * Rend la page scrollable via l'attribut `scrollable`. Accepte aussi `mobile-only` ou `desktop-only`
 * pour limiter le scroll à une plateforme.
 *
 * Ci-dessous, 4 Box de 300px de haut chacune : le contenu dépasse la hauteur de l'écran, ce qui
 * démontre que le scroll se fait bien au sein de la page.
 */
export const WithScrollable = () => (
  <Page title="Page scrollable" scrollable>
    <Box tag="scrollable-1" height={300} backgroundColor="#f94144">
      <Typography>Box 1</Typography>
    </Box>
    <Box tag="scrollable-2" height={300} backgroundColor="#f9c74f">
      <Typography>Box 2</Typography>
    </Box>
    <Box tag="scrollable-3" height={300} backgroundColor="#90be6d">
      <Typography>Box 3</Typography>
    </Box>
    <Box tag="scrollable-4" height={300} backgroundColor="#577590">
      <Typography>Box 4</Typography>
    </Box>
  </Page>
);

/**
 * Intégration avec un contrôleur de sidebar via `useSidebar()`.
 *
 * ```tsx
 * const sidebarController = useSidebar();
 * return (
 *   <Page
 *     sideBarController={sidebarController}
 *     sidebar={<AdminNavigation sidebarController={sidebarController} />}
 *     title="Mon titre"
 *   >
 *     ...
 *   </Page>
 * );
 * ```
 */
export const WithSidebar = () => null;

export * as Sources from './Page.stories.sources';
