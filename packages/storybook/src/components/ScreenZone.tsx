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
  const { isVariant, spacingValue } = useTheme();

  // Les marges d'une page de documentation valent le double du padding qu'`externalPadding`
  // pose dans une application cliente : la page n'a que du texte à porter. Sur un téléphone
  // il n'y a plus de vide à répartir, et la même bascule que le thème rend la largeur à la
  // lecture plutôt qu'aux côtés.
  const marge = isVariant('mobile')
    ? { cote: spacingValue('3W'), haut: spacingValue('6W') }
    : { cote: spacingValue('6W'), haut: spacingValue('12W') };

  return (
    <Box
      tag="main"
      style={{
        display: 'flex',
        paddingBottom: spacingValue('3W'),
        paddingLeft: marge.cote,
        paddingRight: marge.cote,
        paddingTop: marge.haut,
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
