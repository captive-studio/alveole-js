import { useState } from 'react';
import { Box } from '../../core/Box';
import { Story } from '../../type';
import { FormControl } from '../FormControl';
import { PriceInput } from './PriceInput';
import { useStyles } from './PriceInput.styles';

export default {
  title: 'PriceInput',
  tags: ['ui'],
  experimental: false,
  webOnly: true,
  description:
    'Input montant avec symbole de devise (€). Masque les flèches du champ numérique. Se place dans un FormControl pour son libellé.',
  component: PriceInput,
  styleFn: useStyles,
} satisfies Story;

export const Default = () => {
  const [value, setValue] = useState<number | null>(null);
  return (
    <Box display="flex" flexDirection="column" gap={24}>
      <FormControl label="Montant">
        <PriceInput value={value} onChange={setValue} />
      </FormControl>
      <FormControl label="Montant saisi">
        <PriceInput value={1250} onChange={() => {}} />
      </FormControl>
    </Box>
  );
};

export * as Sources from './PriceInput.stories.sources';
