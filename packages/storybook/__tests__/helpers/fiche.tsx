import { Typography } from '@alveole/components';
import { StorybookModule } from '../../src/types';

/** Une fiche minimale : un titre, une phrase, un lien Figma, un exemple. */
export const fiche = {
  default: {
    title: 'Bouton',
    tags: ['Composant'],
    experimental: false,
    description: 'Un bouton.',
    figmaURL: 'https://figma.com/fiche',
    styleFn: () => ({}),
  },
  Tailles: () => <Typography>Trois tailles</Typography>,
} as unknown as StorybookModule;

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

/** La rangee qui porte un badge : un `Tag` est une boite autour de son texte. */
export const rangeeDuBadge = (badge: HTMLElement) => badge.parentElement!.parentElement!;

/** Ce qui separe deux elements de la page : leur premier ancetre commun. */
export const separationEntre = (premier: HTMLElement, second: HTMLElement) => {
  for (let courant = premier.parentElement; courant; courant = courant.parentElement) {
    if (courant.contains(second)) return window.getComputedStyle(courant);
  }

  throw new Error('aucun ancetre commun');
};
