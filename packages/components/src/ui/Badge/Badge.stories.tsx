import { Box } from '@alveole/components';
import type { Story } from '../../type/Story';
import { Badge } from './Badge';
import { useStyles } from './Badge.styles';

export default {
  title: 'Badge',
  tags: ['Kit'],
  experimental: false,
  figmaURL: 'https://www.figma.com/design/xJz8Z6vfrnZPKTtRbuT2W8/Composants?node-id=1002-547',
  description: 'Différents variants de badges. Composant de type Typography.',
  component: Badge,
  styleFn: useStyles,
} satisfies Story;

export const Variants = () => (
  <Box>
    <Box display="flex" flexDirection="column" gap={4}>
      <Badge size="md" variant="default">
        Badge default
      </Badge>
      <Badge size="md" variant="info">
        Badge info
      </Badge>
      <Badge size="md" variant="error">
        Badge error
      </Badge>
      <Badge size="md" variant="new">
        Badge new
      </Badge>
      <Badge size="md" variant="success">
        Badge success
      </Badge>
      <Badge size="md" variant="warning">
        Badge warning
      </Badge>
    </Box>
  </Box>
);

export const Sizes = () => (
  <Box display="flex" flexDirection="row" gap={4} flexWrap="wrap">
    <Badge size="sm" variant="info" m="auto">
      Badge small
    </Badge>
    <Badge size="md" variant="info">
      Badge medium
    </Badge>
  </Box>
);

export const Icons = () => (
  <Box display="flex" flexDirection="row" gap={4} flexWrap="wrap">
    <Badge size="sm" variant="info" icon="Check">
      Badge small
    </Badge>
  </Box>
);
