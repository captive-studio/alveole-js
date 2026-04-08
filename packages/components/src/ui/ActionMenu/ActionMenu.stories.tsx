import { Box } from '../../core';
import type { Story } from '../../type/Story';
import { Button } from '../Button';
import { ActionMenu } from './ActionMenu';

export default {
  title: 'ActionMenu',
  tags: ['Composant'],
  experimental: false,
  figmaURL: 'https://www.figma.com/design/xJz8Z6vfrnZPKTtRbuT2W8/Composants?node-id=1002-547',
  description: 'Composant de type Box.',
  component: ActionMenu,
  styleFn: () => '',
} satisfies Story;

export const Default = () => {
  const alignments = [
    'top',
    'right',
    'bottom',
    'left',
    'top-start',
    'top-end',
    'right-start',
    'right-end',
    'bottom-start',
    'bottom-end',
    'left-start',
    'left-end',
  ] as const;

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      gap="1W"
      flexDirection="row"
      justify-content="center"
      align-items="center"
      width="100%"
    >
      {alignments.map(alignment => (
        <ActionMenu
          key={alignment}
          placement={alignment}
          renderTrigger={() => <Button variant="secondary" title={alignment} />}
        >
          <ActionMenu.Item title="Contenu de l'action menu" icon="Settings" selected />
          <ActionMenu.Item title="Contenu de l'action menu" icon="Copy" />
          <ActionMenu.Item title="Contenu de l'action menu" icon="Trash" />
        </ActionMenu>
      ))}
    </Box>
  );
};
