import { Story } from '../../type';
import { Highlight } from './Highlight';
import { useStyles } from './Highlight.styles';

export default {
  title: 'Highlight',
  tags: ['core'],
  experimental: true,
  description: 'Affiche du code en typescript, html, json, etc. Composant de type Light (react-syntax-highlighter).',
  component: Highlight,
  styleFn: useStyles,
} satisfies Story;

export const HighlightJSON = () => (
  <Highlight language="json">{JSON.stringify({ id: 'user_id_1', name: 'Jean-Pierre', age: 20 }, null, 2)}</Highlight>
);

export const HighlightTypescript = () => (
  <Highlight language="typescript">{"const id: string = 'user_id_1';"}</Highlight>
);

export const HighlightTSX = () => (
  <Highlight language="tsx">{`<Typography tag="span" p={spacing('100')}>Bonjour</Typography>`}</Highlight>
);

export * as Sources from './Highlight.stories.sources';
