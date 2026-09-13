import { useState } from 'react';
import { Box } from '../../core/Box';
import { Story } from '../../type';
import { TextInputArray, TextInputArrayValue } from './TextInputArray';

export default {
  title: 'TextInputArray',
  tags: ['ui'],
  experimental: false,
  description: 'Liste dynamique de champs texte avec ajout et suppression.',
  component: TextInputArray,
  styleFn: () => ({}),
} satisfies Story;

export const Default = () => {
  const [values, setValues] = useState<TextInputArrayValue[]>([]);
  return (
    <Box>
      <TextInputArray
        placeholder="Saisir une valeur..."
        addTitle="Ajouter un élément"
        value={values}
        onChange={setValues}
      />
    </Box>
  );
};

export const WithInitialValues = () => {
  const [values, setValues] = useState<TextInputArrayValue[]>([
    { value: 'Élément 1', _original: 'Élément 1' },
    { value: 'Élément 2', _original: 'Élément 2' },
  ]);
  return (
    <Box>
      <TextInputArray placeholder="Saisir une valeur..." value={values} onChange={setValues} />
    </Box>
  );
};

export * as Sources from './TextInputArray.stories.sources';
