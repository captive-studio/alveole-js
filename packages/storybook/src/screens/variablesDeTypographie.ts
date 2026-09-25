import type { CSSVarEntry } from './variablesCSSDuTheme';

/**
 * Les variables CSS d'un arbre de typographies : une feuille est reconnue a sa taille, et son
 * chemin dans l'arbre donne le nom de ses variables. L'assainisseur de cle est injecte : il vient
 * du theme, et cette collecte n'a pas a le charger pour etre testee.
 */
export function variablesDeTypographie(
  arbre: object,
  nommer: (cle: string) => string,
  chemin: string[] = [],
): CSSVarEntry[] {
  const { fontSize, lineHeight, fontFamily, fontWeight } = Object.fromEntries(Object.entries(arbre));
  if (typeof fontSize === 'number') {
    const prefixe = `--typography-${chemin.map(nommer).join('-')}`;
    const variable = (suffixe: string, rawValue: string): CSSVarEntry => ({
      name: `${prefixe}-${suffixe}`,
      rawValue,
      preview: 'none',
    });
    const variables = [variable('font-size', `${fontSize}px`), variable('line-height', `${lineHeight}px`)];
    if (typeof fontFamily === 'string') variables.push(variable('font-family', fontFamily));
    if (typeof fontWeight === 'string') variables.push(variable('font-weight', fontWeight));
    return variables;
  }

  return Object.entries(arbre).flatMap(([cle, valeur]) =>
    typeof valeur === 'object' && valeur !== null ? variablesDeTypographie(valeur, nommer, [...chemin, cle]) : [],
  );
}
