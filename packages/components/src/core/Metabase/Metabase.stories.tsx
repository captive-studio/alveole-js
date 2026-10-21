import { Story } from '../../type';
import { Box } from '../Box';
import { Metabase } from './Metabase';
import { useStyles } from './Metabase.styles';

export default {
  title: 'Metabase',
  tags: ['core'],
  experimental: false,
  description:
    'Intègre une page Metabase depuis son URL. Cet exemple charge le tableau de bord public de démonstration de Metabase et nécessite une connexion Internet.',
  component: Metabase,
  styleFn: useStyles,
} satisfies Story;

export const Default = () => (
  <Box width="100%" height={600}>
    <Metabase
      source="https://embedded-analytics-sdk-demo.metabase.com/admin/analytics/i5s-lcGYLc1GyFdIy4TxH"
      title="Démonstration Metabase : suivi des stocks et des commandes"
    />
  </Box>
);

export * as Sources from './Metabase.stories.sources';
