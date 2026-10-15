import { Story } from '../../type';
import { Box } from '../Box';
import { Typography } from '../Typography';
import { useStyles } from './Page.styles';
import { PageBackground } from './PageBackground';

export default {
  title: 'PageBackground',
  tags: ['core'],
  experimental: false,
  description: `Fond de page uni, appliqué automatiquement par \`Page\` lorsqu'aucune sidebar ni scroll n'est utilisé.

## Fonctionnement

- Occupe tout l'espace disponible (\`flex: 1\`, \`width: 100%\`).
- Applique la couleur de palette \`background.default-grey\` du thème.

## Pourquoi un fond uni ?

Un dégradé ferait varier la couleur selon la hauteur : aucun contenu posé dessus ne pourrait s'accorder à une valeur du thème, et deux éléments identiques n'auraient pas le même fond selon leur position dans la page.`,
  shortDescription: 'Fond de page uni utilisant la couleur de palette default-grey du thème.',
  component: PageBackground,
  styleFn: useStyles,
} satisfies Story;

export const Default = () => (
  <Box style={{ height: 300, width: '100%' }}>
    <PageBackground>
      <Typography>Contenu posé sur le fond de page</Typography>
    </PageBackground>
  </Box>
);

export * as Sources from './PageBackground.stories.sources';
