import { Box, Typography } from '@alveole/components';
import React from 'react';
import { Story } from '../../type/Story';
import { Tabs } from './Tabs';
import { useStyles } from './Tabs.styles';

export default {
  title: 'Tabs',
  tags: ['Composant'],
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
        tabs={[
          { label: 'Onglet 1', value: 'onglet-1', content: <Typography>Contenu de onglet 1</Typography> },
          { label: 'Onglet 2', counter: 12, value: 'onglet-2', content: <Typography>Contenu de onglet 2</Typography> },
          { label: 'Onglet 3', value: 'onglet-3', content: <Typography>Contenu de onglet 3</Typography> },
          {
            label: 'Onglet 4',
            icon: 'Settings',
            value: 'onglet-4',
            content: <Typography>Contenu de onglet 4</Typography>,
          },
        ]}
      />
    </Box>
  );
};

export * as Sources from './Tabs.stories.sources';
