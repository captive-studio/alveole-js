import { Story } from '../../type';
import { Version } from './Version';
import { useStyles } from './Version.styles';

export default {
  title: 'Version',
  tags: ['Kit'],
  experimental: false,
  description: "Affiche la version de l'app",
  component: Version,
  styleFn: useStyles,
} satisfies Story;

export const Default = () => <Version />;
