import { Box } from '../../core/Box';
import type { Story } from '../../type/Story';
import { Skeleton } from './Skeleton';
import { useStyles } from './Skeleton.styles';

export default {
  title: 'Skeleton',
  tags: ['ui'],
  experimental: true,
  description: `Espace réservé animé affiché pendant le chargement d'un contenu. Composant de type Box.

La forme se règle avec \`width\` (\`100%\` par défaut), \`height\` (16 px par défaut) et \`borderRadius\` (4 px par défaut) :
- ligne de texte : largeur en pourcentage, faible hauteur
- carré : \`width\` égale à \`height\`
- rond : \`borderRadius\` égal à la moitié de la taille`,
  shortDescription: 'Espace réservé animé qui préfigure un contenu en cours de chargement.',
  component: Skeleton,
  styleFn: useStyles,
} satisfies Story;

export const Ligne = () => <Skeleton width="60%" />;

export const Carre = () => <Skeleton width={64} height={64} />;

export const Rond = () => <Skeleton width={48} height={48} borderRadius={24} />;

export const Rectangle = () => <Skeleton height={160} borderRadius={8} />;

/**
 * Des lignes de largeurs décroissantes imitent un paragraphe de texte.
 */
export const Paragraphe = () => (
  <Box display="flex" flexDirection="column" gap="1V" width="100%">
    <Skeleton width="40%" height={20} />
    <Skeleton />
    <Skeleton width="90%" />
    <Skeleton width="65%" />
  </Box>
);

/**
 * Les formes se composent pour préfigurer un élément de liste : un avatar rond, un titre et un sous-titre.
 */
export const ElementDeListe = () => (
  <Box display="flex" flexDirection="column" gap="2W" width="100%">
    {[0, 1, 2].map(i => (
      <Box key={i} display="flex" flexDirection="row" gap="1W" style={{ alignItems: 'center' }}>
        <Skeleton width={40} height={40} borderRadius={20} />
        <Box display="flex" flexDirection="column" gap="1V" flex={1}>
          <Skeleton width="40%" height={18} />
          <Skeleton width="65%" height={14} />
        </Box>
      </Box>
    ))}
  </Box>
);

export * as Sources from './Skeleton.stories.sources';
