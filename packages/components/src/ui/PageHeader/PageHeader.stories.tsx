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
  description: 'En-tête de page : fil d’Ariane, puis titre à gauche et actions à droite. Le titre est est H1.',
  component: PageHeader,
  styleFn: useStyles,
} satisfies Story;

export const Default = () => (
  <Box p={4}>
    <PageHeader title="Titre de la page" />
  </Box>
);

export const WithActions = () => (
  <Box p={4}>
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
