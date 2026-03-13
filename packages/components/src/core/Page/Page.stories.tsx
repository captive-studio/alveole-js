import { Highlight } from '@/ui/base/Highlight';
import { Story } from '@/ui/type/Story';
import React from 'react';
import { Light } from 'react-syntax-highlighter';
import typescript from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript';
import { Page } from './Page';

Light.registerLanguage('typescript', typescript);

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

export const ExampleUsage = () => <Highlight language="typescript">{codeExample}</Highlight>;

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

export const ExampleUsageSidebar = () => <Highlight language="typescript">{codeExampleSidebar}</Highlight>;
