import { Story } from '../../type';
import { Divider } from './Divider';
import { useStyles } from './Divider.styles';

export default {
  title: 'Divider',
  tags: ['ui'],
  experimental: false,
  figmaURL: 'https://www.figma.com/design/xJz8Z6vfrnZPKTtRbuT2W8/Composants?node-id=1002-15729',
  description: 'Sérateur. Composant de type Box - Equivalent <hr/>.',
  component: Divider,
  styleFn: useStyles,
} satisfies Story;

export const Default = () => <Divider mt={8} mb={16} />;

export * as Sources from './Divider.stories.sources';
