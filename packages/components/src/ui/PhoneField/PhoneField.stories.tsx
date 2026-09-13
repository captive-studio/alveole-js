import { Box } from '../../core/Box';
import { Story } from '../../type';
import { PhoneField } from './PhoneField';

export default {
  title: 'PhoneField',
  tags: ['ui'],
  experimental: false,
  description: 'Champ téléphone avec label.',
  component: PhoneField,
  styleFn: () => ({}),
} satisfies Story;

export const Default = () => (
  <Box display="flex" flexDirection="column" gap={24}>
    <PhoneField label="Téléphone" placeholder="06 12 34 56 78" />
    <PhoneField label="Avec erreur" placeholder="06 12 34 56 78" error="Numéro invalide" />
    <PhoneField label="Désactivé" value="06 12 34 56 78" disabled />
  </Box>
);

export * as Sources from './PhoneField.stories.sources';
