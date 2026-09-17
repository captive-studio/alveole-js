import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import type { Story } from '../../type';
import { CopyToClipboard } from './CopyToClipboard';
import { useStyles } from './CopyToClipboard.styles';

export default {
  title: 'CopyToClipboard',
  tags: ['ui'],
  experimental: false,
  description: `Bouton icône permettant de copier une valeur dans le presse-papiers.

Au clic, la valeur \`value\` est copiée via le presse-papiers du système. L'icône passe alors de **Copy** à **Check** (en vert) pendant environ 2 secondes, et un \`Popover\` positionné à gauche affiche un message de confirmation (\`message\`, par défaut \`'Copié !'\`). Passé ce délai, le bouton revient à son état initial.`,
  shortDescription: 'Bouton icône pour copier une valeur dans le presse-papiers avec feedback visuel.',
  component: CopyToClipboard,
  styleFn: useStyles,
} satisfies Story;

export const Default = () => {
  const value = 'contact@alveole.io';

  return (
    <Box display="flex" flexDirection="row" gap="1W" style={{ alignItems: 'center' }}>
      <Typography>{value}</Typography>
      <CopyToClipboard value={value} />
    </Box>
  );
};

export const CustomMessage = () => (
  <Box display="flex" flexDirection="row" gap="1W" style={{ alignItems: 'center' }}>
    <Typography>FR76 3000 4000 0500 0012 3456 789</Typography>
    <CopyToClipboard value="FR76 3000 4000 0500 0012 3456 789" message="IBAN copié dans le presse-papiers" />
  </Box>
);

export const Disabled = () => (
  <Box display="flex" flexDirection="row" gap="1W" style={{ alignItems: 'center' }}>
    <Typography>Valeur non copiable</Typography>
    <CopyToClipboard value="Valeur non copiable" disabled />
  </Box>
);

export const Sizes = () => (
  <Box display="flex" flexDirection="row" gap="2W" style={{ alignItems: 'center' }}>
    <CopyToClipboard value="Taille sm" size="sm" />
    <CopyToClipboard value="Taille md" size="md" />
    <CopyToClipboard value="Taille lg" size="lg" />
  </Box>
);

export * as Sources from './CopyToClipboard.stories.sources';
