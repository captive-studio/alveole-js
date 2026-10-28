import { Box } from '../../core/Box';
import { Story } from '../../type';
import { FormControl } from '../FormControl';
import { TextareaInput } from './TextareaInput';

export default {
  title: 'TextareaInput',
  tags: ['ui'],
  experimental: false,
  description: 'Input multiline. Étend TextInput avec multiline activé par défaut.',
  component: TextareaInput,
  styleFn: () => ({}),
} satisfies Story;

export const Default = () => (
  <Box display="flex" flexDirection="column" gap="3W">
    <FormControl label="Message">
      <TextareaInput placeholder="Votre message..." numberOfLines={4} />
    </FormControl>
    <FormControl label="Avec valeur">
      <TextareaInput value="Contenu du message" numberOfLines={4} />
    </FormControl>
    <FormControl label="Désactivé">
      <TextareaInput placeholder="Désactivé" disabled numberOfLines={4} />
    </FormControl>
  </Box>
);

export const Redimensionnable = () => (
  <Box display="flex" flexDirection="column" gap="3W">
    <FormControl label="Verticalement">
      <TextareaInput placeholder="Tirer le coin pour agrandir..." numberOfLines={4} resize="vertical" />
    </FormControl>
    <FormControl label="Dans les deux sens">
      <TextareaInput placeholder="Tirer le coin pour agrandir..." numberOfLines={4} resize="both" />
    </FormControl>
  </Box>
);

export * as Sources from './TextareaInput.stories.sources';
