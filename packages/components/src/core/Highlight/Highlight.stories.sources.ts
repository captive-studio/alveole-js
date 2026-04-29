// This file is generated. Do not edit manually.
// Source: src/core/Highlight/Highlight.stories.tsx

export const HighlightJSON = () =>
  "export const HighlightJSON = () => (\n  <Highlight language=\"json\">{JSON.stringify({ id: 'user_id_1', name: 'Jean-Pierre', age: 20 }, null, 2)}</Highlight>\n);";

export const HighlightTypescript = () =>
  'export const HighlightTypescript = () => (\n  <Highlight language="typescript">{"const id: string = \'user_id_1\';"}</Highlight>\n);';

export const HighlightTSX = () =>
  'export const HighlightTSX = () => (\n  <Highlight language="tsx">{`<Typography tag="span" p={spacing(\'100\')}>Bonjour</Typography>`}</Highlight>\n);';

export const storySources = {
  HighlightJSON,
  HighlightTypescript,
  HighlightTSX,
} as const;

export type StorySourceName = keyof typeof storySources;
