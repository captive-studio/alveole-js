import { useTheme } from '@alveole/theme';
import { Story } from '../../type';
import { AnchorHeading } from './AnchorHeading';

export default {
  title: 'AnchorHeading',
  tags: ['core'],
  experimental: true,
  webOnly: true,
  description: 'Titre avec ancre navigable au survol — id slug généré automatiquement.',
  component: AnchorHeading,
  styleFn: () => ({}),
} satisfies Story;

export const Default = () => {
  const { text } = useTheme();
  return <AnchorHeading style={text.Titres['H5 - XS']}>Mon exemple de titre</AnchorHeading>;
};

export const AvecNiveau = () => <AnchorHeading as="h2">Titre h2 avec ancre</AnchorHeading>;

export * as Sources from './AnchorHeading.stories.sources';
