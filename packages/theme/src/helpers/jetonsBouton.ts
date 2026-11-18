import type { Theme } from '../type';

export type VarianteBouton = 'primary' | 'secondary' | 'tertiary' | 'danger';
export type TailleBouton = 'sm' | 'md' | 'lg';

/**
 * Les jetons d'un bouton au repos, par variante et par taille : la seule correspondance
 * variante -> jetons, lue par le Button de `@alveole/components` comme par celui de
 * `@alveole/email`. Survol, appui et desactivation restent propres au composant interactif.
 */
export const jetonsBouton = ({ color, control, radius, text }: Theme) => ({
  variantes: {
    primary: {
      fond: color.light.background['action-high-primary'],
      texte: color.light.text['inverted-primary'],
      bordure: 'transparent',
    },
    secondary: {
      fond: color.light.background['default-grey'],
      texte: color.light.text['action-high-grey'],
      bordure: color.light.border['default-grey'],
    },
    tertiary: { fond: undefined, texte: color.light.text['action-high-grey'], bordure: 'transparent' },
    danger: {
      fond: color.light.background['action-high-error'],
      texte: color.light.text['inverted-grey'],
      bordure: color.light.border['plain-error'],
    },
  },
  tailles: {
    sm: { ...control('sm'), rayon: radius('sm'), typo: text['Corps de texte'].SM.Medium },
    md: { ...control('md'), rayon: radius('md'), typo: text['Corps de texte'].SM.Medium },
    lg: { ...control('lg'), rayon: radius('md'), typo: text['Corps de texte'].MD.Medium },
  },
});
