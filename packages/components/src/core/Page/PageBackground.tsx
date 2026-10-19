import { useTheme } from '@alveole/theme';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Box } from '../Box';
import { useStyles } from './Page.styles';

export type PageBackgroundProps = {
  children: React.ReactNode;
  gradient?: boolean;
};

/**
 * Le fond d'une page est par défaut une surface de la palette, unie. Un dégradé fait varier la
 * couleur selon la hauteur : aucun contenu posé dessus ne peut alors s'accorder à une valeur du
 * thème. Il reste disponible en opt-in via `gradient`.
 */
export const PageBackground = ({ children, gradient = false }: PageBackgroundProps) => {
  const styles = useStyles();
  const { color } = useTheme();

  if (gradient) {
    return (
      <LinearGradient
        colors={[color.light.background['default-grey'], color.light.background['alt-grey']]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.pageBackground}
      >
        {children}
      </LinearGradient>
    );
  }

  return (
    <Box style={{ ...styles.pageBackground, backgroundColor: color.light.background['default-grey'] }}>{children}</Box>
  );
};
