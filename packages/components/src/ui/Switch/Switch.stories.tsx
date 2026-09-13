import { useState } from 'react';
import { Box } from '../../core/Box';
import { Story } from '../../type';
import { Switch } from './Switch';
import { useStyles } from './Switch.styles';

export default {
  title: 'Switch',
  tags: ['ui'],
  experimental: false,
  description: 'Interrupteur avec label, supportant les modes contrôlé et non-contrôlé.',
  component: Switch,
  styleFn: useStyles,
} satisfies Story;

export const Default = () => (
  <Box display="flex" flexDirection="column" gap={24}>
    <Switch label="Non activé" />
    <Switch label="Activé" checked />
    <Switch label="Désactivé" disabled />
    <Switch label="Activé désactivé" checked disabled />
  </Box>
);

export const Controlled = () => {
  const [value, setValue] = useState(false);
  return <Switch label={value ? 'Activé' : 'Désactivé'} checked={value} onCheckedChange={v => setValue(!!v)} />;
};

export * as Sources from './Switch.stories.sources';
