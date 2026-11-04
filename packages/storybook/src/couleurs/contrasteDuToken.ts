import { cheminDuFondParDefaut } from './contraste';
import type { TokenSemantique } from './catalogueDesCouleurs';

type Contexte = { fondParDefaut: string; blanc: string; contraste: (couleur: string, fond: string) => number };

/** Le seuil WCAG AA d'un texte courant. */
const SEUIL_DU_TEXTE = 4.5;

/** `light.text.disabled-grey` ou `text.button.primary.disabled` : le dernier segment le dit. */
const estDesactive = (token: TokenSemantique) => (token.chemin.split('.').pop() ?? '').includes('disabled');

const verdictDuTexte = (token: TokenSemantique, ratio: number) => {
  if (estDesactive(token)) return 'exempté';
  return ratio >= SEUIL_DU_TEXTE ? 'conforme' : 'insuffisant';
};

/** Seul un hexadecimal a une couleur propre : `transparent` ou `rgba(...)` laissent voir dessous. */
const EST_OPAQUE = /^#[0-9a-f]{3}([0-9a-f]{3})?$/i;

/** `light / text` comme `text / button / primary` : un segment de la famille nomme le texte. */
const estUnTexte = (token: TokenSemantique) => token.famille.split(' / ').includes('text');

/**
 * Le rapport WCAG d'un token et son verdict (ADR 0027, logique pure). Un texte se juge sur le fond
 * par defaut ; une bordure ou un fond se mesure sur blanc, sans verdict. Une couleur non opaque
 * n'a aucun rapport : `null`.
 */
export const contrasteDuToken = (token: TokenSemantique, { fondParDefaut, blanc, contraste }: Contexte) => {
  if (!EST_OPAQUE.test(token.hex)) return null;
  if (!estUnTexte(token)) return { ratio: contraste(token.hex, blanc), fond: 'blanc', verdict: null };
  const ratio = contraste(token.hex, fondParDefaut);
  return { ratio, fond: cheminDuFondParDefaut.replace('light.', ''), verdict: verdictDuTexte(token, ratio) };
};
