import { useState } from 'react';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { Story } from '../../type';
import { Button } from '../Button';
import { BottomSheet } from './BottomSheet';
import { useStyles } from './BottomSheet.styles';

export default {
  title: 'BottomSheet',
  tags: ['ui'],
  experimental: true,
  description: 'Bottom sheet modal',
  component: BottomSheet,
  styleFn: useStyles,
} satisfies Story;

export const Default = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box display="flex" flexDirection="row">
        <Button title="Ouvrir la modal" variant="primary" onPress={() => setOpen(true)} />
      </Box>

      <BottomSheet open={open} setOpen={setOpen} points={[80, 25]} title="Titre">
        <Typography>Children</Typography>
      </BottomSheet>
    </>
  );
};

export const WithAction = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box display="flex" flexDirection="row">
        <Button title="Ouvrir la modal" variant="primary" onPress={() => setOpen(true)} />
      </Box>

      <BottomSheet
        open={open}
        setOpen={setOpen}
        points={[50]}
        title="Titre"
        action={<Button title="Action" variant="tertiary" size="sm" />}
      >
        <Typography>Children</Typography>
      </BottomSheet>
    </>
  );
};

export const FitContent = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box display="flex" flexDirection="row">
        <Button title="Ouvrir la modal" variant="primary" onPress={() => setOpen(true)} />
      </Box>

      <BottomSheet fitContent open={open} setOpen={setOpen} title="Titre">
        <Typography height={100}>Children</Typography>
      </BottomSheet>
    </>
  );
};

export * as Sources from './BottomSheet.stories.sources';
