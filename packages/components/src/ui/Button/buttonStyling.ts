import { focusRing, StyleValue } from '@alveole/theme';
import { IconProps } from '../LucideIcon';
import { EtatDuBouton } from './Button.types';
import {
  BORDURE_PAR_VARIANT,
  cleDEtat,
  CONTENEUR_PAR_TAILLE,
  CONTENEUR_PAR_VARIANT,
  HAUTEUR_PAR_TAILLE,
  ICONE_PAR_VARIANT,
  styleDe,
  Styles,
  SURVOL_PAR_VARIANT,
  TEXTE_PAR_VARIANT,
  TITRE_PAR_TAILLE,
} from './buttonVariants';

const SANS_REMBOURRAGE = { paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0 };
const SANS_RAYON = {
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
};

/**
 * Choisit le style de fond du conteneur. `selected` court-circuite la variante : un bouton
 * selectionne a le meme fond quelle que soit sa variante et quel que soit son etat.
 */
const styleDeFond = (styles: Styles, { variant, selected, disabled }: EtatDuBouton, actif: boolean) => {
  if (selected) return styles.selectedContainer;

  const etats = CONTENEUR_PAR_VARIANT[variant];

  return { ...styles[etats.repos], ...styleDe(styles, cleDEtat(etats, { disabled, actif })) };
};

/** Le fond, les rembourrages et l'alignement : tout ce qui se pose sur le Box interieur. */
export const styleDuConteneur = (styles: Styles, etat: EtatDuBouton, actif: boolean): StyleValue => ({
  ...styles.container,
  ...styleDeFond(styles, etat, actif),
  ...styleDe(styles, CONTENEUR_PAR_TAILLE[etat.taille][etat.iconeSeule ? 'iconeSeule' : 'avecLibelle']),
  ...(etat.noPadding ? SANS_REMBOURRAGE : {}),
  ...(etat.leftAlign ? { justifyContent: 'left' as const } : {}),
  // La bordure est posee sur le Pressable, pas ici : le Box doit donc annuler celle que son
  // style de variante lui aurait donnee, sans quoi les deux se superposeraient.
  borderWidth: 0,
  borderColor: undefined,
  borderStyle: undefined,
  ...(etat.borderNone ? SANS_RAYON : {}),
});

/** Le survol n'est pas un etat rendu : c'est une prop que Tamagui appliquera lui-meme. */
export const styleDeSurvol = (styles: Styles, { variant, selected, disabled }: EtatDuBouton): StyleValue => {
  if (disabled) return {};
  if (selected) return styles.selectedContainerHover;

  return styleDe(styles, SURVOL_PAR_VARIANT[variant]);
};

export const styleDuLibelle = (styles: Styles, etat: EtatDuBouton, hovered: boolean): StyleValue => {
  const { variant, selected, disabled, taille } = etat;
  const etats = TEXTE_PAR_VARIANT[variant];
  const teinte = selected
    ? styles.selectedTitle
    : { ...styles[etats.repos], ...styleDe(styles, cleDEtat(etats, { disabled, actif: hovered })) };

  return { ...styles.title, ...teinte, ...styleDe(styles, TITRE_PAR_TAILLE[taille]) };
};

export const styleDeLIcone = (styles: Styles, etat: EtatDuBouton, hovered: boolean): Omit<IconProps, 'name'> => {
  const { variant, selected, disabled, taille } = etat;
  const size = taille === 'lg' ? 'md' : 'sm';

  if (selected) return { size, color: styles.selectedIcon.color };

  return { size, color: styles[cleDEtat(ICONE_PAR_VARIANT[variant], { disabled, actif: hovered })].color };
};

/** Les rayons, la bordure et l'anneau de focus : tout ce qui se pose sur le Pressable. */
export const styleDuPressable = (styles: Styles, etat: EtatDuBouton, state: { hovered: boolean; focus: boolean }) => {
  const { variant, selected, disabled, taille, iconeSeule, borderNone, fullWidth } = etat;
  // `sm` est la seule taille qui redefinit ses rayons ; les deux autres gardent ceux du conteneur.
  const source = taille === 'sm' ? styles.smContainer : styles.container;
  // Sans hauteur posee ici, le Pressable s'auto-dimensionnait autour du Box interieur : une
  // variante bordee (secondary, danger) devenait alors plus haute qu'une variante pleine, la
  // bordure s'ajoutant au-dela des 32/28/40 px voulus. boxSizing absorbe la bordure dans cette
  // hauteur au lieu de l'ajouter par-dessus.
  const hauteur = styles[HAUTEUR_PAR_TAILLE[taille]].height;
  const rayons = borderNone
    ? SANS_RAYON
    : {
        borderTopLeftRadius: source.borderTopLeftRadius,
        borderBottomLeftRadius: source.borderBottomLeftRadius,
        borderTopRightRadius: source.borderTopRightRadius,
        borderBottomRightRadius: source.borderBottomRightRadius,
      };

  const bordure = (borderColor: string) => ({ borderWidth: 1, borderStyle: 'solid' as const, borderColor });
  const etats = BORDURE_PAR_VARIANT[variant];
  const contour = selected
    ? bordure(styles.selectedContainer.borderColor)
    : etats
      ? bordure(styles[cleDEtat(etats, { disabled, actif: state.hovered })].borderColor)
      : {};

  return {
    height: hauteur,
    // Icone seule : carre, donc la meme valeur sert de largeur.
    ...(iconeSeule ? { width: hauteur } : {}),
    boxSizing: 'border-box' as const,
    ...rayons,
    ...contour,
    overflow: 'hidden' as const,
    ...(fullWidth ? { width: '100%' as const } : {}),
    ...(state.focus ? focusRing('default') : {}),
  };
};
