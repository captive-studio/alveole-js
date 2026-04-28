// This file is generated. Do not edit manually.
// Source: src/ui/Tabs/Tabs.stories.tsx

export const Example = () =>
  "export const Example = () => {\n  const [_activeTab, setActiveTab] = React.useState(0);\n\n  return (\n    <Box width={'100%'}>\n      <Tabs\n        defaultValue={'onglet-1'}\n        onChange={setActiveTab}\n        tabs={[\n          { label: 'Onglet 1', value: 'onglet-1', content: <Typography>Contenu de onglet 1</Typography> },\n          { label: 'Onglet 2', counter: 12, value: 'onglet-2', content: <Typography>Contenu de onglet 2</Typography> },\n          { label: 'Onglet 3', value: 'onglet-3', content: <Typography>Contenu de onglet 3</Typography> },\n          {\n            label: 'Onglet 4',\n            icon: 'Settings',\n            value: 'onglet-4',\n            content: <Typography>Contenu de onglet 4</Typography>,\n          },\n        ]}\n      />\n    </Box>\n  );\n};";

export const storySources = {
  Example,
} as const;

export type StorySourceName = keyof typeof storySources;
