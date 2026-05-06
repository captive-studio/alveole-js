// This file is generated. Do not edit manually.
// Source: src/core/A/A.stories.tsx

export const Default = () => "export const Default = () => (\n  <A href={'/ui-kit/components/A'}>\n    <Typography>Mon lien</Typography>\n  </A>\n);";

export const LinkBlock = () => "export const LinkBlock = () => (\n  <A href={'/ui-kit/components/A'}>\n    <Card>\n      <Card.Header\n        titre=\"Titre de la carte\"\n        sousTitre=\"Sous-titre de la carte\"\n        image={<Avatar size=\"md\" fallbackText=\"M\" />}\n      />\n      <Card.Section titre=\"Titre de la carte\" titreIcone=\"Calendar\" description=\"Description de la carte\" />\n    </Card>\n  </A>\n);";

export const storySources = {
  Default,
  LinkBlock,
} as const;

export type StorySourceName = keyof typeof storySources;
