import { taillesDeBouton, variantesDeBouton, type TailleBouton, type VarianteBouton } from '../constants/Bouton';
import type { Theme } from '../type';

/**
 * Les couleurs d'un etat de bouton, lues dans la palette du theme recu (variables CSS ou
 * valeurs brutes). Fond et bordure absents de la table valent `transparent`.
 */
export const couleursDeBouton = (
  { color }: Pick<Theme, 'color'>,
  variante: VarianteBouton,
  etat: 'repos' | 'desactive',
) => {
  const { fond, texte, bordure } = { fond: undefined, bordure: undefined, ...variantesDeBouton[variante][etat] };
  return {
    fond: fond ? color.light.background[fond] : 'transparent',
    texte: color.light.text[texte],
    bordure: bordure ? color.light.border[bordure] : 'transparent',
  };
};

/** Les dimensions d'une taille de bouton dans le theme recu : controle, rayon et libelle. */
export const dimensionsDeBouton = ({ control, radius, text }: Theme, taille: TailleBouton) => {
  const { controle, rayon, cran } = taillesDeBouton[taille];
  return { ...control(controle), rayon: radius(rayon), typo: text['Corps de texte'][cran].Medium };
};
