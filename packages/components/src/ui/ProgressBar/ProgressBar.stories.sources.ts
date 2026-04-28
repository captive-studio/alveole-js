// This file is generated. Do not edit manually.
// Source: src/ui/ProgressBar/ProgressBar.stories.tsx

export const Determinate = () => 'export const Determinate = () => <ProgressBar mode="determinate" value={0.25} />;';

export const Loop = () => 'export const Loop = () => <ProgressBar mode="loop" />;';

export const Indeterminate = () => 'export const Indeterminate = () => <ProgressBar mode="indeterminate" />;';

export const WithIndicator = () =>
  'export const WithIndicator = () => <ProgressBar mode="determinate" indicator value={0.25} />;';

export const Usage = () =>
  "export const Usage = () => {\n  const [value, setValue] = React.useState(0.25);\n\n  return (\n    <Box>\n      <ProgressBar value={value} />\n\n      <Box mt={'2W'} width={150}>\n        <Button\n          title={value < 1 ? 'Augmenter' : 'Réduire'}\n          variant=\"secondary\"\n          onPress={() => {\n            if (value < 1) setValue(v => v + 0.25);\n            else setValue(v => v - 0.25);\n          }}\n        />\n      </Box>\n    </Box>\n  );\n};";

export const storySources = {
  Determinate,
  Loop,
  Indeterminate,
  WithIndicator,
  Usage,
} as const;

export type StorySourceName = keyof typeof storySources;
