import { Box } from '../../core/Box';
import { Story } from '../../type';
import { TextField } from './TextField';
import { useStyles } from './TextField.styles';

export default {
  title: 'TextField',
  tags: ['ui'],
  experimental: false,
  description: "Champ de saisie texte avec label, hint, caption d'erreur et de succès.",
  component: TextField,
  styleFn: useStyles,
} satisfies Story;

export const Default = () => (
  <Box display="flex" flexDirection="column" gap={24}>
    <TextField label="Label" placeholder="Placeholder" />
    <TextField label="Avec valeur" value="Valeur saisie" />
    <TextField label="Avec hint" hint="Texte d'aide" placeholder="Placeholder" />
  </Box>
);

export const States = () => (
  <Box display="flex" flexDirection="column" gap={24}>
    <TextField label="Erreur" placeholder="Placeholder" error="Ce champ est requis" />
    <TextField label="Succès" placeholder="Placeholder" success="Enregistré" />
    <TextField label="Désactivé" placeholder="Placeholder" disabled />
    <TextField label="Désactivé avec valeur" value="Valeur" disabled />
  </Box>
);

export * as Sources from './TextField.stories.sources';
