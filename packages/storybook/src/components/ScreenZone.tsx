import { Box } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import React from 'react';

export type ScreenZoneProps = {
  children: React.ReactNode;
  /**
   * La largeur de la zone, prise dans la grille. Elle dépend de ce que la page contient :
   * une largeur de lecture pour du texte, la grille entière pour une liste de cartes.
   */
  largeur: number;
};

/**
 * Le repère principal d'un écran du catalogue : l'enveloppe porte les marges de la page,
 * la zone porte sa largeur et se centre dans ce qui reste. C'est la construction du `main`
 * de Primer, padding puis maxWidth puis marges automatiques.
 *
 * `tag` n'a pas d'effet sur natif. Sans ce repère, un lecteur d'écran ne peut pas sauter
 * directement au contenu ; une <section> sans nom accessible n'en est pas un, d'où <main>.
 */
export const ScreenZone = ({ children, largeur }: ScreenZoneProps) => {
  const { spacingValue } = useTheme();

  return (
    <Box
      tag="main"
      style={{
        display: 'flex',
        paddingBottom: spacingValue('3W'),
        paddingLeft: spacingValue('6W'),
        paddingRight: spacingValue('6W'),
        paddingTop: spacingValue('12W'),
      }}
    >
      <Box
        style={{
          display: 'flex',
          gap: spacingValue('3W'),
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: largeur,
          width: '100%',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
