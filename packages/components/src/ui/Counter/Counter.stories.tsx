import { Box } from '../../core/Box';
import type { Story } from '../../type/Story';
import { Counter } from './Counter';
import { useStyles } from './Counter.styles';

export default {
  title: 'Counter',
  tags: ['ui'],
  experimental: false,
  figmaURL:
    'https://www.figma.com/design/xJz8Z6vfrnZPKTtRbuT2W8/Alveole---Composants?node-id=1871-3052&t=s1FT99TtCUvIPAfB-4',
  description: 'Badge numérique indiquant un compteur. Utilisé dans les onglets.',
  component: Counter,
  styleFn: useStyles,
} satisfies Story;

export const Default = () => (
  <Box display="flex" flexDirection="row" gap={8} style={{ alignItems: 'center' }}>
    <Counter variant="default" count={20} />
    <Counter variant="primary" count={20} />
  </Box>
);

export * as Sources from './Counter.stories.sources';
