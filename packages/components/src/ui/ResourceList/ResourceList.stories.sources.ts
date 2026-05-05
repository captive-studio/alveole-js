// This file is generated. Do not edit manually.
// Source: src/ui/ResourceList/ResourceList.stories.tsx

export const Default = () => "export const Default = () => (\n  <ResourceList\n    data={exampleData}\n    keyExtractor={item => item.id}\n    renderItem={({ item, index }) => (\n      <ListItem title={item.name} description={item.description} showSeparateur={index !== 0} />\n    )}\n    renderNoContent={() => <EmptyState title=\"Aucun élément\" description=\"Cliquez sur le bouton\" iconName=\"House\" />}\n  />\n);";

export const WithTitle = () => "export const WithTitle = () => (\n  <ResourceList\n    titre=\"Titre de la liste\"\n    data={exampleData}\n    keyExtractor={item => item.id}\n    renderItem={({ item, index }) => (\n      <ListItem title={item.name} description={item.description} showSeparateur={index !== 0} />\n    )}\n    renderNoContent={() => <EmptyState title=\"Aucun élément\" description=\"Cliquez sur le bouton\" iconName=\"House\" />}\n  />\n);";

export const WithIcon = () => "export const WithIcon = () => (\n  <ResourceList\n    data={exampleData}\n    keyExtractor={item => item.id}\n    renderItem={({ item, index }) => (\n      <ListItem\n        title={item.name}\n        description={item.description}\n        IconProps={{ name: 'Settings' }}\n        showSeparateur={index !== 0}\n      />\n    )}\n    renderNoContent={() => <EmptyState title=\"Aucun élément\" description=\"Cliquez sur le bouton\" iconName=\"House\" />}\n  />\n);";

export const WithPreviewImageAndTrailing = () => "export const WithPreviewImageAndTrailing = () => (\n  <ResourceList\n    data={exampleDataWithPreview}\n    keyExtractor={item => item.id}\n    renderItem={({ item, index }) => (\n      <ListItem\n        title={item.name}\n        description={item.description}\n        preview_url={item.preview_url}\n        trailing={() => <LucideIcon name=\"ChevronRight\" size=\"sm\" />}\n        showSeparateur={index !== 0}\n      />\n    )}\n    renderNoContent={() => <EmptyState title=\"Aucun élément\" description=\"Cliquez sur le bouton\" iconName=\"House\" />}\n  />\n);";

export const WithNoContent = () => "export const WithNoContent = () => (\n  <ResourceList\n    data={[] as typeof exampleData}\n    keyExtractor={item => item.id}\n    renderItem={({ item }) => <ListItem title={item.name} description={item.description} />}\n    renderNoContent={() => <EmptyState title=\"Aucun élément\" description=\"Cliquez sur le bouton\" iconName=\"House\" />}\n  />\n);";

export const WithDivider = () => "export const WithDivider = () => (\n  <ResourceList\n    data={exampleData}\n    keyExtractor={item => item.id}\n    renderItem={({ item, index }) => (\n      <ListItem title={item.name} description={item.description} showSeparateur={index !== 0} />\n    )}\n    ItemSeparatorComponent={ResourceListDivider}\n    renderNoContent={() => <EmptyState title=\"Aucun élément\" description=\"Cliquez sur le bouton\" iconName=\"House\" />}\n  />\n);";

export const storySources = {
  Default,
  WithTitle,
  WithIcon,
  WithPreviewImageAndTrailing,
  WithNoContent,
  WithDivider,
} as const;

export type StorySourceName = keyof typeof storySources;
