import React from 'react';
import { Box } from '../../core/Box';
import { Story } from '../../type';
import { Button } from '../Button';
import { ProgressBar } from './ProgressBar';
import { useStyles } from './ProgressBar.styles';

export default {
  title: 'ProgressBar',
  tags: ['ui'],
  experimental: false,
  description: 'Barre de progression',
  component: ProgressBar,
  styleFn: useStyles,
} satisfies Story;

export const Determinate = () => <ProgressBar mode="determinate" value={0.25} />;

export const Loop = () => <ProgressBar mode="loop" />;

export const Indeterminate = () => <ProgressBar mode="indeterminate" />;

export const WithIndicator = () => <ProgressBar mode="determinate" indicator value={0.25} />;

export const NoRadius = () => <ProgressBar mode="determinate" noRadius value={0.25} />;

export const Usage = () => {
  const [value, setValue] = React.useState(0.25);

  return (
    <Box>
      <ProgressBar value={value} />

      <Box mt={'2W'} width={150}>
        <Button
          title={value < 1 ? 'Augmenter' : 'Réduire'}
          variant="secondary"
          onPress={() => {
            if (value < 1) setValue(v => v + 0.25);
            else setValue(v => v - 0.25);
          }}
        />
      </Box>
    </Box>
  );
};

export * as Sources from './ProgressBar.stories.sources';
