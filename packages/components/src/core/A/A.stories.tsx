import { Avatar, Card } from '@alveole/components';
import type { Story } from '../../type/Story';
import { Typography } from '../Typography';
import { A } from './A';
import { useStyles } from './A.styles';

export default {
  title: 'A',
  tags: ['core'],
  experimental: false,
  description: 'Equivalent d’une balise <a>. Envelopper le texte dans une balise <Typography>.',
  component: A,
  styleFn: useStyles,
} satisfies Story;

export const Default = () => (
  <A href={'/ui-kit/components/A'}>
    <Typography>Mon lien</Typography>
  </A>
);

export const LinkBlock = () => (
  <A href={'/ui-kit/components/A'}>
    <Card>
      <Card.Header
        titre="Titre de la carte"
        sousTitre="Sous-titre de la carte"
        image={<Avatar size="md" fallbackText="M" />}
      />
      <Card.Section titre="Titre de la carte" titreIcone="Calendar" description="Description de la carte" />
    </Card>
  </A>
);

export * as Sources from './A.stories.sources';
