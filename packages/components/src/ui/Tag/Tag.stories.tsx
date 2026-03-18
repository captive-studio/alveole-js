import { Box } from '../../core';
import { Story } from '../../type';
import { Tag } from './Tag';
import { useStyles } from './Tag.styles';

export default {
  title: 'Tag',
  tags: ['Kit'],
  experimental: false,
  figmaURL: 'https://www.figma.com/design/xJz8Z6vfrnZPKTtRbuT2W8/Alveole---Composants?node-id=1002-8509',
  description: 'Différents tags. Composant de type Typography.',
  component: Tag,
  styleFn: useStyles,
} satisfies Story;

export const Colors = () => (
  <Box>
    <Box display="flex" flexDirection="column" gap={4}>
      <Tag size="md" color="default">
        Tag default
      </Tag>
      <Tag size="md" color="action">
        Tag action
      </Tag>
    </Box>
  </Box>
);

export const Sizes = () => (
  <Box display="flex" flexDirection="row" gap={4} flexWrap="wrap">
    <Tag size="sm" color="default">
      Tag sm
    </Tag>
    <Tag size="md" color="default">
      Tag md
    </Tag>
  </Box>
);
