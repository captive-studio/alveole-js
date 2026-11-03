/**
 * Les `aria-label` qui ne contiennent pas le texte visible de leur element, comme le relève
 * la regle axe `label-content-name-mismatch` en navigateur.
 */
export const libellesSansTexteVisible = (racine: HTMLElement): string[] =>
  Array.from(racine.querySelectorAll('[aria-label]'))
    .map(element => ({ libelle: element.getAttribute('aria-label') ?? '', texte: element.textContent ?? '' }))
    .filter(({ libelle, texte }) => !libelle.includes(texte))
    .map(({ libelle }) => libelle);
