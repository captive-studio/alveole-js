import { Box } from '../../core';
import { Story } from '../../type/Story';
import { Breadcrumbs } from './Breadcrumbs';
import { useStyles } from './Breadcrumbs.styles';

export default {
  title: 'Breadcrumbs',
  tags: ['Kit'],
  experimental: false,
  description:
    "Fil d'Ariane construit à partir de la navigation Expo Router. Tous les éléments sauf le dernier (page en cours) sont cliquables.",
  component: Breadcrumbs,
  styleFn: useStyles,
} satisfies Story;

export const Default = () => (
  <Box p={4}>
    <Breadcrumbs />
  </Box>
);

export const WithCustomRootLabel = () => (
  <Box p={4}>
    <Breadcrumbs rootLabel="Tableau de bord" />
  </Box>
);

export const WithCustomLabels = () => (
  <Box p={4}>
    <Breadcrumbs
      getLabel={(segment, _index, _path) => {
        const labels: Record<string, string> = {
          admin: 'Administration',
          missions: 'Missions',
          show: 'Détail',
          salarie: 'Espace salarié',
          client: 'Espace client',
        };
        return labels[segment] ?? segment;
      }}
    />
  </Box>
);

export const WithSegmentsToSkip = () => (
  <Box p={4}>
    <Breadcrumbs
      segmentsToSkip={['admin', 'ui-kit']}
      getLabel={(segment, _index, _path) => {
        const labels: Record<string, string> = {
          admin: 'Administration',
          missions: 'Missions',
          show: 'Détail',
          salarie: 'Espace salarié',
          client: 'Espace client',
        };
        return labels[segment] ?? segment;
      }}
    />
  </Box>
);
