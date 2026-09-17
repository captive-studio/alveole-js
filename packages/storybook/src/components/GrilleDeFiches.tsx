import { Box, Typography } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import { StorybookModule } from '../types';
import { StoryCard } from './StoryCard';

export type GroupeDeFiches = readonly [tag: string, fiches: StorybookModule[]];

export type GrilleDeFichesProps = {
  groupes: readonly GroupeDeFiches[];
  /** La largeur d'une carte, calculee une fois pour toute la grille. */
  largeurDeFiche: string;
  getStoryHref: (story: StorybookModule) => string;
  messageVide: string;
};

/**
 * Les fiches, rangees sous le tag qui les groupe. Une carte s'etire sur la hauteur de sa
 * rangee pour que les bas de cartes s'alignent malgre des descriptions inegales.
 */
export const GrilleDeFiches = ({ groupes, largeurDeFiche, getStoryHref, messageVide }: GrilleDeFichesProps) => {
  const { text } = useTheme();

  if (groupes.length === 0) return <Typography style={text['Corps de texte'].MD.Regular}>{messageVide}</Typography>;

  return groupes.map(([tag, fiches]) => (
    <Box key={tag} display="flex" gap={16}>
      <Typography style={text.Titres['H4 - SM']}>{tag}</Typography>
      <Box display="flex" flexDirection="row" flexWrap="wrap" gap={16}>
        {fiches.map(fiche => (
          <Box key={fiche.default.title} style={{ alignSelf: 'stretch', width: largeurDeFiche }}>
            <StoryCard story={fiche} href={getStoryHref(fiche)} />
          </Box>
        ))}
      </Box>
    </Box>
  ));
};
