import { isValidElement, ReactElement } from 'react';
import { IconName, IconProps, tailleDesIcones } from '../LucideIcon';

/**
 * Le contenu de tête (ou de fin) d'un composant : le nom d'une icône, cas de neuf appels sur
 * dix, ou un élément quelconque - avatar, logo de réseau social. `null` le retire, y compris
 * quand le composant en pose un par défaut (voir ADR 0028).
 */
export type Leading = IconName | ReactElement | null;

export type LeadingResolu = { type: 'icone'; nom: IconName } | { type: 'element'; element: ReactElement } | null;

export const resoudreLeading = (leading: Leading | undefined): LeadingResolu => {
  if (leading == null) return null;
  if (typeof leading === 'string') return { type: 'icone', nom: leading };
  if (isValidElement(leading)) return { type: 'element', element: leading };

  return null;
};

/** La largeur de l'emplacement : celle de l'icône qu'il aurait reçue, pour que rien ne bouge. */
export const tailleDeLEmplacement = (taille: IconProps['size']): number => tailleDesIcones[taille];
