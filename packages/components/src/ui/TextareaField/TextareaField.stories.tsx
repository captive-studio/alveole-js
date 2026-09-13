import { Box } from '../../core/Box';
import { Story } from '../../type';
import { TextareaField } from './TextareaField';

export default {
  title: 'TextareaField',
  tags: ['ui'],
  experimental: false,
  description: 'Champ textarea multiline avec label.',
  component: TextareaField,
  styleFn: () => ({}),
} satisfies Story;

export const Default = () => (
  <Box display="flex" flexDirection="column" gap={24}>
    <TextareaField label="Message" placeholder="Votre message..." numberOfLines={4} />
    <TextareaField label="Avec erreur" placeholder="Votre message..." error="Ce champ est requis" numberOfLines={4} />
    <TextareaField label="Désactivé" value="Message existant" disabled numberOfLines={4} />
  </Box>
);

export * as Sources from './TextareaField.stories.sources';
