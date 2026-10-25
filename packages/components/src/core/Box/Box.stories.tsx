import { Story } from '../../type';
import { Typography } from '../Typography';
import { Box } from './Box';

export default {
  title: 'Box',
  tags: ['core'],
  experimental: false,
  description:
    "La Box doit être utilisé pour tout contenir, à la manière d'une <div>. De type View (tamagui), elle permet de définir le tag rendu en web.",
  shortDescription: "Composant de base pour tout contenir, à la manière d'une div. De type View (Tamagui).",
  component: Box,
  styleFn: () => 'Aucun style appliqué',
} satisfies Story;

export const BoxDefault = () => (
  <Box tag="box">
    <Typography>Contenu par défaut</Typography>
  </Box>
);

export const BoxPadded = () => (
  <Box tag="padded" p={16}>
    <Typography>Box avec padding</Typography>
  </Box>
);

export const BoxPaddedWithBackground = () => (
  <Box tag="padded-with-background" backgroundColor={'#f0f0f0'} p={16}>
    <Typography>Box avec fond gris clair et padding</Typography>
  </Box>
);

export const BoxHovered = () => (
  <Box tag="hovered" backgroundColor="hover:#f0f0f0">
    <Typography>Box avec fond gris changeant au hover</Typography>
  </Box>
);

// Sans tag, Box rend l'element inconnu <box> : il se met en page comme une div.
export const BoxSansTag = () => (
  <Box tag="box-comparaison" gap={8}>
    <Box backgroundColor={'#f0f0f0'} p={16}>
      <Typography>Box sans tag</Typography>
    </Box>
    <Box tag="div" backgroundColor={'#f0f0f0'} p={16}>
      <Typography>Box en div</Typography>
    </Box>
  </Box>
);

export * as Sources from './Box.stories.sources';
