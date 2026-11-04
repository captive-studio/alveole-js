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
  type FamilleDEchelles,
  famillesDEchellesDuCatalogue,
} from './echellesDuCatalogue';
import { type NuanceChoisie, PanneauDeNuance } from './PanneauDeNuance';
import {
  compte,
  largeurDeColonne,
  nomDe,
  pageDesTokens,
  sansUsage,
  useStylesDesNuances,
} from './presentationDesNuances';

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

/**
 * Chaque case prend une part egale de la ligne : le rang N tombe sous le rang N de l'echelle voisine.
 * Elle ne descend pas sous la largeur d'un numero a quatre chiffres : faute de place, la grille
 * defile, jamais les numeros ne se chevauchent.
 */
const largeurMinimaleDeCase = Spacings['4W'];
const partDeLigne = { flexGrow: 1, flexBasis: 0, minWidth: largeurMinimaleDeCase };
const ecartEntreCases = Spacings['0,5V'];
const largeurDuNom = 128;

/** La grille ne se serre pas sous ses cases minimales : elle defile plutot. */
const largeurMinimaleDeGrille = (nombreDeRangs: number) =>
  largeurDuNom + nombreDeRangs * (largeurMinimaleDeCase + ecartEntreCases) - ecartEntreCases + largeurDeColonne;

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
  const { text: texte } = useTheme().color.light;
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
            borderRadius="sm"
            backgroundColor={teinte === fonce ? texte['title-grey'] : texte['inverted-grey']}
            style={{
              position: 'absolute',
              top: Spacings['1V'],
              right: Spacings['1V'],
              width: 4,
              height: 4,
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
      <Typography style={[styles.petit, styles.discret]}>{compte(nombre, 'échelle')}</Typography>
    </Box>
  );
};

type Selection = { nuanceSelectionnee: Nuance | null; selectionner: (choix: NuanceChoisie) => void };

const LigneDEchelle = ({
  echelle,
  nombreDeRangs,
  nuanceSelectionnee,
  selectionner,
}: { echelle: EchelleDeNuances; nombreDeRangs: number } & Selection) => {
  const styles = useStylesDesNuances();
  const horsBande = echelle.horsBande.length;

  return (
    <Box style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacings['1W'] }}>
      <Typography style={[styles.petitGras, { width: largeurDuNom }]}>{echelle.titre}</Typography>
      <Box style={{ flex: 1, flexDirection: 'row', gap: ecartEntreCases }}>
        {Array.from({ length: nombreDeRangs }, (_, rang) => {
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
      <Typography style={[styles.petit, styles.discret, { width: largeurDeColonne, textAlign: 'right' }]}>
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
  const nombreDeRangs = rangsDe(familles);

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
        <Box role="region" aria-label="Échelles de nuances" style={{ flex: 1, minWidth: 0, overflowX: 'auto' }}>
          <Box style={{ minWidth: largeurMinimaleDeGrille(nombreDeRangs) }}>
            {familles.map(famille => (
              <Box key={famille.titre} style={{ marginBottom: Spacings['5W'] }}>
                <TitreDeFamille famille={famille} />
                {famille.echelles.map(echelle => (
                  <LigneDEchelle
                    key={echelle.titre}
                    echelle={echelle}
                    nombreDeRangs={nombreDeRangs}
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
        </Box>
        <PanneauDeNuance choix={choix} />
      </Box>
    </EcranDeCatalogue>
  );
};
