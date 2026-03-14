import type { Story } from '../../type/Story';
import { Typography } from '../Typography';
import { A } from './A';
import { useStyles } from './A.styles';

export default {
  title: 'A',
  tags: ['Kit'],
  experimental: true,
  description: 'Equivalent d’une balise <a>',
  component: A,
  styleFn: useStyles,
} satisfies Story;

export const Default = () => (
  <A href={'/ui-kit/components/A'}>
    <Typography>Children</Typography>
  </A>
);
