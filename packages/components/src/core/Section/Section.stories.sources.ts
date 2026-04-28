// This file is generated. Do not edit manually.
// Source: src/core/Section/Section.stories.tsx

export const Default = () => "export const Default = () => (\n  <Section>\n    <Box>\n      <Typography>Section avec background</Typography>\n    </Box>\n  </Section>\n);";

export const WithPaddingY = () => "export const WithPaddingY = () => (\n  <Section backgroundColor={paddingColor} withPaddingY>\n    <Box backgroundColor={innerBoxColor} p={'050'}>\n      <Typography>Section avec background et padding Y</Typography>\n    </Box>\n  </Section>\n);";

export const WidthMdSize = () => "export const WidthMdSize = () => (\n  <Section backgroundColor={paddingColor} size=\"md\">\n    <Box backgroundColor={innerBoxColor} p={'050'}>\n      <Typography>Section avec background et size md</Typography>\n    </Box>\n  </Section>\n);";

export const WidthFullSize = () => "export const WidthFullSize = () => (\n  <Section backgroundColor={paddingColor} size=\"full\">\n    <Box backgroundColor={innerBoxColor} p={'050'}>\n      <Typography>Section avec background et size full (taille par défaut)</Typography>\n    </Box>\n  </Section>\n);";

export const WidthSmSize = () => "export const WidthSmSize = () => (\n  <Section backgroundColor={paddingColor} size=\"sm\">\n    <Box backgroundColor={innerBoxColor} p={'050'}>\n      <Typography>Section avec background et size sm</Typography>\n    </Box>\n  </Section>\n);";

export const storySources = {
  Default,
  WithPaddingY,
  WidthMdSize,
  WidthFullSize,
  WidthSmSize,
} as const;

export type StorySourceName = keyof typeof storySources;
