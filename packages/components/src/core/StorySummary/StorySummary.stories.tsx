import { Story } from '../../type';
import { StorySummary } from './StorySummary';

export default {
  title: 'StorySummary',
  tags: ['core'],
  experimental: true,
  webOnly: true,
  description: 'Sommaire « Sur cette page » : un lien par section vers l’ancre posée par AnchorHeading.',
  component: StorySummary,
  styleFn: () => ({}),
} satisfies Story;

export const Default = () => <StorySummary entrees={['Variantes', 'Tailles disponibles', 'Accessibilité']} />;

export * as Sources from './StorySummary.stories.sources';
