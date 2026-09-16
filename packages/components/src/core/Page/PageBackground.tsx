import { useTheme } from '@alveole/theme';
import React from 'react';
import { Box } from '../Box';
import { useStyles } from './Page.styles';

export type PageBackgroundProps = {
  children: React.ReactNode;
};

/**
 * Le fond d'une page est une surface de la palette, unie. Un dégradé ferait varier la
 * couleur selon la hauteur : aucun contenu posé dessus ne pourrait alors s'accorder à une
 * valeur du thème, et deux éléments identiques n'auraient pas le même fond selon l'endroit
 * où ils tombent dans la page.
 */
export const PageBackground = ({ children }: PageBackgroundProps) => {
  const styles = useStyles();
  const { color } = useTheme();

  return (
    <Box style={{ ...styles.pageBackground, backgroundColor: color.light.background['default-grey'] }}>{children}</Box>
  );
};
