import { Box, toSlug, Typography } from '@alveole/components';
import { useTheme } from '@alveole/theme';

export type StorySummaryProps = {
  /** Les noms des exemples de la fiche, dans l'ordre où elle les présente. */
  exemples: string[];
};

/** Le sommaire de la fiche : une entrée par exemple, vers l'ancre que pose son titre. */
export const StorySummary = ({ exemples }: StorySummaryProps) => {
  const { color, text } = useTheme();

  return (
    <Box display="flex" gap={8}>
      <Typography style={{ ...text['Corps de texte'].XS.CapsBold, color: color.light.text['mention-grey'] }}>
        Sur cette page
      </Typography>

      {exemples.map(exemple => (
        <a key={exemple} href={`#${toSlug(exemple)}`} style={{ textDecoration: 'none' }}>
          <Typography style={{ ...text['Corps de texte'].SM.Regular, color: color.light.text['default-grey'] }}>
            {exemple}
          </Typography>
        </a>
      ))}
    </Box>
  );
};
