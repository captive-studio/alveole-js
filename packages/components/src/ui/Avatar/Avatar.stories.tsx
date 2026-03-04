import { Box } from '@alveole/components';
import { Story } from '../../type/Story';
import { Avatar } from './Avatar';
import { useStyles } from './Avatar.styles';

export default {
  title: 'Avatar',
  tags: ['Kit'],
  experimental: false,
  figmaURL: 'https://www.figma.com/design/xJz8Z6vfrnZPKTtRbuT2W8/Composants?node-id=1002-546',
  description: 'Avatar avec image ou texte, de différentes tailles. Composant de type Avatar (tamagui).',
  component: Avatar,
  styleFn: useStyles,
} satisfies Story;

export const Sizes = () => (
  <Box display="flex" flexDirection="row" gap={8} flexWrap="wrap">
    <Avatar size="xs" src="https://picsum.photos/100/200" />
    <Avatar size="sm" src="https://picsum.photos/100/200" />
    <Avatar size="md" src="https://picsum.photos/100/200" />
    <Avatar size="lg" src="https://picsum.photos/100/200" />
    <Avatar size="xl" src="https://picsum.photos/100/200" />
  </Box>
);

export const Variants = () => (
  <Box display="flex" flexDirection="row" gap={8} flexWrap="wrap">
    <Avatar size="sm" src="https://picsum.photos/100/200" />
    <Avatar size="sm" fallbackText="Jean Pierre" />
    <Avatar size="sm" fallbackText="Jean-Pierre" />
  </Box>
);
