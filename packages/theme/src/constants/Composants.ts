import { Spacings } from './Spacing';

/** Cote en pixels de chaque taille d'avatar, partagee par l'app et les mails. */
export const TaillesAvatar = {
  xs: 20,
  sm: Spacings['3W'],
  md: Spacings['4W'],
  lg: Spacings['5W'],
  xl: Spacings['8W'],
} as const;

export type TailleAvatar = keyof typeof TaillesAvatar;

/** Le cran typographique de chaque niveau de titre : `as` fixe la balise et sa taille. */
export const TitreParNiveau = {
  h1: 'H1 - XL',
  h2: 'H2 - LG',
  h3: 'H3 - MD',
  h4: 'H4 - SM',
  h5: 'H5 - XS',
  h6: 'H6 - XXS',
} as const;

export type NiveauDeTitre = keyof typeof TitreParNiveau;
