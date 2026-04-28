// This file is generated. Do not edit manually.
// Source: src/ui/ActionMenu/ActionMenu.stories.tsx

export const Default = () => "export const Default = () => {\n  const alignments = [\n    'top',\n    'right',\n    'bottom',\n    'left',\n    'top-start',\n    'top-end',\n    'right-start',\n    'right-end',\n    'bottom-start',\n    'bottom-end',\n    'left-start',\n    'left-end',\n  ] as const;\n\n  return (\n    <Box\n      display=\"flex\"\n      flexWrap=\"wrap\"\n      gap=\"1W\"\n      flexDirection=\"row\"\n      justify-content=\"center\"\n      align-items=\"center\"\n      width=\"100%\"\n    >\n      {alignments.map(alignment => (\n        <ActionMenu\n          key={alignment}\n          placement={alignment}\n          renderTrigger={() => <Button variant=\"secondary\" title={alignment} />}\n        >\n          <ActionMenu.Item title=\"Contenu de l'action menu\" icon=\"Settings\" selected />\n          <ActionMenu.Item title=\"Contenu de l'action menu\" icon=\"Copy\" />\n          <ActionMenu.Item title=\"Contenu de l'action menu\" icon=\"Trash\" />\n        </ActionMenu>\n      ))}\n    </Box>\n  );\n};";

export const storySources = {
  Default,
} as const;

export type StorySourceName = keyof typeof storySources;
