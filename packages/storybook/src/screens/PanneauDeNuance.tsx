import { Box, Link, Typography } from '@alveole/components';
import { contrastRatio, Grilles, Spacings } from '@alveole/theme';
import type { Nuance } from '../couleurs/catalogueDesCouleurs';
import { contrasteAvecLeBlanc, type EchelleDeNuances, type RaisonHorsBande } from './echellesDuCatalogue';
import {
  compte,
  largeurDeColonne,
  libelleSansUsage,
  nomDe,
  pageDesTokens,
  sansUsage,
  useStylesDesNuances,
} from './presentationDesNuances';

/** Un rapport de contraste a une decimale et a la francaise : `1,4:1`. */
const rapport = (contraste: number) => `${contraste.toFixed(1).replace('.', ',')}:1`;

const contrasteSurBlanc = (hex: string) => `${rapport(contrasteAvecLeBlanc(hex))} sur blanc`;

/** Chaque chemin mene a la ligne du token sur la page des tokens, ancree sur ce chemin. */
const LiensDesTokens = ({ chemins }: { chemins: string[] }) =>
  chemins.map(chemin => (
    <Link key={chemin} href={`${pageDesTokens}#${chemin}`}>
      {chemin}
    </Link>
  ));

/** Le contraste de la nuance sur un fond, nomme : `15,5:1 sur Neutre 900`. */
const contrasteSur = (nuance: Nuance, fond: Nuance) =>
  `${rapport(contrastRatio(nuance.hex, fond.hex))} sur ${nomDe(fond)}`;

/** Un aplat de nuance, cerne d'un filet leger pour qu'une nuance tres claire reste visible sur le blanc. */
const Aplat = ({ hex, taille, rayon }: { hex: string; taille: number; rayon: 'sm' | 'lg' }) => {
  const styles = useStylesDesNuances();
  return (
    <Box
      borderRadius={rayon}
      style={{ width: taille, height: taille, backgroundColor: hex, borderWidth: 1, borderColor: styles.filet }}
    />
  );
};

const DetailDeNuance = ({ nuance, plusFoncee }: { nuance: Nuance; plusFoncee?: Nuance }) => {
  const styles = useStylesDesNuances();
  const nombre = nuance.tokens.length;

  return (
    <Box role="group" aria-label={nomDe(nuance)} style={{ gap: Spacings['2W'] }}>
      <Box style={{ flexDirection: 'row', alignItems: 'center', gap: Spacings['2W'] }}>
        <Aplat hex={nuance.hex} taille={Spacings['8W']} rayon="lg" />
        <Box style={{ flex: 1 }}>
          <Typography style={styles.nomFort}>{nomDe(nuance)}</Typography>
          <Typography style={[styles.petit, styles.mono, styles.discret]}>{nuance.hex}</Typography>
          <Typography style={styles.petit}>{contrasteSurBlanc(nuance.hex)}</Typography>
          {plusFoncee && plusFoncee !== nuance && (
            <Typography style={styles.petit}>{contrasteSur(nuance, plusFoncee)}</Typography>
          )}
        </Box>
      </Box>
      <Box style={{ gap: Spacings['1V'] }}>
        <Typography style={styles.rubrique}>{`Tokens (${nombre})`}</Typography>
        {sansUsage(nuance) && <Typography style={[styles.petit, styles.discret]}>{libelleSansUsage}</Typography>}
        <LiensDesTokens chemins={nuance.tokens} />
        {nuance.tokensDeprecies.length > 0 && (
          <>
            <Typography style={[styles.petitGras, styles.alerte]}>{'Déprécié'}</Typography>
            <LiensDesTokens chemins={nuance.tokensDeprecies} />
          </>
        )}
      </Box>
    </Box>
  );
};

const libelleDe: Record<RaisonHorsBande, string> = { horsEchelle: 'hors échelle', deprecie: 'déprécié' };

/** Les raisons de sortir de la bande, en toutes lettres : `hors échelle, déprécié`. */
const marquageDe = (raisons: RaisonHorsBande[]) => raisons.map(raison => libelleDe[raison]).join(', ');

/** Ce que dit d'une nuance la derniere colonne du tableau : ses raisons de sortir de la bande, ou son usage. */
const usageDe = (nuance: Nuance, raisons: RaisonHorsBande[]) => {
  if (raisons.length > 0) return marquageDe(raisons);
  if (sansUsage(nuance)) return libelleSansUsage;
  return compte(nuance.tokens.length, 'token');
};

const TableauDeLEchelle = ({
  echelle,
  nuanceSelectionnee,
}: {
  echelle: EchelleDeNuances;
  nuanceSelectionnee: Nuance;
}) => {
  const styles = useStylesDesNuances();
  const titre = `Échelle ${echelle.titre}`;
  const lignes = [...echelle.nuances.map(nuance => ({ nuance, raisons: [] })), ...echelle.horsBande];

  return (
    <Box>
      <Typography style={[styles.rubrique, { marginBottom: Spacings['1V'] }]}>{titre}</Typography>
      <Box role="table" aria-label={titre}>
        {lignes.map(({ nuance, raisons }) => {
          const horsBande = raisons.length > 0;
          const choisie = nuance === nuanceSelectionnee;
          return (
            <Box
              key={nuance.numero}
              role="row"
              aria-selected={choisie}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: Spacings['1W'],
                paddingVertical: Spacings['1V'],
                borderTopWidth: 1,
                borderColor: styles.filet,
                backgroundColor: choisie ? styles.surbrillance : undefined,
              }}
            >
              <Box role="cell">
                <Aplat hex={nuance.hex} taille={Spacings['3W']} rayon="sm" />
              </Box>
              <Box role="cell" style={{ width: largeurDeColonne }}>
                {/* Un cran deprecie ou hors echelle reste lisible, mais grise, en retrait de la progression. */}
                <Typography style={[styles.petitGras, horsBande && styles.discret]}>{nuance.numero}</Typography>
              </Box>
              <Box role="cell" style={{ width: largeurDeColonne }}>
                <Typography style={[styles.petit, styles.mono, horsBande && styles.discret]}>{nuance.hex}</Typography>
              </Box>
              <Box role="cell" style={{ flex: 1 }}>
                <Typography style={[styles.petit, styles.discret, { textAlign: 'right' }]}>
                  {usageDe(nuance, raisons)}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export type NuanceChoisie = { nuance: Nuance; echelle: EchelleDeNuances };

/** Le panneau suit le defilement : la nuance choisie reste sous les yeux pendant qu'on parcourt la grille. */
export const PanneauDeNuance = ({ choix }: { choix: NuanceChoisie | null }) => {
  const styles = useStylesDesNuances();

  return (
    <Box
      borderRadius="lg"
      style={{
        width: Grilles['3 colonnes'],
        flexShrink: 0,
        position: 'sticky',
        top: Spacings['3W'],
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: Spacings['3W'],
        gap: Spacings['2W'],
        borderWidth: 1,
        borderColor: styles.filet,
      }}
    >
      {choix ? (
        <>
          <DetailDeNuance nuance={choix.nuance} plusFoncee={choix.echelle.plusFoncee} />
          <TableauDeLEchelle echelle={choix.echelle} nuanceSelectionnee={choix.nuance} />
        </>
      ) : (
        <Typography style={[styles.petit, styles.discret]}>
          {'Sélectionnez une nuance pour voir son échelle en détail.'}
        </Typography>
      )}
    </Box>
  );
};
