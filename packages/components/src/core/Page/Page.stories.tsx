import { Story } from '../../type';
import { Box } from '../Box';
import { Page } from './Page';

export default {
  title: 'Pages',
  tags: ['Kit'],
  experimental: false,
  description:
    'Permet de définir les valeurs de la balise <head> via Expo router. Doit englober toutes les pages. Permet aussi de la rendre scrollable la page via l’attribut `scrollable`. Principalement pour le web.',
  component: Page,
  styleFn: () => 'Aucun style appliqué',
} satisfies Story;

const codeExample = `<Page 
  scrollable
  title="Mon titre"
  description="Description"
  og={{ title: "OG titre", description: "OG description" }}
>
  {/* ... */}
</Page>`;

export const ExampleUsage = () => <Box>{codeExample}</Box>;

const codeExampleSidebar = `const sidebarController = useSidebar();
return (
  <Page 
    sideBarController={sidebarController}
    sidebar={<AdminNavigation sidebarController={sidebarController} />}
    title="Mon titre"
  >
    {/* ... */}
  </Page>
);`;

export const ExampleUsageSidebar = () => <Box>{codeExampleSidebar}</Box>;
