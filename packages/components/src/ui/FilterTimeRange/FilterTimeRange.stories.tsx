import React from 'react';
import { Box } from '../../core/Box';
import { Story } from '../../type';
import type { PlageDeTemps } from '../TimeRangeInput';
import { FilterTimeRange } from './FilterTimeRange';
import { useStyles } from './FilterTimeRange.styles';

export default {
  title: 'FilterTimeRange',
  tags: ['ui'],
  experimental: true,
  description:
    'Filtre sur une plage de temps : plages relatives prédéfinies, plage libre saisie (`2h`, `4d`, `8w`) ou « Date absolue » qui ouvre le TimeRangeInput.',
  component: FilterTimeRange,
  styleFn: useStyles,
} satisfies Story;

export const Default = () => {
  const [value, setValue] = React.useState<PlageDeTemps>({ type: 'relative', duree: '14d' });

  return (
    <Box display="flex" flexDirection="row" justify="flex-start">
      <FilterTimeRange title="Filtrer la période" value={value} onChange={setValue} />
    </Box>
  );
};

export const EnAnglaisSansValeur = () => {
  const [value, setValue] = React.useState<PlageDeTemps>();

  return (
    <Box display="flex" flexDirection="row" justify="flex-start">
      <FilterTimeRange title="Filter Time Range" local="en" value={value} onChange={setValue} />
    </Box>
  );
};

export * as Sources from './FilterTimeRange.stories.sources';
