import { Box, toSlug, Typography } from '@alveole/components';
import { FOCUS_ATTRIBUTE, useTheme } from '@alveole/theme';

export type StorySummaryProps = {
  /** Les titres des sections de la page, dans l'ordre où elle les présente. */
  entrees: string[];
};

/** Le sommaire d'une page : une entrée par section, vers l'ancre que pose son titre. */
export const StorySummary = ({ entrees }: StorySummaryProps) => {
  const { color, text } = useTheme();

  return (
    <Box display="flex" gap={8}>
      <Typography style={{ ...text['Corps de texte'].XS.CapsBold, color: color.light.text['mention-grey'] }}>
        Sur cette page
      </Typography>

      {entrees.map(entree => (
        // Les ancres du catalogue sont des `<a>` bruts : sans la marque, elles gardent le
        // contour `1px auto` du navigateur au milieu de composants qui montrent tous la bague
        // du kit. C'est la vitrine du design system, l'ecart s'y voit plus qu'ailleurs.
        <a
          key={entree}
          href={`#${toSlug(entree)}`}
          style={{ textDecoration: 'none' }}
          {...{ [FOCUS_ATTRIBUTE]: 'ring' }}
        >
          <Typography style={{ ...text['Corps de texte'].SM.Regular, color: color.light.text['default-grey'] }}>
            {entree}
          </Typography>
        </a>
      ))}
    </Box>
  );
};
