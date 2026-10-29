import type { CatalogueDesCouleurs, TokenSemantique } from '../couleurs/catalogueDesCouleurs';
import { grouperDansLOrdre } from './grouperDansLOrdre';

export type FamilleDeTokens = { titre: string; tokens: TokenSemantique[] };

/** Les tokens ranges par famille, dans l'ordre ou le source du theme les declare. */
export const famillesDuCatalogue = ({ tokens }: Pick<CatalogueDesCouleurs, 'tokens'>): FamilleDeTokens[] =>
  grouperDansLOrdre(tokens, token => token.famille || 'racine').map(([titre, tokensDeLaFamille]) => ({
    titre,
    tokens: tokensDeLaFamille,
  }));
