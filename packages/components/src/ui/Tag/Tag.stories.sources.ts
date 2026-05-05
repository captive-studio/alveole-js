// This file is generated. Do not edit manually.
// Source: src/ui/Tag/Tag.stories.tsx

export const Colors = () => "export const Colors = () => (\n  <Box display=\"flex\" flexDirection=\"row\" gap={4} flexWrap=\"wrap\">\n    <Tag size=\"md\" color=\"default\">\n      Tag default\n    </Tag>\n    <Tag size=\"md\" color=\"action\">\n      Tag action\n    </Tag>\n  </Box>\n);";

export const Sizes = () => "export const Sizes = () => (\n  <Box display=\"flex\" flexDirection=\"row\" gap={4} flexWrap=\"wrap\">\n    <Tag size=\"sm\" color=\"default\">\n      Tag sm\n    </Tag>\n    <Tag size=\"md\" color=\"default\">\n      Tag md\n    </Tag>\n  </Box>\n);";

export const storySources = {
  Colors,
  Sizes,
} as const;

export type StorySourceName = keyof typeof storySources;
