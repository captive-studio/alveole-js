import { Box, Button, Typography } from '@alveole/components';
import type { Story } from '../../type';
import { Popover } from './Popover';
import { useStyles } from './Popover.styles';

export default {
  title: 'Popover',
  tags: ['Kit'],
  experimental: false,
  description: 'Zone cliquable avec ouverture d’un Popover (Tamagui Popover).',
  figmaURL:
    'https://www.figma.com/design/xJz8Z6vfrnZPKTtRbuT2W8/Alveole---Composants?node-id=2881-442&t=A0jkRqZdoWBKbIWd-4',
  component: Popover,
  styleFn: useStyles,
} satisfies Story;

export const Default = () => {
  const alignments = [
    'top',
    'right',
    'bottom',
    'left',
    'top-start',
    'top-end',
    'right-start',
    'right-end',
    'bottom-start',
    'bottom-end',
    'left-start',
    'left-end',
  ] as const;

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      gap="1W"
      flexDirection="row"
      justify-content="center"
      align-items="center"
      width="100%"
    >
      {alignments.map(alignment => (
        <Popover
          key={alignment}
          placement={alignment}
          renderTrigger={() => <Button variant="secondary" title={alignment} />}
        >
          <Typography>Contenu du popover</Typography>
        </Popover>
      ))}
    </Box>
  );
};

export * as Sources from './Popover.stories.sources';
