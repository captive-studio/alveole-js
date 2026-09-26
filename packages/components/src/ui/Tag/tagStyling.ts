import { CSSProperties } from 'react';
import { useStyles } from './Tag.styles';

type Styles = ReturnType<typeof useStyles>;

/** Les deux crans de l'etiquette : notre sm vaut le medium de Primer, notre md son large. */
export type TailleDEtiquette = 'sm' | 'md';

export type EtatDeLEtiquette = {
  size: TailleDEtiquette;
  /** Le pointeur est sur l'etiquette ou sur sa croix, et l'etiquette se manipule. */
  survolee: boolean;
  selectionnee: boolean;
  fermable: boolean;
};

/**
 * L'apparence de la pastille, empilee dans l'ordre ou les etats se recouvrent : le cran de
 * taille, puis le retrait que la croix supprime, puis le survol, puis la selection qui a le
 * dernier mot. Sortie du rendu parce qu'elle porte la regle de l'ADR 0020 - quatre etats qui
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
export const ecartDeLIcone = (styles: Styles, size: TailleDEtiquette) =>
  size === 'sm' ? styles.iconeSm : styles.iconeMd;

export type PointeurSurLEtiquette = {
  /** L'etiquette se ferme, ou se choisit dans un groupe (ADR 0019). */
  manipulable: boolean;
  pastilleSurvolee: boolean;
  croixSurvolee: boolean;
  selectionnee: boolean;
};

/**
 * Ce que le pointeur change a l'etiquette. La croix relaie son propre survol : react-native-web
 * retire le survol du `Pressable` parent des que le pointeur entre dans l'enfant, et sans ce
 * relais passer du libelle a la croix eclaircirait l'etiquette.
 */
export const reponseAuPointeur = ({
  manipulable,
  pastilleSurvolee,
  croixSurvolee,
  selectionnee,
}: PointeurSurLEtiquette) => {
  const sousLePointeur = pastilleSurvolee || croixSurvolee;

  return { survolee: manipulable && sousLePointeur, fonce: sousLePointeur || selectionnee };
};

/** Le cercle de la croix : son gabarit suit le cran, seul son fond change au survol. */
export const apparenceDeLaCroix = (styles: Styles, size: TailleDEtiquette, survolee: boolean) => ({
  ...(size === 'sm' ? styles.croixSm : styles.croixMd),
  ...(survolee ? styles.croixSurvolee : {}),
});

/** L'icone de la croix grossit avec la pastille et prend la teinte du libelle. */
export const apparenceDeLIconeDeCroix = (styles: Styles, size: TailleDEtiquette, fonce: boolean) => ({
  size: size === 'sm' ? ('xs' as const) : ('sm' as const),
  color: (fonce ? styles.tagSurvole : styles.tag).color,
});
