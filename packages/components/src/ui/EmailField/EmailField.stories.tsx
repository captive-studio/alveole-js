import { Box } from '../../core/Box';
import { Story } from '../../type';
import { EmailField } from './EmailField';

export default {
  title: 'EmailField',
  tags: ['ui'],
  experimental: false,
  description: 'Champ email avec label. Clavier email, lowercase automatique.',
  component: EmailField,
  styleFn: () => ({}),
} satisfies Story;

export const Default = () => (
  <Box display="flex" flexDirection="column" gap={24}>
    <EmailField label="Email" placeholder="jean@exemple.fr" />
    <EmailField label="Avec erreur" placeholder="jean@exemple.fr" error="Format invalide" />
    <EmailField label="Avec succès" value="jean@exemple.fr" success="Email valide" />
    <EmailField label="Désactivé" value="jean@exemple.fr" disabled />
  </Box>
);

export * as Sources from './EmailField.stories.sources';
