import React from 'react';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { Story } from '../../type/Story';
import { Button } from '../Button';
import { Tabs } from './Tabs';
import { useStyles } from './Tabs.styles';

export default {
  title: 'Tabs',
  tags: ['ui'],
  experimental: false,
  figmaURL: 'https://www.figma.com/design/xJz8Z6vfrnZPKTtRbuT2W8/Alveole---Composants?node-id=1863-621',
  description: 'Composant d’onglets (tabs) basé sur tamagui.',
  component: Tabs,
  styleFn: useStyles,
} satisfies Story;

export const Example = () => {
  const [_activeTab, setActiveTab] = React.useState(0);

  return (
    <Box width={'100%'}>
      <Tabs
        defaultValue={'onglet-1'}
        onChange={setActiveTab}
        urlAnchorPrefix="tabs-story"
        tabs={[
          { label: 'Onglet 1', value: 'onglet-1', content: <Typography>Contenu de onglet 1</Typography> },
          { label: 'Onglet 2', counter: 12, value: 'onglet-2', content: <Typography>Contenu de onglet 2</Typography> },
          { label: 'Onglet 3', value: 'onglet-3', content: <Typography>Contenu de onglet 3</Typography> },
          {
            label: 'Onglet 4',
            leading: 'Settings',
            value: 'onglet-4',
            content: <Typography>Contenu de onglet 4</Typography>,
          },
        ]}
      />
    </Box>
  );
};

// `value` rend les Tabs controles : le parent choisit l'onglet actif, par exemple depuis un
// bouton ou une carte cliquee, et le suit depuis `onChange` quand l'utilisateur clique un onglet.
export const Controle = () => {
  const onglets = [
    { label: 'Onglet 1', value: 'onglet-1', content: <Typography>Contenu de onglet 1</Typography> },
    { label: 'Onglet 2', value: 'onglet-2', content: <Typography>Contenu de onglet 2</Typography> },
    { label: 'Onglet 3', value: 'onglet-3', content: <Typography>Contenu de onglet 3</Typography> },
  ];
  const [ongletActif, setOngletActif] = React.useState('onglet-1');

  return (
    <Box width={'100%'} gap={16}>
      <Box flexDirection="row" gap={8}>
        <Button title="Aller à l’onglet 1" variant="secondary" onPress={() => setOngletActif('onglet-1')} />
        <Button title="Aller à l’onglet 3" variant="secondary" onPress={() => setOngletActif('onglet-3')} />
      </Box>
      <Tabs value={ongletActif} onChange={index => setOngletActif(onglets[index].value)} tabs={onglets} />
    </Box>
  );
};

export * as Sources from './Tabs.stories.sources';
