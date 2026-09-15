import { useState } from 'react';
import { Box } from '../../core/Box';
import { Story } from '../../type';
import { RadioGroup } from './index';
import { useStyles } from './RadioGroup.styles';

export default {
  title: 'RadioGroup',
  tags: ['ui'],
  experimental: false,
  description: 'Groupe de boutons radio avec variantes liste et card.',
  component: RadioGroup,
  styleFn: useStyles,
} satisfies Story;

export const Default = () => {
  const [value, setValue] = useState('a');
  return (
    <RadioGroup value={value} onChange={setValue} label="Choix">
      <RadioGroup.Item value="a">Option A</RadioGroup.Item>
      <RadioGroup.Item value="b">Option B</RadioGroup.Item>
      <RadioGroup.Item value="c">Option C</RadioGroup.Item>
    </RadioGroup>
  );
};

export const Cards = () => {
  const [value, setValue] = useState('oui');
  return (
    <RadioGroup value={value} onChange={setValue} label="Confirmez-vous ?">
      <RadioGroup.Card value="oui" label="Oui" icon="Check" />
      <RadioGroup.Card value="non" label="Non" icon="X" />
    </RadioGroup>
  );
};

export const WithError = () => (
  <Box display="flex" flexDirection="column" gap={24}>
    <RadioGroup value="a" label="Avec erreur" error="Veuillez faire un choix">
      <RadioGroup.Item value="a">Option A</RadioGroup.Item>
      <RadioGroup.Item value="b">Option B</RadioGroup.Item>
    </RadioGroup>
  </Box>
);

export const RadioInput = () => {
  const [value, setValue] = useState('tutu');

  return (
    <Box display="flex" flexDirection="column" gap={24}>
      <RadioGroup.Input
        id="exemple-input"
        label="Petit"
        size="sm"
        value="tutu"
        checked={value === 'tutu'}
        onChange={setValue}
      />
      <RadioGroup.Input
        id="exemple-input-md"
        label="Moyen"
        size="md"
        value="toto"
        checked={value === 'toto'}
        onChange={setValue}
      />
    </Box>
  );
};

export * as Sources from './RadioGroup.stories.sources';
