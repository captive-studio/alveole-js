import { useState } from 'react';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { Story } from '../../type';
import { FormControl } from './FormControl';
import { useStyles } from './FormControl.styles';
import { NumberInput } from './NumberInput';

export default {
  title: 'NumberInput',
  tags: ['ui'],
  experimental: false,
  description:
    'Champ de saisie numérique, nu : il rend un nombre, et on le place dans un FormControl pour son libellé, son aide et sa validation.',
  component: NumberInput,
  styleFn: useStyles,
} satisfies Story;

export const Default = () => {
  const [value, setValue] = useState<number | null>(null);
  return (
    <FormControl label="Montant">
      <NumberInput value={value} onChange={setValue} placeholder="0" />
    </FormControl>
  );
};

export const AvecUnites = () => {
  const [value, setValue] = useState<number | null>(null);
  return (
    <FormControl label="Avec unités">
      <NumberInput
        value={value}
        onChange={setValue}
        startAdornment={
          <Box style={{ paddingLeft: 8, paddingRight: 4 }}>
            <Typography>€</Typography>
          </Box>
        }
        endAdornment={
          <Box style={{ paddingLeft: 4, paddingRight: 8 }}>
            <Typography>TTC</Typography>
          </Box>
        }
      />
    </FormControl>
  );
};

export const Desactive = () => (
  <FormControl label="Désactivé">
    <NumberInput value={42} onChange={() => {}} disabled />
  </FormControl>
);

export * as Sources from './NumberInput.stories.sources';
