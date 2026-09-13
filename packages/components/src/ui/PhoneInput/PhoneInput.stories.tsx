import { Box } from '../../core/Box';
import { Story } from '../../type';
import { PhoneInput } from './PhoneInput';

export default {
  title: 'PhoneInput',
  tags: ['ui'],
  experimental: false,
  description: 'Input téléphone brut (sans label). Clavier numérique téléphone.',
  component: PhoneInput,
  styleFn: () => ({}),
} satisfies Story;

export const Default = () => (
  <Box display="flex" flexDirection="column" gap={24}>
    <PhoneInput placeholder="06 12 34 56 78" />
    <PhoneInput placeholder="06 12 34 56 78" value="06 12 34 56 78" />
    <PhoneInput placeholder="06 12 34 56 78" editable={false} />
  </Box>
);

export * as Sources from './PhoneInput.stories.sources';
