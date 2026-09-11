import { Box } from '../../core';
import { Story } from '../../type';
import { Checkbox } from './Checkbox';
import { useStyles } from './Checkbox.styles';

export default {
  title: 'Checkbox',
  tags: ['ui'],
  experimental: false,
  description: 'Case à cocher avec label, gestion des états et variants de taille.',
  component: Checkbox,
  styleFn: useStyles,
} satisfies Story;

export const Default = () => (
  <Box display="flex" flexDirection="column" gap={24}>
    <Checkbox label="Non coché" />
    <Checkbox label="Coché" checked />
    <Checkbox label="Désactivé" disabled />
    <Checkbox label="Coché désactivé" checked disabled />
    <Checkbox label="Avec erreur" error="Vous devez accepter les conditions" />
    <Checkbox label="Avec succès" success="Validé" />
  </Box>
);

export const Sizes = () => (
  <Box display="flex" flexDirection="row" gap={16}>
    <Checkbox label="Size MD" size="md" />
    <Checkbox label="Size SM" size="sm" />
  </Box>
);

export * as Sources from './Checkbox.stories.sources';
