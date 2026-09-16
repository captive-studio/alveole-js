import { Box } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import React from 'react';
import { ScreenZone } from './ScreenZone';

export type StoryLayoutProps = {
  /** Le corps de la fiche : sa largeur est ce que la zone laisse, jamais un nombre choisi. */
  children: React.ReactNode;
  /** La table des matières de la page, servie avant le corps. */
  sommaire?: React.ReactNode;
};

/**
 * La mise en page d'une fiche : neuf colonnes de zone, dont deux pour le sommaire et une
 * gouttière, le reste revenant à la lecture. Le sommaire est déclaré avant le corps et rendu
 * à droite, comme le fait le thème de documentation de Primer.
 */
export const StoryLayout = ({ children, sommaire }: StoryLayoutProps) => {
  const { grilles, spacingValue } = useTheme();

  return (
    <ScreenZone largeur={grilles['9 colonnes']}>
      <Box style={{ flexDirection: 'row-reverse', gap: spacingValue('3W') }}>
        {sommaire ? <Box style={{ flexShrink: 0, width: grilles['2 colonnes'] }}>{sommaire}</Box> : null}
        <Box style={{ flexGrow: 1, flexShrink: 1, minWidth: 0 }}>{children}</Box>
      </Box>
    </ScreenZone>
  );
};
