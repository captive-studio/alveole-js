import { Story } from '../../type';
import { Typography } from '../Typography';
import { Box } from './Box';

export default {
  title: 'Box',
  tags: ['core'],
  experimental: false,
  description:
    'La Box doit être utilisé pour tout contenir, à la manière d‘une <div>. De type View (tamagui), elle permet de définir le tag rendu en web.',
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
  <Box tag="hovered" hoverStyle={{ background: '#f0f0f0' }}>
    <Typography>Box avec fond gris changeant au hover</Typography>
  </Box>
);

export * as Sources from './Box.stories.sources';
