import { Box, Link, Typography } from '@alveole/components';
import { contrastRatio, Spacings, useTheme } from '@alveole/theme';
import React from 'react';
import { EcranDeCatalogue, filDuTheme } from '../components/EcranDeCatalogue';
import type { CatalogueDesCouleurs, Nuance } from '../couleurs/catalogueDesCouleurs';
import { catalogueDuTheme } from '../couleurs/catalogueDesCouleurs.generated';
import { echellesDuCatalogue } from './echellesDuCatalogue';

export type ThemeNuancesScreenProps = {
  /** Le catalogue extrait du source du theme (ADR 0035). Par defaut, celui d'Alveole. */
  catalogue?: CatalogueDesCouleurs;
  title?: string;
  description?: string;
  footerContent?: React.ReactNode;
};

/** Le contraste sur blanc, a une decimale et a la francaise : `1,4:1`. */
const contrasteSurBlanc = (hex: string) => `${contrastRatio(hex, '#FFFFFF').toFixed(1).replace('.', ',')}:1 sur blanc`;

/** Chaque chemin mene a la ligne du token sur la page des tokens, ancree sur ce chemin. */
const LiensDesTokens = ({ chemins }: { chemins: string[] }) =>
  chemins.map(chemin => (
    <Link key={chemin} href={`/theme/tokens-semantiques#${chemin}`}>
      {chemin}
    </Link>
  ));

const LigneDeNuance = ({ nuance }: { nuance: Nuance }) => {
  const { color } = useTheme();
  const discret = { color: color.light.text['mention-grey'] };

  return (
    <Box style={{ flexDirection: 'row', alignItems: 'flex-start', gap: Spacings['2W'], padding: Spacings['1W'] }}>
      <Box
        style={{
          width: 32,
          height: 32,
          backgroundColor: nuance.hex,
          borderWidth: 1,
          borderColor: color.light.border['default-grey'],
        }}
      />
      <Box style={{ width: 160 }}>
        <Typography>{`${nuance.echelle} ${nuance.numero}`}</Typography>
        <Typography style={{ fontFamily: 'monospace' }}>{nuance.hex}</Typography>
        <Typography style={discret}>{contrasteSurBlanc(nuance.hex)}</Typography>
      </Box>
      <Box style={{ flex: 1, gap: Spacings['1V'] }}>
        {nuance.tokens.length === 0 && <Typography style={discret}>{'sans usage'}</Typography>}
        <LiensDesTokens chemins={nuance.tokens} />
        {nuance.tokensDeprecies.length > 0 && (
          <>
            <Typography style={{ color: color.light.text['default-warning'] }}>{'Déprécié'}</Typography>
            <LiensDesTokens chemins={nuance.tokensDeprecies} />
          </>
        )}
      </Box>
    </Box>
  );
};

export const ThemeNuancesScreen = ({
  catalogue = catalogueDuTheme,
  title = 'Nuances',
  description = 'Les échelles de couleurs du thème et les tokens qui citent chaque nuance',
  footerContent,
}: ThemeNuancesScreenProps) => {
  const { text } = useTheme();
  const echelles = React.useMemo(() => echellesDuCatalogue(catalogue), [catalogue]);

  return (
    <EcranDeCatalogue
      title={title}
      description={description}
      footerContent={footerContent}
      breadcrumbsProps={filDuTheme}
    >
      {echelles.map(echelle => (
        <Box key={echelle.titre} style={{ marginBottom: Spacings['3W'] }}>
          <Typography style={text.Titres['H5 - XS']}>{echelle.titre}</Typography>
          {echelle.nuances.map(nuance => (
            <LigneDeNuance key={nuance.numero} nuance={nuance} />
          ))}
        </Box>
      ))}
    </EcranDeCatalogue>
  );
};
