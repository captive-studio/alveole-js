import { Box, toSlug, Typography } from '@alveole/components';
import { FOCUS_ATTRIBUTE, useTheme } from '@alveole/theme';

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
        // Les ancres du catalogue sont des `<a>` bruts : sans la marque, elles gardent le
        // contour `1px auto` du navigateur au milieu de composants qui montrent tous la bague
        // du kit. C'est la vitrine du design system, l'ecart s'y voit plus qu'ailleurs.
        <a
          key={exemple}
          href={`#${toSlug(exemple)}`}
          style={{ textDecoration: 'none' }}
          {...{ [FOCUS_ATTRIBUTE]: 'ring' }}
        >
          <Typography style={{ ...text['Corps de texte'].SM.Regular, color: color.light.text['default-grey'] }}>
            {exemple}
          </Typography>
        </a>
      ))}
    </Box>
  );
};
