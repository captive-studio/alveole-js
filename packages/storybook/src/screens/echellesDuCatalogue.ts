import type { CatalogueDesCouleurs, Nuance } from '../couleurs/catalogueDesCouleurs';
import { grouperDansLOrdre } from './grouperDansLOrdre';

export type EchelleDeNuances = { titre: string; nuances: Nuance[] };

/** Les nuances rangees par echelle, dans l'ordre ou le source du theme les declare. */
export const echellesDuCatalogue = ({ nuances }: Pick<CatalogueDesCouleurs, 'nuances'>): EchelleDeNuances[] =>
  grouperDansLOrdre(nuances, nuance => nuance.echelle).map(([titre, nuancesDeLEchelle]) => ({
    titre,
    nuances: nuancesDeLEchelle,
  }));
