import type { CSSVarEntry } from './variablesCSSDuTheme';

/**
 * Les variables CSS d'un arbre de typographies : une feuille est reconnue a sa taille, et son
 * chemin dans l'arbre donne le nom de ses variables. L'assainisseur de cle est injecte : il vient
 * du theme, et cette collecte n'a pas a le charger pour etre testee.
 */
export function variablesDeTypographie(
  arbre: Record<string, unknown>,
  nommer: (cle: string) => string,
  chemin: string[] = [],
): CSSVarEntry[] {
  if (typeof arbre.fontSize === 'number') {
    const prefixe = `--typography-${chemin.map(nommer).join('-')}`;
    const variable = (suffixe: string, rawValue: string): CSSVarEntry => ({
      name: `${prefixe}-${suffixe}`,
      rawValue,
      preview: 'none',
    });
    const variables = [variable('font-size', `${arbre.fontSize}px`), variable('line-height', `${arbre.lineHeight}px`)];
    if (typeof arbre.fontFamily === 'string') variables.push(variable('font-family', arbre.fontFamily));
    if (typeof arbre.fontWeight === 'string') variables.push(variable('font-weight', arbre.fontWeight));
    return variables;
  }

  return Object.entries(arbre).flatMap(([cle, valeur]) =>
    typeof valeur === 'object' && valeur !== null
      ? variablesDeTypographie(valeur as Record<string, unknown>, nommer, [...chemin, cle])
      : [],
  );
}
