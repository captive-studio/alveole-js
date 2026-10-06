import { ButtonProps } from './Button.types';

/**
 * Ce que le spinner remplace, car il ne s'ajoute jamais : c'est ainsi que le bouton garde sa
 * largeur, regle commune a Primer, Atlassian et Base.
 *
 * L'ordre est celui de Primer : le contenu de tete d'abord, le contenu de fin sinon, et faute des
 * deux le libelle lui-meme - qui reste alors dans le flux en `visibility: hidden`, pour
 * continuer d'imposer sa largeur pendant que le spinner se centre par-dessus.
 */
export const placeDuSpinner = (
  visible: boolean,
  leading?: ButtonProps['leading'],
  trailing?: ButtonProps['trailing'],
): 'tete' | 'fin' | 'libelle' | null => {
  if (!visible) return null;
  if (leading) return 'tete';
  if (trailing) return 'fin';

  return 'libelle';
};
