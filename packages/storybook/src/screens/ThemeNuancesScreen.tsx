import { Box, Link, Typography } from '@alveole/components';
import { contrastRatio, Spacings, useTheme } from '@alveole/theme';
import React from 'react';
import { Pressable } from 'react-native';
import { EcranDeCatalogue, filDuTheme } from '../components/EcranDeCatalogue';
import type { CatalogueDesCouleurs, Nuance } from '../couleurs/catalogueDesCouleurs';
import { catalogueDuTheme } from '../couleurs/catalogueDesCouleurs.generated';
import {
  blanc,
  contrasteAvecLeBlanc,
  type EchelleDeNuances,
  famillesDEchellesDuCatalogue,
  type RaisonHorsBande,
} from './echellesDuCatalogue';

export type ThemeNuancesScreenProps = {
  /** Le catalogue extrait du source du theme (ADR 0035). Par defaut, celui d'Alveole. */
  catalogue?: CatalogueDesCouleurs;
  title?: string;
  description?: string;
  footerContent?: React.ReactNode;
};

/** Un rapport de contraste a une decimale et a la francaise : `1,4:1`. */
const rapport = (contraste: number) => `${contraste.toFixed(1).replace('.', ',')}:1`;

const contrasteSurBlanc = (hex: string) => `${rapport(contrasteAvecLeBlanc(hex))} sur blanc`;

const pageDesTokens = '/theme/tokens-semantiques';

/** Chaque chemin mene a la ligne du token sur la page des tokens, ancree sur ce chemin. */
const LiensDesTokens = ({ chemins }: { chemins: string[] }) =>
  chemins.map(chemin => (
    <Link key={chemin} href={`${pageDesTokens}#${chemin}`}>
      {chemin}
    </Link>
  ));

/** Une nuance se designe par son echelle et son numero : `Neutre 900`. */
const nomDe = (nuance: Nuance) => `${nuance.echelle} ${nuance.numero}`;

/** Le contraste de la nuance sur un fond, nomme : `15,5:1 sur Neutre 900`. */
const contrasteSur = (nuance: Nuance, fond: Nuance) =>
  `${rapport(contrastRatio(nuance.hex, fond.hex))} sur ${nomDe(fond)}`;

const DetailDeNuance = ({ nuance, plusFoncee }: { nuance: Nuance; plusFoncee?: Nuance }) => {
  const { color } = useTheme();
  const discret = { color: color.light.text['mention-grey'] };

  return (
    <Box style={{ flexDirection: 'row', alignItems: 'flex-start', gap: Spacings['2W'], padding: Spacings['1W'] }}>
      <Box style={{ width: 160 }}>
        <Typography>{nomDe(nuance)}</Typography>
        <Typography style={{ fontFamily: 'monospace' }}>{nuance.hex}</Typography>
        <Typography style={discret}>{contrasteSurBlanc(nuance.hex)}</Typography>
        {plusFoncee && plusFoncee !== nuance && (
          <Typography style={discret}>{contrasteSur(nuance, plusFoncee)}</Typography>
        )}
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

/**
 * Le noir et le blanc purs : l'un des deux contraste toujours a 4,58:1 au moins avec une nuance,
 * ce que ne garantit aucune paire de `Colors` (Neutre 50 et 1000 echouent sur Neutre 525).
 */
const fonce = '#000000';

/** La teinte, claire ou foncee, qui se lit le mieux sur la nuance. */
const teinteLisibleSur = (fond: string) => (contrastRatio(fonce, fond) >= contrasteAvecLeBlanc(fond) ? fonce : blanc);

const libelleDe: Record<RaisonHorsBande, string> = { horsEchelle: 'hors échelle', deprecie: 'déprécié' };

/** Les raisons de sortir de la bande, en toutes lettres : `hors échelle, déprécié`. */
const marquageDe = (raisons: RaisonHorsBande[]) => raisons.map(raison => libelleDe[raison]).join(', ');

const CaseDeNuance = ({
  nuance,
  selectionnee,
  onPress,
  marquage,
}: {
  nuance: Nuance;
  selectionnee: boolean;
  onPress: () => void;
  /** Present pour une nuance sous la bande : la case garde sa taille et porte son marquage a cote. */
  marquage?: string;
}) => {
  const teinte = teinteLisibleSur(nuance.hex);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={marquage ? `${nomDe(nuance)} ${marquage}` : nomDe(nuance)}
      aria-pressed={selectionnee}
      onPress={onPress}
      style={
        marquage
          ? { flexDirection: 'row', alignItems: 'center', gap: Spacings['1W'] }
          : { flexBasis: 64, flexShrink: 1, minWidth: 36 }
      }
    >
      <Box
        style={{
          height: 48,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: nuance.hex,
          // La nuance choisie est cernee de la teinte de son numero, en retrait pour ne pas decaler
          // la bande.
          outlineStyle: 'solid',
          outlineWidth: selectionnee ? 3 : 0,
          outlineOffset: -3,
          outlineColor: teinte,
        }}
      >
        <Typography style={{ color: teinte, paddingHorizontal: Spacings['1W'] }}>{nuance.numero}</Typography>
      </Box>
      {marquage && <Typography>{marquage}</Typography>}
    </Pressable>
  );
};

type Selection = { nuanceSelectionnee: Nuance | null; selectionner: (nuance: Nuance) => void };

const BlocDEchelle = ({ echelle, nuanceSelectionnee, selectionner }: { echelle: EchelleDeNuances } & Selection) => {
  const { text } = useTheme();
  const detail = echelle.toutes.find(nuance => nuance === nuanceSelectionnee);

  return (
    <Box style={{ marginBottom: Spacings['3W'] }}>
      <Typography style={text.Titres['H5 - XS']}>{echelle.titre}</Typography>
      {/* Une case vise 64 px : une echelle courte, comme Focus, donne une bande courte. Une longue
          echelle retrecit ses cases pour rester d'un seul tenant ; sur un ecran etroit, la bande
          defile seule plutot que de passer a la ligne. */}
      <Box style={{ flexDirection: 'row', overflowX: 'auto' }}>
        {echelle.nuances.map(nuance => (
          <CaseDeNuance
            key={nuance.numero}
            nuance={nuance}
            selectionnee={nuance === nuanceSelectionnee}
            onPress={() => selectionner(nuance)}
          />
        ))}
      </Box>
      {echelle.horsBande.length > 0 && (
        <Box style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacings['2W'], marginTop: Spacings['1W'] }}>
          {echelle.horsBande.map(({ nuance, raisons }) => (
            <CaseDeNuance
              key={nuance.numero}
              nuance={nuance}
              marquage={marquageDe(raisons)}
              selectionnee={nuance === nuanceSelectionnee}
              onPress={() => selectionner(nuance)}
            />
          ))}
        </Box>
      )}
      {detail && <DetailDeNuance nuance={detail} plusFoncee={echelle.plusFoncee} />}
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
  const familles = React.useMemo(() => famillesDEchellesDuCatalogue(catalogue), [catalogue]);
  const [nuanceSelectionnee, selectionner] = React.useState<Nuance | null>(null);

  return (
    <EcranDeCatalogue
      title={title}
      description={description}
      footerContent={footerContent}
      breadcrumbsProps={filDuTheme}
    >
      <Box style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacings['1V'], marginBottom: Spacings['3W'] }}>
        <Typography>{'Un composant lit un token sémantique, jamais une nuance. Voir les'}</Typography>
        <Link href={pageDesTokens}>{'tokens sémantiques'}</Link>
      </Box>
      {familles.map(famille => (
        <Box key={famille.titre} style={{ marginBottom: Spacings['3W'] }}>
          <Typography style={text.Titres['H4 - SM']}>{famille.titre}</Typography>
          {famille.echelles.map(echelle => (
            <BlocDEchelle
              key={echelle.titre}
              echelle={echelle}
              nuanceSelectionnee={nuanceSelectionnee}
              selectionner={selectionner}
            />
          ))}
        </Box>
      ))}
    </EcranDeCatalogue>
  );
};
