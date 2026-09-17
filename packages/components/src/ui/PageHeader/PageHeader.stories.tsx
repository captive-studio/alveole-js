import { Box } from '../../core/Box';
import { Story } from '../../type/Story';
import { Button } from '../Button';
import { PageHeader } from './PageHeader';
import { useStyles } from './PageHeader.styles';

export default {
  title: 'PageHeader',
  tags: ['ui'],
  experimental: false,
  figmaURL: 'https://www.figma.com/design/xJz8Z6vfrnZPKTtRbuT2W8/Alveole---Composants?node-id=1860-3740',
  description:
    'En-tête d’un écran d’application : fil d’Ariane, puis titre à gauche et actions à droite. ' +
    'Le titre est le h1 de la page, dans le registre applicatif : 24, comme Atlassian. Un site de ' +
    'documentation ou une vitrine se titrent dans un autre registre et n’empruntent pas ce composant.',
  component: PageHeader,
  styleFn: useStyles,
} satisfies Story;

export const Default = () => (
  <PageHeader title="Titre de la page" />
);

export const WithActions = () => (
  <Box width='100%'>
    <PageHeader
      title="Détail de la mission"
      actions={
        <>
          <Button variant="primary" title="Enregistrer" size="sm" onPress={() => {}} />
        </>
      }
    />
  </Box>
);

export * as Sources from './PageHeader.stories.sources';
