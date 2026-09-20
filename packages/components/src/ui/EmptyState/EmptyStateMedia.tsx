import React from 'react';
import { Box } from '../../core/Box/Box';
import { isLucideIconName, LucideIcon, LucideIconProps } from '../LucideIcon';
import { useStyles } from './EmptyState.styles';

/**
 * Ce que la pastille montre : une illustration libre, une icone, ou rien. L'illustration prime,
 * et un nom d'icone inconnu ne donne rien. Ces trois issues tenaient dans un ternaire imbrique
 * au milieu du rendu, ou elles faisaient la moitie de la complexite du composant.
 */
export const mediaDEtatVide = (illustration: React.ReactNode, iconName: string | undefined) => {
  if (illustration != null) return 'illustration';
  if (iconName != null && isLucideIconName(iconName)) return 'icone';
  return 'aucun';
};

export type EmptyStateMediaProps = {
  illustration?: React.ReactNode;
  iconName?: LucideIconProps['name'];
};

export const EmptyStateMedia = ({ illustration, iconName }: EmptyStateMediaProps) => {
  const styles = useStyles();

  // La pastille se dessine des qu'un media est demande, meme si son nom d'icone ne mene nulle part.
  if (!illustration && !iconName) return null;

  const media = mediaDEtatVide(illustration, iconName);

  return (
    <Box style={styles.media}>
      {media === 'illustration' && illustration}
      {media === 'icone' && iconName && <LucideIcon name={iconName} size="lg" color={styles.media.color} />}
    </Box>
  );
};
