import { Box, Typography } from '../../core';
import { Story } from '../../type';
import { Section } from './Section';
import { useStyles } from './Section.styles';

export default {
  title: 'Section',
  tags: ['Kit'],
  experimental: true,
  description:
    'Section de page. Permet de contenir une section dans un élément adapté aux différentes platformes. Composant de type Box.',
  component: Section,
  styleFn: useStyles,
} satisfies Story;

const paddingColor = '#b9c47f';
const innerBoxColor = '#88b2bd';

export const Default = () => (
  <Section backgroundColor={paddingColor}>
    <Box backgroundColor={innerBoxColor} p={'050'}>
      <Typography>Section avec background</Typography>
    </Box>
  </Section>
);

export const WithPaddingY = () => (
  <Section backgroundColor={paddingColor} withPaddingY>
    <Box backgroundColor={innerBoxColor} p={'050'}>
      <Typography>Section avec background et padding Y</Typography>
    </Box>
  </Section>
);
