import { CSSProperties } from 'react';
import { useStyles } from './Tag.styles';

type Styles = ReturnType<typeof useStyles>;

export type EtatDeLEtiquette = {
  size: 'sm' | 'md';
  /** Le pointeur est sur l'etiquette ou sur sa croix, et l'etiquette se manipule. */
  survolee: boolean;
  selectionnee: boolean;
  fermable: boolean;
};

/**
 * L'apparence de la pastille, empilee dans l'ordre ou les etats se recouvrent : le cran de
 * taille, puis le retrait que la croix supprime, puis le survol, puis la selection qui a le
 * dernier mot. Sortie du rendu parce qu'elle porte la regle de l'ADR 0014 - quatre etats qui
 * se combinent - et qu'une fonction nommee la rend lisible d'un coup d'oeil.
 */
export const apparenceDeLaPastille = (styles: Styles, etat: EtatDeLEtiquette): CSSProperties => ({
  ...styles.tag,
  ...(etat.size === 'sm' ? styles.tagSm : styles.tagMd),
  ...(etat.fermable ? styles.pastilleFermable : {}),
  ...(etat.survolee ? styles.tagSurvole : {}),
  ...(etat.selectionnee ? styles.tagSelected : {}),
});

/** L'ecart entre l'icone de tete et le libelle, qui suit le cran comme chez Primer. */
export const ecartDeLIcone = (styles: Styles, size: 'sm' | 'md') => (size === 'sm' ? styles.iconeSm : styles.iconeMd);
