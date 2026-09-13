import { Typography } from '../../core/Typography';
import { Story } from '../../type';
import { useStyles } from './Accordion.styles';
import { Accordion } from './index';

export default {
  title: 'Accordion',
  tags: ['ui'],
  experimental: false,
  figmaURL: 'https://www.figma.com/design/xJz8Z6vfrnZPKTtRbuT2W8/Alveole---Composants?node-id=0-1',
  description: 'Accordion de type Tamagui.',
  component: Accordion,
  styleFn: useStyles,
} satisfies Story;

export const Default = () => (
  <Accordion type="multiple">
    <Accordion.Item label="Exemple" value="accordion-content">
      <Typography>Contenu</Typography>
    </Accordion.Item>

    <Accordion.Item label="Exemple 2" value="accordion-content-2">
      <Typography>Contenu 2</Typography>
    </Accordion.Item>
  </Accordion>
);

export * as Sources from './Accordion.stories.sources';
