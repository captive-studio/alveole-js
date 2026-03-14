import { Box } from '../../core';
import { Story } from '../../type/Story';
import { Button } from '../Button';
import { PageHeader } from './PageHeader';
import { useStyles } from './PageHeader.styles';

export default {
  title: 'PageHeader',
  tags: ['Kit'],
  experimental: false,
  description: 'En-tête de page : fil d’Ariane, puis titre à gauche et actions à droite.',
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
