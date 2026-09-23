import React from 'react';
import { Box } from '../../core/Box';
import { Grid } from '../../core/Grid';
import { Story } from '../../type';
import { DateInput } from './DateInput';
import { useStyles } from './DateInput.styles';

export default {
  title: 'DateInput',
  tags: ['ui'],
  experimental: true,
  description: 'Champs de saisie de date.',
  component: DateInput,
  styleFn: useStyles,
} satisfies Story;

export const Default = () => (
  <Box width={'100%'}>
    <Grid gap={8}>
      <Grid.Column size={{ desktop: 6, mobile: 12 }}>
        <DateInput label="Default" onChange={console.log} />
      </Grid.Column>
      <Grid.Column size={{ desktop: 6, mobile: 12 }}>
        <DateInput label="Error" onChange={console.log} error="Une erreur" />
        <DateInput label="Succès" onChange={console.log} success="Date enregistrée" />
      </Grid.Column>
      <Grid.Column size={{ desktop: 6, mobile: 12 }}>
        <DateInput label="Disabled" onChange={console.log} disabled />
      </Grid.Column>
    </Grid>
  </Box>
);

export const Types = () => {
  const [date, setDate] = React.useState<string>();
  const [datetime, setDatetime] = React.useState<string>();

  return (
    <Box width={'100%'}>
      <Grid gap={8}>
        <Grid.Column size={{ desktop: 6, mobile: 12 }}>
          <DateInput value={date} label="Date (default)" onChange={e => setDate(e.toString())} />
        </Grid.Column>
        <Grid.Column size={{ desktop: 6, mobile: 12 }}>
          <DateInput
            value={datetime}
            label="Datetime"
            type="datetime"
            is24Hour
            onChange={e => setDatetime(e.toString())}
          />
        </Grid.Column>
      </Grid>
    </Box>
  );
};

export * as Sources from './DateInput.stories.sources';
