import { Box } from '../../core/Box';
import { Story } from '../../type';
import { PasswordField } from './PasswordField';
import { useStyles } from './PasswordField.styles';

export default {
  title: 'PasswordField',
  tags: ['ui'],
  experimental: false,
  description: 'Champ mot de passe avec label et bascule de visibilité.',
  component: PasswordField,
  styleFn: useStyles,
} satisfies Story;

export const Default = () => (
  <Box display="flex" flexDirection="column" gap={24}>
    <PasswordField label="Mot de passe" placeholder="••••••••" />
    <PasswordField label="Avec erreur" placeholder="••••••••" error="Mot de passe incorrect" />
    <PasswordField label="Avec succès" value="motdepasse" success="Mot de passe accepté" />
    <PasswordField label="Désactivé" value="monMotDePasse" disabled />
  </Box>
);

export * as Sources from './PasswordField.stories.sources';
