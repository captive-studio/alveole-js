import { Story } from '../../type';
import { Metabase } from './Metabase';
import { useStyles } from './Metabase.styles';

export default {
  title: 'Metabase',
  tags: ['core'],
  experimental: true,
  description: "Intègre une page Metabase en passant l'url",
  component: Metabase,
  styleFn: useStyles,
} satisfies Story;

export const Default = () => (
  <Metabase source="https://spined-burst.metabaseapp.com/public/dashboard/a5f977a6-b6f4-4609-8e16-e422826c40ab" />
);

export * as Sources from './Metabase.stories.sources';
