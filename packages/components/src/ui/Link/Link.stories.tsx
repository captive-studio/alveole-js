import { Typography } from '../../core/Typography';
import type { Story } from '../../type/Story';
import { Link } from './Link';
import { useStyles } from './Link.styles';

export default {
  title: 'Link',
  tags: ['ui'],
  experimental: false,
  description: `Lien de texte stylé : souligné, dans la couleur d'action, le soulignement disparaît au survol.

À utiliser dans une phrase ou à côté d'un texte : il reste en ligne avec le texte qui l'entoure.

Pour rendre cliquable un bloc (carte, ligne de liste), utiliser \`A\`.`,
  shortDescription: "Lien de texte souligné, à utiliser dans ou à côté d'un texte.",
  component: Link,
  styleFn: useStyles,
} satisfies Story;

export const Default = () => <Link href={'/ui-kit/components/Link'}>Mon lien</Link>;

export const DansUnePhrase = () => (
  <Typography>
    Consultez <Link href={'/ui-kit/components/Link'}>la documentation</Link> avant de commencer.
  </Typography>
);

export * as Sources from './Link.stories.sources';
