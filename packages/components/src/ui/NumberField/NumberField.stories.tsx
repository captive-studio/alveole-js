import { useState } from 'react';
import { Box } from '../../core/Box';
import { Story } from '../../type';
import { NumberField } from './NumberField';
import { useStyles } from './NumberField.styles';

export default {
  title: 'NumberField',
  tags: ['ui'],
  experimental: false,
  description: 'Champ numérique avec label et boutons +/- sur web.',
  component: NumberField,
  styleFn: useStyles,
} satisfies Story;

export const Default = () => {
  const [value, setValue] = useState<number | null>(null);
  return (
    <Box display="flex" flexDirection="column" gap={24}>
      <NumberField label="Quantité" value={value} onChange={setValue} placeholder="0" />
      <NumberField label="Avec erreur" value={0} onChange={() => {}} error="Valeur invalide" />
      <NumberField label="Désactivé" value={42} onChange={() => {}} disabled />
    </Box>
  );
};

export * as Sources from './NumberField.stories.sources';
