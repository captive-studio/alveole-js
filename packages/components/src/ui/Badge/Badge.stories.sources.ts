// This file is generated. Do not edit manually.
// Source: src/ui/Badge/Badge.stories.tsx

export const Variants = () => "export const Variants = () => (\n  <Box>\n    <Box display=\"flex\" flexDirection=\"column\" gap={4}>\n      <Badge size=\"md\" variant=\"default\">\n        Badge default\n      </Badge>\n      <Badge size=\"md\" variant=\"info\">\n        Badge info\n      </Badge>\n      <Badge size=\"md\" variant=\"error\">\n        Badge error\n      </Badge>\n      <Badge size=\"md\" variant=\"new\">\n        Badge new\n      </Badge>\n      <Badge size=\"md\" variant=\"success\">\n        Badge success\n      </Badge>\n      <Badge size=\"md\" variant=\"warning\">\n        Badge warning\n      </Badge>\n    </Box>\n  </Box>\n);";

export const Sizes = () => "export const Sizes = () => (\n  <Box display=\"flex\" flexDirection=\"row\" gap={4} flexWrap=\"wrap\">\n    <Badge size=\"sm\" variant=\"info\" m=\"auto\">\n      Badge small\n    </Badge>\n    <Badge size=\"md\" variant=\"info\">\n      Badge medium\n    </Badge>\n  </Box>\n);";

export const Icons = () => "export const Icons = () => (\n  <Box display=\"flex\" flexDirection=\"row\" gap={4} flexWrap=\"wrap\">\n    <Badge size=\"sm\" variant=\"info\" icon=\"Check\">\n      Badge small\n    </Badge>\n  </Box>\n);";

export const storySources = {
  Variants,
  Sizes,
  Icons,
} as const;

export type StorySourceName = keyof typeof storySources;
