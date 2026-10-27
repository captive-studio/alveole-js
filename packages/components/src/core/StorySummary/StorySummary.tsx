import { useTheme } from '@alveole/theme';
import { Box } from '../Box';
import { Typography } from '../Typography';

export type StorySummaryProps = {
  /** Les titres des sections de la page, dans l'ordre où elle les présente. */
  entrees: string[];
};

/** Sur natif, pas d'ancre à viser : le sommaire liste les sections sans lien. */
export const StorySummary = ({ entrees }: StorySummaryProps) => {
  const { color, text } = useTheme();

  return (
    <Box display="flex" gap="1W">
      <Typography style={{ ...text['Corps de texte'].XS.CapsBold, color: color.light.text['mention-grey'] }}>
        Sur cette page
      </Typography>

      {entrees.map(entree => (
        <Typography
          key={entree}
          style={{ ...text['Corps de texte'].SM.Regular, color: color.light.text['default-grey'] }}
        >
          {entree}
        </Typography>
      ))}
    </Box>
  );
};
