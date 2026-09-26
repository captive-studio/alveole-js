import { CSSProperties } from 'react';
import { IconProps } from '../LucideIcon';
import type { ButtonIconProps } from './ButtonIcon';
import { styleDuPressable } from './buttonStyling';
import {
  ButtonTaille,
  cleDEtat,
  CONTENEUR_PAR_VARIANT,
  EtatVisuel,
  HAUTEUR_PAR_TAILLE,
  ICONE_PAR_VARIANT,
  styleDe,
  Styles,
  SURVOL_PAR_VARIANT,
  TEXTE_PAR_VARIANT,
} from './buttonVariants';

export type EtatDuBoutonIcone = Pick<ButtonIconProps, 'variant' | 'disabled' | 'iconSize' | 'style'> & {
  taille: ButtonTaille;
};

/** Faute d'`iconSize`, l'icone suit la taille du bouton, en repliant `md` sur elle-meme. */
const ICONE_PAR_TAILLE: Record<ButtonTaille, NonNullable<ButtonIconProps['iconSize']>> = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

export const styleDuCadreDIcone = (styles: Styles, etat: EtatDuBoutonIcone, hovered: boolean) => {
  const { variant, taille, disabled, style } = etat;
  // Le survol tient ici le role que l'appui tient sur `Button` : c'est le seul etat actif
  // qu'un bouton sans libelle connaisse. D'ou l'etat actif emprunte a la table de survol,
  // le repos et le desactive restant ceux du conteneur.
  const etatsDuFond: EtatVisuel = { ...CONTENEUR_PAR_VARIANT[variant], actif: SURVOL_PAR_VARIANT[variant] };

  return {
    justifyContent: styles.container.justifyContent,
    alignItems: styles.container.alignItems,
    transitionProperty: styles.container.transitionProperty,
    transitionDuration: styles.container.transitionDuration,
    transitionTimingFunction: styles.container.transitionTimingFunction,
    backgroundColor: {
      ...styles[etatsDuFond.repos],
      ...styleDe(styles, cleDEtat(etatsDuFond, { disabled, actif: hovered })),
    }.backgroundColor,
    ...styleDuPressable(styles, { variant, taille, disabled }, { hovered }),
    // Le socle de `Button` pose la hauteur du cran de controle ; le carre n'a qu'a la reprendre.
    width: styles[HAUTEUR_PAR_TAILLE[taille]].height,
    ...(style ?? {}),
  };
};

export const apparenceDeLIcone = (
  styles: Styles,
  { variant, taille, disabled, iconSize }: EtatDuBoutonIcone,
  hovered: boolean,
): Omit<IconProps, 'name'> => ({
  size: iconSize ?? ICONE_PAR_TAILLE[taille],
  color: styles[cleDEtat(ICONE_PAR_VARIANT[variant], { disabled, actif: hovered })].color,
});

export const styleDuNombre = (
  styles: Styles,
  { variant, disabled }: EtatDuBoutonIcone,
  hovered: boolean,
): CSSProperties => {
  const etats = TEXTE_PAR_VARIANT[variant];

  return {
    ...styles.title,
    ...styles[etats.repos],
    ...styleDe(styles, cleDEtat(etats, { disabled, actif: hovered })),
    minWidth: 16,
  };
};
