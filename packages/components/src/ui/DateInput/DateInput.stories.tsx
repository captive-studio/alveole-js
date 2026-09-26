import React from 'react';
import { Box } from '../../core/Box';
import { Grid } from '../../core/Grid';
import { Story } from '../../type';
import { FormControl } from '../FormControl';
import { DateInput } from './DateInput';

export default {
  title: 'DateInput',
  tags: ['ui'],
  experimental: true,
  description:
    'Champ de saisie de date, nu : on le place dans un FormControl pour son libellé, son aide et sa validation.',
  component: DateInput,
  styleFn: () => 'Aucun style appliqué',
} satisfies Story;

export const Default = () => (
  <Box width={'100%'}>
    <Grid gap={8}>
      <Grid.Column size={{ desktop: 6, mobile: 12 }}>
        <FormControl label="Default">
          <DateInput onChange={console.log} />
        </FormControl>
      </Grid.Column>
      <Grid.Column size={{ desktop: 6, mobile: 12 }}>
        <FormControl label="Error" error="Une erreur">
          <DateInput onChange={console.log} error="Une erreur" />
        </FormControl>
        <FormControl label="Succès" success="Date enregistrée">
          <DateInput onChange={console.log} success="Date enregistrée" />
        </FormControl>
      </Grid.Column>
      <Grid.Column size={{ desktop: 6, mobile: 12 }}>
        <FormControl label="Disabled" disabled>
          <DateInput onChange={console.log} disabled />
        </FormControl>
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
          <FormControl label="Date (default)">
            <DateInput value={date} onChange={e => setDate(e.toString())} />
          </FormControl>
        </Grid.Column>
        <Grid.Column size={{ desktop: 6, mobile: 12 }}>
          <FormControl label="Datetime">
            <DateInput value={datetime} type="datetime" is24Hour onChange={e => setDatetime(e.toString())} />
          </FormControl>
        </Grid.Column>
      </Grid>
    </Box>
  );
};

export * as Sources from './DateInput.stories.sources';
