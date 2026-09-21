import { Typography } from '@alveole/components';
import { StorybookModule } from '../../src/types';

/** Une fiche minimale : un titre, une phrase, un lien Figma, un exemple. */
export const fiche: StorybookModule = {
  default: {
    title: 'Bouton',
    tags: ['Composant'],
    experimental: false,
    description: 'Un bouton.',
    figmaURL: 'https://figma.com/fiche',
    styleFn: () => ({}),
  },
  Tailles: () => <Typography>Trois tailles</Typography>,
};

const aUneBordure = (element: HTMLElement) => {
  const largeur = window.getComputedStyle(element).borderTopWidth;

  return largeur !== '' && largeur !== '0px' && largeur !== 'medium';
};

/** Les cadres qui entourent un element, du plus proche au plus lointain. */
export const cadresAutourDe = (element: HTMLElement | null) => {
  const cadres: HTMLElement[] = [];

  for (let courant = element?.parentElement ?? null; courant; courant = courant.parentElement) {
    if (aUneBordure(courant)) cadres.push(courant);
  }

  return cadres;
};

/**
 * La rangee qui porte un badge. On remonte jusqu'a l'etiquette elle-meme avant de prendre
 * son parent : compter les niveaux depuis le texte ferait dependre ce helper de la
 * structure interne du `Tag`, qui gagne des enveloppes quand le composant evolue.
 */
export const rangeeDuBadge = (badge: HTMLElement) => badge.closest('tag')!.parentElement!;

/** Ce qui separe deux elements de la page : leur premier ancetre commun. */
export const separationEntre = (premier: HTMLElement, second: HTMLElement) => {
  for (let courant = premier.parentElement; courant; courant = courant.parentElement) {
    if (courant.contains(second)) return window.getComputedStyle(courant);
  }

  throw new Error('aucun ancetre commun');
};
