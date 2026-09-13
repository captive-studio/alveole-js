import React from 'react';
import { Box } from '../../core/Box';
import { Story } from '../../type';
import { FilterDate, FilterDateValue } from './FilterDate';
import { useStyles } from './FilterDate.styles';

export default {
  title: 'FilterDate',
  tags: ['ui'],
  experimental: false,
  description: 'Modal de selection d’année/mois',
  component: FilterDate,
  styleFn: useStyles,
} satisfies Story;

export const Default = () => {
  const [value, setValue] = React.useState<FilterDateValue>({ years: [], months: [] });

  return (
    <Box display="flex" flexDirection="row" justify="flex-start">
      <FilterDate title="Titre" from={1990} to={'today'} value={value} onChange={setValue} />
    </Box>
  );
};

export * as Sources from './FilterDate.stories.sources';
