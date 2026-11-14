import React from 'react';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { Story } from '../../type';
import { libelleDePlage } from './plage';
import { PlageAbsolue, TimeRangeInput } from './TimeRangeInput';
import { useStyles } from './TimeRangeInput.styles';

export default {
  title: 'TimeRangeInput',
  tags: ['ui'],
  experimental: true,
  description:
    "Choix d'une plage de dates au calendrier, avec heure de début, heure de fin et lecture en UTC. Utilisé par FilterTimeRange pour la « Date absolue ».",
  component: TimeRangeInput,
  styleFn: useStyles,
} satisfies Story;

export const Default = () => {
  const [value, setValue] = React.useState<PlageAbsolue>({
    type: 'absolue',
    debut: new Date('2026-10-14T00:00:00Z'),
    fin: new Date('2026-10-22T23:59:00Z'),
    utc: true,
  });

  return (
    <Box gap="1W">
      <TimeRangeInput value={value} onApply={setValue} onCancel={() => undefined} />
      <Typography>{libelleDePlage(value)}</Typography>
    </Box>
  );
};

export const EnAnglaisSansRetour = () => {
  const [value, setValue] = React.useState<PlageAbsolue>();

  return (
    <Box gap="1W">
      <TimeRangeInput local="en" title="Filter Time Range" value={value} onApply={setValue} />
      {value && <Typography>{libelleDePlage(value, 'en')}</Typography>}
    </Box>
  );
};

export * as Sources from './TimeRangeInput.stories.sources';
