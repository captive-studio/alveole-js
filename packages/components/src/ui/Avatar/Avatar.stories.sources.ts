// This file is generated. Do not edit manually.
// Source: src/ui/Avatar/Avatar.stories.tsx

export const Sizes = () =>
  'export const Sizes = () => (\n  <Box style={styleContainer}>\n    <Avatar size="xs" src="https://picsum.photos/100/200" />\n    <Avatar size="sm" src="https://picsum.photos/100/200" />\n    <Avatar size="md" src="https://picsum.photos/100/200" />\n    <Avatar size="lg" src="https://picsum.photos/100/200" />\n    <Avatar size="xl" src="https://picsum.photos/100/200" />\n  </Box>\n);';

export const WithFallbackText = () =>
  'export const WithFallbackText = () => (\n  <Box style={styleContainer}>\n    <Avatar size="lg" fallbackText="Jean Pierre" />\n    <Avatar size="md" fallbackText="Jean Pierre" />\n  </Box>\n);';

export const Carre = () =>
  'export const Carre = () => (\n  <Box style={styleContainer}>\n    <Avatar size="xs" src="https://picsum.photos/100/200" carre />\n    <Avatar size="sm" src="https://picsum.photos/100/200" carre />\n    <Avatar size="md" src="https://picsum.photos/100/200" carre />\n    <Avatar size="lg" src="https://picsum.photos/100/200" carre />\n    <Avatar size="xl" src="https://picsum.photos/100/200" carre />\n  </Box>\n);';

export const storySources = {
  Sizes,
  WithFallbackText,
  Carre,
} as const;

export type StorySourceName = keyof typeof storySources;
