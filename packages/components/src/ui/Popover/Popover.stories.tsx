import type { Story } from '../../type';
import { Box, Button, Typography } from '@alveole/components';
import React from 'react';
import { Popover } from './Popover';
import { useStyles } from './Popover.styles';

export default {
  title: 'Popover',
  tags: ['Kit'],
  experimental: false,
  description: 'Zone cliquable avec ouverture d’un Popover (Tamagui Popover).',
  figmaURL: 'https://www.figma.com/design/xJz8Z6vfrnZPKTtRbuT2W8/Alveole---Composants?node-id=2881-442&t=A0jkRqZdoWBKbIWd-4',
  component: Popover,
  styleFn: useStyles,
} satisfies Story;

export const Default = () => (
  <Popover placement="right" renderTrigger={() => <Button variant="tertiary" title="Actions" />}>
    <Typography>Children</Typography>
  </Popover>
);

export const Bottom = () => (
  <Popover
    placement="bottom"
    renderTrigger={() => (
      <Box>
        <Typography>Sur typographie</Typography>
      </Box>
    )}
  >
    <Typography>Children</Typography>
  </Popover>
);
