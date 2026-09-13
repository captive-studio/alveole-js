import { Box } from '../../core/Box';
import { Story } from '../../type';
import { EmailInput } from './EmailInput';

export default {
  title: 'EmailInput',
  tags: ['ui'],
  experimental: false,
  description: 'Input email brut (sans label). Clavier email, lowercase automatique.',
  component: EmailInput,
  styleFn: () => ({}),
} satisfies Story;

export const Default = () => (
  <Box display="flex" flexDirection="column" gap={24}>
    <EmailInput placeholder="jean@exemple.fr" />
    <EmailInput placeholder="jean@exemple.fr" value="jean@exemple.fr" />
    <EmailInput placeholder="jean@exemple.fr" editable={false} />
  </Box>
);

export * as Sources from './EmailInput.stories.sources';
