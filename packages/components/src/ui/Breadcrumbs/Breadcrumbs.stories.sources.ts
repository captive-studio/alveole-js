// This file is generated. Do not edit manually.
// Source: src/ui/Breadcrumbs/Breadcrumbs.stories.tsx

export const Default = () => 'export const Default = () => (\n  <Box p={4}>\n    <Breadcrumbs />\n  </Box>\n);';

export const WithCustomRootLabel = () =>
  'export const WithCustomRootLabel = () => (\n  <Box p={4}>\n    <Breadcrumbs rootLabel="Tableau de bord" />\n  </Box>\n);';

export const WithCustomLabels = () =>
  "export const WithCustomLabels = () => (\n  <Box p={4}>\n    <Breadcrumbs\n      getLabel={(segment, _index, _path) => {\n        const labels: Record<string, string> = {\n          admin: 'Administration',\n          missions: 'Missions',\n          show: 'Détail',\n          salarie: 'Espace salarié',\n          client: 'Espace client',\n        };\n        return labels[segment] ?? segment;\n      }}\n    />\n  </Box>\n);";

export const WithSegmentsToSkip = () =>
  "export const WithSegmentsToSkip = () => (\n  <Box p={4}>\n    <Breadcrumbs\n      segmentsToSkip={['admin', 'ui-kit']}\n      getLabel={(segment, _index, _path) => {\n        const labels: Record<string, string> = {\n          admin: 'Administration',\n          missions: 'Missions',\n          show: 'Détail',\n          salarie: 'Espace salarié',\n          client: 'Espace client',\n        };\n        return labels[segment] ?? segment;\n      }}\n    />\n  </Box>\n);";

export const storySources = {
  Default,
  WithCustomRootLabel,
  WithCustomLabels,
  WithSegmentsToSkip,
} as const;

export type StorySourceName = keyof typeof storySources;
