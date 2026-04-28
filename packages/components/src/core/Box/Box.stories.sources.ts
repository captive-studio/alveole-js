// This file is generated. Do not edit manually.
// Source: src/core/Box/Box.stories.tsx

export const BoxDefault = () =>
  'export const BoxDefault = () => (\n  <Box tag="box">\n    <Typography>Contenu par défaut</Typography>\n  </Box>\n);';

export const BoxPadded = () =>
  'export const BoxPadded = () => (\n  <Box tag="padded" p={16}>\n    <Typography>Box avec padding</Typography>\n  </Box>\n);';

export const BoxPaddedWithBackground = () =>
  'export const BoxPaddedWithBackground = () => (\n  <Box tag="padded-with-background" backgroundColor={\'#f0f0f0\'} p={16}>\n    <Typography>Box avec fond gris clair et padding</Typography>\n  </Box>\n);';

export const BoxHovered = () =>
  'export const BoxHovered = () => (\n  <Box tag="hovered" hoverStyle={{ background: \'#f0f0f0\' }}>\n    <Typography>Box avec fond gris changeant au hover</Typography>\n  </Box>\n);';

export const storySources = {
  BoxDefault,
  BoxPadded,
  BoxPaddedWithBackground,
  BoxHovered,
} as const;

export type StorySourceName = keyof typeof storySources;
