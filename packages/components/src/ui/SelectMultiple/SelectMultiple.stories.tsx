import { useState } from 'react';
import { Box } from '../../core/Box';
import { Story } from '../../type';
import { SelectMultiple } from './SelectMultiple';
import { useStyles } from './SelectMultiple.styles';

export default {
  title: 'SelectMultiple',
  tags: ['ui'],
  experimental: false,
  description: 'Sélection multiple via une liste déroulante (web) ou un stub natif.',
  component: SelectMultiple,
  styleFn: useStyles,
} satisfies Story;

const OPTIONS = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c' },
  { label: 'Option D', value: 'd' },
];

export const Default = () => {
  const [value, setValue] = useState<string[]>([]);
  return (
    <Box display="flex" flexDirection="column" gap={24}>
      <SelectMultiple label="Sélection" options={OPTIONS} value={value} onChange={setValue} />
    </Box>
  );
};

export const States = () => (
  <Box display="flex" flexDirection="column" gap={24}>
    <SelectMultiple label="Avec valeurs" options={OPTIONS} value={['a', 'c']} />
    <SelectMultiple label="Erreur" options={OPTIONS} value={[]} error="Ce champ est requis" />
    <SelectMultiple label="Succès" options={OPTIONS} value={['a']} success="Sélection enregistrée" />
    <SelectMultiple label="Désactivé" options={OPTIONS} value={['b']} disabled />
  </Box>
);

export * as Sources from './SelectMultiple.stories.sources';
