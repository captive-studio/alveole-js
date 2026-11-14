import { format } from 'date-fns/format';
import React from 'react';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { Story } from '../../type';
import { DateRangeInput, PlageDeDates } from './DateRangeInput';
import { useStyles } from './DateRangeInput.styles';

export default {
  title: 'DateRangeInput',
  tags: ['ui'],
  experimental: true,
  description:
    "Choix d'une plage de dates au calendrier, sans heure. Le mois et l'année se changent par les flèches ou en cliquant dessus. TimeRangeInput y ajoute les heures et l'UTC.",
  component: DateRangeInput,
  styleFn: useStyles,
} satisfies Story;

export const Default = () => {
  const [value, setValue] = React.useState<PlageDeDates>({ debut: new Date(2026, 9, 14), fin: new Date(2026, 9, 22) });

  return (
    <Box gap="1W">
      <DateRangeInput value={value} onApply={setValue} onCancel={() => undefined} />
      <Typography>{`${format(value.debut, 'dd/MM/yyyy')} – ${format(value.fin, 'dd/MM/yyyy')}`}</Typography>
    </Box>
  );
};

export const EnAnglaisSansValeur = () => {
  const [value, setValue] = React.useState<PlageDeDates>();

  return <DateRangeInput title="Date range" local="en" value={value} onApply={setValue} />;
};

export * as Sources from './DateRangeInput.stories.sources';
