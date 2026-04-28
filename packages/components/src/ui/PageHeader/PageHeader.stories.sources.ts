// This file is generated. Do not edit manually.
// Source: src/ui/PageHeader/PageHeader.stories.tsx

export const Default = () =>
  'export const Default = () => (\n  <Box p={4}>\n    <PageHeader title="Titre de la page" />\n  </Box>\n);';

export const WithActions = () =>
  'export const WithActions = () => (\n  <Box p={4}>\n    <PageHeader\n      title="Détail de la mission"\n      actions={\n        <>\n          <Button variant="primary" title="Enregistrer" size="sm" onPress={() => {}} />\n        </>\n      }\n    />\n  </Box>\n);';

export const storySources = {
  Default,
  WithActions,
} as const;

export type StorySourceName = keyof typeof storySources;
