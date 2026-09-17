/**
 * Libellés et réglages par défaut du panneau, communs aux deux plateformes.
 * Ils vivent ici plutôt qu'en valeurs par défaut de déstructuration : dix `=`
 * dans une signature comptent tous dans la complexité de la fonction, et le
 * cliquet du dépôt la plafonne à 10.
 */
export const REGLAGES_PAR_DEFAUT = {
  clearLabel: 'Effacer la sélection',
  searchPlaceholder: 'Rechercher…',
  loadingMessage: 'Recherche…',
  emptyMessage: 'Aucune option',
  createLabel: (query: string) => `Ajouter « ${query} »`,
} as const;

type Textes = {
  clearLabel?: string;
  searchPlaceholder?: string;
  loadingMessage?: string;
  emptyMessage?: string;
  createLabel?: (query: string) => string;
};

/** Complète les libellés laissés vides par l'appelant. */
export const textesDuPanneau = (textes: Textes) => ({ ...REGLAGES_PAR_DEFAUT, ...sansIndefinis(textes) });

// `{ ...defauts, ...textes }` écraserait un défaut avec `undefined` dès que la prop
// est absente : les clés non renseignées sont retirées avant la fusion.
const sansIndefinis = (textes: Textes): Textes =>
  Object.fromEntries(Object.entries(textes).filter(([, valeur]) => valeur !== undefined));
