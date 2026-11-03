import { contrastRatio } from '@alveole/theme';
import type { CatalogueDesCouleurs, Nuance } from '../couleurs/catalogueDesCouleurs';
import { grouperDansLOrdre } from './grouperDansLOrdre';

/** Ce qui sort une nuance de la progression : une cle comme `main-646` n'est pas un cran, un cran deprecie ne compte plus. */
export type RaisonHorsBande = 'horsEchelle' | 'deprecie';

/** Une nuance montree sous la bande, avec les raisons qui l'en sortent. */
export type NuanceHorsBande = { nuance: Nuance; raisons: RaisonHorsBande[] };

/**
 * `nuances` forment la bande, rangees par rang ; `horsBande` vivent sous elle. `plusFoncee` clot la
 * bande, `toutes` reunit bande et hors bande.
 */
export type EchelleDeNuances = {
  titre: string;
  nuances: Nuance[];
  horsBande: NuanceHorsBande[];
  plusFoncee: Nuance | undefined;
  toutes: Nuance[];
};

const raisonsDe = (nuance: Nuance): RaisonHorsBande[] => [
  ...(/^\d+$/.test(nuance.numero) ? [] : ['horsEchelle' as const]),
  ...(nuance.deprecie ? ['deprecie' as const] : []),
];

const parRang = (nuances: Nuance[]) =>
  [...nuances].sort((a, b) => contrasteAvecLeBlanc(a.hex) - contrasteAvecLeBlanc(b.hex));

export const blanc = '#FFFFFF';

/** Plus une nuance est foncee, plus elle contraste avec le blanc : c'est aussi son rang. */
export const contrasteAvecLeBlanc = (hex: string) => contrastRatio(hex, blanc);

const echelleDeNuances = (titre: string, nuancesDeLEchelle: Nuance[]): EchelleDeNuances => {
  const classees = nuancesDeLEchelle.map(nuance => ({ nuance, raisons: raisonsDe(nuance) }));
  const nuances = parRang(classees.filter(({ raisons }) => raisons.length === 0).map(({ nuance }) => nuance));
  const horsBande = classees.filter(({ raisons }) => raisons.length > 0);
  return {
    titre,
    nuances,
    horsBande,
    plusFoncee: nuances[nuances.length - 1],
    toutes: [...nuances, ...horsBande.map(({ nuance }) => nuance)],
  };
};

/**
 * Les echelles dans l'ordre ou le source du theme les declare, chacune rangee du plus clair au
 * plus fonce : deux numerotations inverses cohabitent, seul le rang les rend comparables.
 */
const echellesDuCatalogue = ({ nuances }: Pick<CatalogueDesCouleurs, 'nuances'>): EchelleDeNuances[] =>
  grouperDansLOrdre(nuances, nuance => nuance.echelle).map(([titre, nuancesDeLEchelle]) =>
    echelleDeNuances(titre, nuancesDeLEchelle),
  );

export type FamilleDEchelles = { titre: string; echelles: EchelleDeNuances[] };

const familleDeLEchelle: Record<string, string> = {
  Neutre: 'Neutre',
  SlateGrey: 'Neutre',
  GrisPolaire: 'Neutre',
  BleuCaptive: 'Marque',
  RougeErreur: 'Statut',
  VertSuccess: 'Statut',
  OrangeWarning: 'Statut',
  Focus: 'Statut',
};

const nonUtilisees = 'Non utilisées par le thème';
const ordreDesFamilles = ['Neutre', 'Marque', 'Statut', 'Accent', nonUtilisees];

/** Une echelle vit dans le theme des qu'un token, meme deprecie, cite l'une de ses nuances. */
const estCitee = ({ nuances }: EchelleDeNuances) =>
  nuances.some(nuance => nuance.tokens.length > 0 || nuance.tokensDeprecies.length > 0);

const familleDe = (echelle: EchelleDeNuances) =>
  estCitee(echelle) ? (familleDeLEchelle[echelle.titre] ?? 'Accent') : nonUtilisees;

/**
 * Les echelles rangees par famille, dans l'ordre fixe des familles ; une echelle inconnue est un
 * accent, une echelle que rien ne cite va en fin de page.
 */
export const famillesDEchellesDuCatalogue = (catalogue: Pick<CatalogueDesCouleurs, 'nuances'>): FamilleDEchelles[] => {
  const familles = new Map(grouperDansLOrdre(echellesDuCatalogue(catalogue), familleDe));
  return ordreDesFamilles.flatMap(titre => {
    const echelles = familles.get(titre);
    return echelles ? [{ titre, echelles }] : [];
  });
};
