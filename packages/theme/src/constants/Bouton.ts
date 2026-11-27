import type { CustomPalette } from './Palette';

type Clair = (typeof CustomPalette)['light'];

/** Les cles de jetons d'un etat de bouton : la couleur elle-meme se lit dans la palette du theme. */
export type CouleursDEtatDeBouton = {
  fond?: keyof Clair['background'];
  texte: keyof Clair['text'];
  bordure?: keyof Clair['border'];
};

/**
 * La correspondance variante -> jetons du bouton, au repos et desactive, en donnees pures. Le
 * Button de `@alveole/components` et celui de `@alveole/email` la lisent tous deux : elle n'est
 * ecrite qu'ici. Survol et appui restent propres au composant interactif.
 */
export const variantesDeBouton = {
  primary: {
    repos: { fond: 'action-high-primary', texte: 'inverted-primary' },
    desactive: { fond: 'disabled-grey', texte: 'disabled-grey' },
  },
  secondary: {
    repos: { fond: 'default-grey', texte: 'action-high-grey', bordure: 'default-grey' },
    desactive: { texte: 'disabled-grey', bordure: 'disabled-grey' },
  },
  tertiary: {
    repos: { texte: 'action-high-grey' },
    desactive: { texte: 'disabled-grey' },
  },
  danger: {
    repos: { fond: 'action-high-error', texte: 'inverted-grey', bordure: 'plain-error' },
    desactive: { fond: 'default-grey', texte: 'disabled-grey', bordure: 'disabled-grey' },
  },
} as const satisfies Record<string, Record<'repos' | 'desactive', CouleursDEtatDeBouton>>;

export type VarianteBouton = keyof typeof variantesDeBouton;

/** Par taille : la dimension de controle, le rayon et le cran du libelle (`Corps de texte`). */
export const taillesDeBouton = {
  sm: { controle: 'sm', rayon: 'sm', cran: 'SM' },
  md: { controle: 'md', rayon: 'md', cran: 'SM' },
  lg: { controle: 'lg', rayon: 'md', cran: 'MD' },
} as const;

export type TailleBouton = keyof typeof taillesDeBouton;
