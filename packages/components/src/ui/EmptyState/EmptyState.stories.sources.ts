// This file is generated. Do not edit manually.
// Source: src/ui/EmptyState/EmptyState.stories.tsx

export const Default = () => "export const Default = () => {\n  return (\n    <EmptyState\n      title=\"Aucun élément pour l’instant\"\n      description=\"Ajoutez un premier élément pour commencer à travailler sur cette section.\"\n    />\n  );\n};";

export const WithIcon = () => "export const WithIcon = () => {\n  return (\n    <EmptyState\n      iconName=\"ClipboardList\"\n      title=\"Aucune donnée\"\n      description=\"Ajoutez un élément pour remplir ce tableau.\"\n    />\n  );\n};";

export const WithActions = () => "export const WithActions = () => {\n  return (\n    <EmptyState\n      iconName=\"FilePlus\"\n      title=\"Vous n’avez aucun document\"\n      description=\"Créez un premier document ou importez-en un depuis votre ordinateur.\"\n      actions={\n        <>\n          <Button title=\"Créer un document\" variant=\"primary\" />\n          <Button title=\"Importer un fichier\" variant=\"secondary\" />\n        </>\n      }\n    />\n  );\n};";

export const WithCustomChildren = () => "export const WithCustomChildren = () => {\n  return (\n    <EmptyState iconName=\"File\" description={'Vous n’avez aucun item'}>\n      <Button title={'Button'} variant={'primary'} fullWidth />\n      <Button title={'Secondary action link'} variant={'link'} />\n    </EmptyState>\n  );\n};";

export const WithFixHeight = () => "export const WithFixHeight = () => {\n  return (\n    <EmptyState iconName=\"File\" description={'Vous n’avez aucun item'} style={{ height: '600px' }}>\n      <Button title={'Button'} variant={'primary'} />\n      <Button title={'Secondary action link'} variant={'link'} />\n    </EmptyState>\n  );\n};";

export const storySources = {
  Default,
  WithIcon,
  WithActions,
  WithCustomChildren,
  WithFixHeight,
} as const;

export type StorySourceName = keyof typeof storySources;
