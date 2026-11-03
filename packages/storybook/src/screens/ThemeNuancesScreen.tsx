import { Box, Link, Typography } from '@alveole/components';
import { contrastRatio, Spacings } from '@alveole/theme';
import React from 'react';
import { Pressable } from 'react-native';
import { EcranDeCatalogue, filDuTheme } from '../components/EcranDeCatalogue';
import type { CatalogueDesCouleurs, Nuance } from '../couleurs/catalogueDesCouleurs';
import { catalogueDuTheme } from '../couleurs/catalogueDesCouleurs.generated';
import {
  blanc,
  contrasteAvecLeBlanc,
  type EchelleDeNuances,
  type FamilleDEchelles,
  famillesDEchellesDuCatalogue,
} from './echellesDuCatalogue';
import { type NuanceChoisie, PanneauDeNuance } from './PanneauDeNuance';
import { nomDe, pageDesTokens, useStylesDesNuances } from './presentationDesNuances';

export type ThemeNuancesScreenProps = {
  /** Le catalogue extrait du source du theme (ADR 0035). Par defaut, celui d'Alveole. */
  catalogue?: CatalogueDesCouleurs;
  title?: string;
  description?: string;
  footerContent?: React.ReactNode;
};

/**
 * Le noir et le blanc purs : l'un des deux contraste toujours a 4,58:1 au moins avec une nuance,
 * ce que ne garantit aucune paire de `Colors` (Neutre 50 et 1000 echouent sur Neutre 525).
 */
const fonce = '#000000';

/** La teinte, claire ou foncee, qui se lit le mieux sur la nuance. */
const teinteLisibleSur = (fond: string) => (contrastRatio(fonce, fond) >= contrasteAvecLeBlanc(fond) ? fonce : blanc);

const sansUsage = (nuance: Nuance) => nuance.tokens.length === 0;

/** Chaque case prend une part egale de la ligne : le rang N tombe sous le rang N de l'echelle voisine. */
const partDeLigne = { flexGrow: 1, flexBasis: 0, minWidth: 0 };

const CaseDeNuance = ({
  nuance,
  selectionnee,
  onPress,
}: {
  nuance: Nuance;
  selectionnee: boolean;
  onPress: () => void;
}) => {
  const styles = useStylesDesNuances();
  const teinte = teinteLisibleSur(nuance.hex);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={nomDe(nuance)}
      aria-pressed={selectionnee}
      onPress={onPress}
      style={partDeLigne}
    >
      <Box
        borderRadius="sm"
        style={{
          height: 44,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: nuance.hex,
          borderWidth: 1,
          borderColor: styles.filet,
          // La nuance choisie est cernee de la teinte de son numero, en retrait pour ne pas decaler
          // la ligne.
          outlineStyle: 'solid',
          outlineWidth: selectionnee ? 2 : 0,
          outlineOffset: -4,
          outlineColor: teinte,
        }}
      >
        <Typography style={[styles.petit, { color: teinte }]}>{nuance.numero}</Typography>
        {sansUsage(nuance) && (
          <Box
            style={{
              position: 'absolute',
              top: Spacings['1V'],
              right: Spacings['1V'],
              width: 4,
              height: 4,
              borderRadius: 2,
              backgroundColor: teinte,
              opacity: 0.5,
            }}
          />
        )}
      </Box>
    </Pressable>
  );
};

const TitreDeFamille = ({ famille }: { famille: FamilleDEchelles }) => {
  const styles = useStylesDesNuances();
  const nombre = famille.echelles.length;

  return (
    <Box
      style={{
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: Spacings['1W'],
        borderBottomWidth: 1,
        borderColor: styles.filet,
        paddingBottom: Spacings['1W'],
        marginBottom: Spacings['3W'],
      }}
    >
      <Typography style={styles.titreDeFamille}>{famille.titre}</Typography>
      <Typography style={[styles.petit, styles.discret]}>{`${nombre} échelle${nombre > 1 ? 's' : ''}`}</Typography>
    </Box>
  );
};

type Selection = { nuanceSelectionnee: Nuance | null; selectionner: (choix: NuanceChoisie) => void };

const LigneDEchelle = ({
  echelle,
  rangs,
  nuanceSelectionnee,
  selectionner,
}: { echelle: EchelleDeNuances; rangs: number } & Selection) => {
  const styles = useStylesDesNuances();
  const horsBande = echelle.horsBande.length;

  return (
    <Box style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacings['1W'] }}>
      <Typography style={[styles.petitGras, { width: 128 }]}>{echelle.titre}</Typography>
      <Box style={{ flex: 1, flexDirection: 'row', gap: 2 }}>
        {Array.from({ length: rangs }, (_, rang) => {
          const nuance = echelle.nuances[rang];
          return nuance ? (
            <CaseDeNuance
              key={nuance.numero}
              nuance={nuance}
              selectionnee={nuance === nuanceSelectionnee}
              onPress={() => selectionner({ nuance, echelle })}
            />
          ) : (
            <Box key={`vide-${rang}`} style={partDeLigne} />
          );
        })}
      </Box>
      <Typography style={[styles.petit, styles.discret, { width: 72, textAlign: 'right' }]}>
        {horsBande > 0 ? `+${horsBande} hors` : ''}
      </Typography>
    </Box>
  );
};

/** Le nombre de rangs de la plus longue echelle : toutes les lignes en ont autant. */
const rangsDe = (familles: FamilleDEchelles[]) =>
  Math.max(0, ...familles.flatMap(famille => famille.echelles.map(echelle => echelle.nuances.length)));

export const ThemeNuancesScreen = ({
  catalogue = catalogueDuTheme,
  title = 'Nuances',
  description = 'Les échelles de couleurs du thème et les tokens qui citent chaque nuance',
  footerContent,
}: ThemeNuancesScreenProps) => {
  const styles = useStylesDesNuances();
  const familles = React.useMemo(() => famillesDEchellesDuCatalogue(catalogue), [catalogue]);
  const [choix, selectionner] = React.useState<NuanceChoisie | null>(null);
  const nuanceSelectionnee = choix?.nuance ?? null;
  const rangs = rangsDe(familles);

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
      <Box style={{ flexDirection: 'row', alignItems: 'flex-start', gap: Spacings['4W'] }}>
        <Box style={{ flex: 1, minWidth: 0 }}>
          {familles.map(famille => (
            <Box key={famille.titre} style={{ marginBottom: Spacings['5W'] }}>
              <TitreDeFamille famille={famille} />
              {famille.echelles.map(echelle => (
                <LigneDEchelle
                  key={echelle.titre}
                  echelle={echelle}
                  rangs={rangs}
                  nuanceSelectionnee={nuanceSelectionnee}
                  selectionner={selectionner}
                />
              ))}
            </Box>
          ))}
          <Typography style={[styles.petit, styles.discret]}>
            {'Point dans la case : nuance sans usage. Colonnes alignées par rang, du plus clair au plus foncé.'}
          </Typography>
        </Box>
        <PanneauDeNuance choix={choix} />
      </Box>
    </EcranDeCatalogue>
  );
};
