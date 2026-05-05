// This file is generated. Do not edit manually.
// Source: src/ui/Signature/Signature.stories.tsx

export const Example = () => "export const Example = () => {\n  const containerHeight = 100;\n  const [value, setValue] = React.useState<string | null>(null);\n\n  return (\n    <Box width={'100%'}>\n      <Signature height={containerHeight} onChange={setValue} />\n\n      {value && (\n        <>\n          <Typography fontSize={24}>Signature capturée :</Typography>\n          <Image contentFit=\"contain\" height={containerHeight} width=\"100%\" source={value} />\n        </>\n      )}\n    </Box>\n  );\n};";

export const CustomLabels = () => "export const CustomLabels = () => {\n  const containerHeight = 100;\n  const [value, setValue] = React.useState<string | null>(null);\n\n  return (\n    <Box width={'100%'}>\n      <Signature height={containerHeight} onChange={setValue} dateLabel=\"Date :\" clearButtonLabel=\"Clear\" />\n\n      {value && (\n        <>\n          <Typography fontSize={24}>Captured signature:</Typography>\n          <Image contentFit=\"contain\" height={containerHeight} width=\"100%\" source={value} />\n        </>\n      )}\n    </Box>\n  );\n};";

export const storySources = {
  Example,
  CustomLabels,
} as const;

export type StorySourceName = keyof typeof storySources;
