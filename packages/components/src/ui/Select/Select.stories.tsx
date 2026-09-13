import { useState } from 'react';
import { Box } from '../../core/Box';
import { Story } from '../../type';
import { Select } from './Select';
import { useStyles } from './Select.styles';

export default {
  title: 'Select',
  tags: ['ui'],
  experimental: false,
  description: "Sélecteur mono-valeur natif avec label, hint et états d'erreur/succès.",
  component: Select,
  styleFn: useStyles,
} satisfies Story;

const OPTIONS = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c' },
];

export const Default = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <Box display="flex" flexDirection="column" gap={24}>
      <Select label="Sélection" placeholder="Choisir..." options={OPTIONS} value={value} onChange={setValue} />
    </Box>
  );
};

export const States = () => (
  <Box display="flex" flexDirection="column" gap={24}>
    <Select label="Avec valeur" options={OPTIONS} value="b" />
    <Select label="Erreur" options={OPTIONS} value={null} error="Ce champ est requis" />
    <Select label="Succès" options={OPTIONS} value="a" success="Valide" />
    <Select label="Désactivé" options={OPTIONS} value="a" disabled />
  </Box>
);

export * as Sources from './Select.stories.sources';
