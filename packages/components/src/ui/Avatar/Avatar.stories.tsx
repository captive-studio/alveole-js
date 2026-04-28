import { Box } from '../../core';
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

const styleContainer = {
  display: 'flex',
  flexDirection: 'row',
  gap: 8,
  alignItems: 'center',
  flexWrap: 'wrap',
} as const;

export const Sizes = () => (
  <Box style={styleContainer}>
    <Avatar size="xs" src="https://picsum.photos/100/200" />
    <Avatar size="sm" src="https://picsum.photos/100/200" />
    <Avatar size="md" src="https://picsum.photos/100/200" />
    <Avatar size="lg" src="https://picsum.photos/100/200" />
    <Avatar size="xl" src="https://picsum.photos/100/200" />
  </Box>
);

export const WithFallbackText = () => (
  <Box style={styleContainer}>
    <Avatar size="lg" fallbackText="Jean Pierre" />
    <Avatar size="md" fallbackText="Jean Pierre" />
  </Box>
);

export const Carre = () => (
  <Box style={styleContainer}>
    <Avatar size="xs" src="https://picsum.photos/100/200" carre />
    <Avatar size="sm" src="https://picsum.photos/100/200" carre />
    <Avatar size="md" src="https://picsum.photos/100/200" carre />
    <Avatar size="lg" src="https://picsum.photos/100/200" carre />
    <Avatar size="xl" src="https://picsum.photos/100/200" carre />
  </Box>
);

export * as Sources from './Avatar.stories.sources';
