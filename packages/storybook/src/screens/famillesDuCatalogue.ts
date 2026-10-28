import type { CatalogueDesCouleurs, TokenSemantique } from '../couleurs/catalogueDesCouleurs';

export type FamilleDeTokens = { titre: string; tokens: TokenSemantique[] };

/** Les tokens ranges par famille, dans l'ordre ou le source du theme les declare. */
export function famillesDuCatalogue({ tokens }: CatalogueDesCouleurs): FamilleDeTokens[] {
  const familles = new Map<string, TokenSemantique[]>();
  for (const token of tokens) {
    const titre = token.famille || 'racine';
    familles.set(titre, [...(familles.get(titre) ?? []), token]);
  }
  return [...familles].map(([titre, tokensDeLaFamille]) => ({ titre, tokens: tokensDeLaFamille }));
}
