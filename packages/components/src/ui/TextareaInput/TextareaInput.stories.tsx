import { Box } from '../../core/Box';
import { Story } from '../../type';
import { TextareaInput } from './TextareaInput';

export default {
  title: 'TextareaInput',
  tags: ['ui'],
  experimental: false,
  description: 'Input multiline. Étend TextField avec multiline activé par défaut.',
  component: TextareaInput,
  styleFn: () => ({}),
} satisfies Story;

export const Default = () => (
  <Box display="flex" flexDirection="column" gap={24}>
    <TextareaInput label="Message" placeholder="Votre message..." numberOfLines={4} />
    <TextareaInput label="Avec valeur" value="Contenu du message" numberOfLines={4} />
    <TextareaInput label="Désactivé" placeholder="Désactivé" disabled numberOfLines={4} />
  </Box>
);

export * as Sources from './TextareaInput.stories.sources';
