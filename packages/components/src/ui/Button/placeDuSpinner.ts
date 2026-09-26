import { ButtonProps } from './Button.types';

/**
 * Ce que le spinner remplace, car il ne s'ajoute jamais : c'est ainsi que le bouton garde sa
 * largeur, regle commune a Primer, Atlassian et Base.
 *
 * L'ordre est celui de Primer : l'icone de tete d'abord, l'icone de fin sinon, et faute des
 * deux le libelle lui-meme - qui reste alors dans le flux en `visibility: hidden`, pour
 * continuer d'imposer sa largeur pendant que le spinner se centre par-dessus.
 */
export const placeDuSpinner = (
  visible: boolean,
  startIcon?: ButtonProps['startIcon'],
  endIcon?: ButtonProps['endIcon'],
): 'tete' | 'fin' | 'libelle' | null => {
  if (!visible) return null;
  if (startIcon) return 'tete';
  if (endIcon) return 'fin';

  return 'libelle';
};
