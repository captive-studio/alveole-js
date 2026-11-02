import type { CatalogueDesCouleurs, Nuance } from '../couleurs/catalogueDesCouleurs';
import { grouperDansLOrdre } from './grouperDansLOrdre';

export type EchelleDeNuances = { titre: string; nuances: Nuance[] };

/** Les nuances rangees par echelle, dans l'ordre ou le source du theme les declare. */
const echellesDuCatalogue = ({ nuances }: Pick<CatalogueDesCouleurs, 'nuances'>): EchelleDeNuances[] =>
  grouperDansLOrdre(nuances, nuance => nuance.echelle).map(([titre, nuancesDeLEchelle]) => ({
    titre,
    nuances: nuancesDeLEchelle,
  }));

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
