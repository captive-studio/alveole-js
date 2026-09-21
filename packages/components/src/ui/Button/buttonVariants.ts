import { StyleValue } from '@alveole/theme';
import { useStyles } from './Button.styles';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'link';
export type ButtonTaille = 'sm' | 'md' | 'lg';

export type Styles = ReturnType<typeof useStyles>;
export type StyleKey = keyof Styles;

/** Styles porteurs d'une couleur, seuls utilisables pour teinter une icone. */
export type StyleCouleurKey = { [K in StyleKey]: Styles[K] extends { color: string } ? K : never }[StyleKey];

/** Styles porteurs d'une couleur de bordure visible, pour `secondary` et `danger`. */
export type StyleBordureKey = { [K in StyleKey]: Styles[K] extends { borderColor: string } ? K : never }[StyleKey];

export type StyleHauteurKey = { [K in StyleKey]: Styles[K] extends { height: number } ? K : never }[StyleKey];

/** Les trois etats qu'une variante distingue, quel que soit l'aspect qu'on teinte. */
export type EtatVisuel<K = StyleKey> = { repos: K; desactive: K; actif: K };
export type EtatCouleur = EtatVisuel<StyleCouleurKey>;
export type EtatBordure = EtatVisuel<StyleBordureKey>;

/**
 * La seule regle de priorite entre etats du dossier : desactive d'abord, puis actif, sinon
 * repos. Elle etait recopiee a chaque aspect teinte - fond, libelle, icone, bordure - et
 * dans les deux composants, soit huit fois la meme decision.
 */
export const cleDEtat = <K>(
  table: EtatVisuel<K>,
  { disabled, actif }: { disabled?: boolean | null; actif?: boolean | null },
) => (disabled ? table.desactive : actif ? table.actif : table.repos);

/**
 * Indexer `styles` par une cle prise dans toute l'union fait renoncer TypeScript (TS2590) :
 * le type produit est trop large pour etre represente. `StyleValue` est le type que
 * `makeStyles` donne deja a chacune de ses entrees, donc le declarer ici n'elargit rien : ca
 * aplatit l'union au point d'acces. Les deux composants y arrivaient avant en typant leurs
 * accumulateurs `any`.
 */
export const styleDe = (styles: Styles, cle: StyleKey): StyleValue => styles[cle];

/** Le conteneur change de famille de styles selon que le bouton porte un libelle ou non. */
export const HAUTEUR_PAR_TAILLE: Record<ButtonTaille, StyleHauteurKey> = {
  sm: 'hauteurSm',
  md: 'hauteurMd',
  lg: 'hauteurLg',
};

export const CONTENEUR_PAR_TAILLE: Record<ButtonTaille, StyleKey> = {
  sm: 'smContainer',
  md: 'mdContainer',
  lg: 'lgContainer',
};

export const TITRE_PAR_TAILLE: Record<ButtonTaille, StyleKey> = {
  sm: 'smTitle',
  md: 'mdTitle',
  lg: 'lgTitle',
};

/** `link` n'a pas de style desactive propre et emprunte celui de `tertiary`. */
export const CONTENEUR_PAR_VARIANT: Record<ButtonVariant, EtatVisuel> = {
  primary: { repos: 'primaryContainer', desactive: 'primaryContainerDisabled', actif: 'primaryContainerPressed' },
  secondary: {
    repos: 'secondaryContainer',
    desactive: 'secondaryContainerDisabled',
    actif: 'secondaryContainerPressed',
  },
  tertiary: { repos: 'tertiaryContainer', desactive: 'tertiaryContainerDisabled', actif: 'tertiaryContainerPressed' },
  danger: { repos: 'dangerContainer', desactive: 'dangerContainerDisabled', actif: 'dangerContainerPressed' },
  link: { repos: 'linkContainer', desactive: 'tertiaryContainerDisabled', actif: 'linkContainerPressed' },
};

export const BORDURE_PAR_VARIANT: Partial<Record<ButtonVariant, EtatBordure>> = {
  secondary: {
    repos: 'secondaryContainer',
    desactive: 'secondaryContainerDisabled',
    actif: 'secondaryContainerHover',
  },
  danger: { repos: 'dangerContainer', desactive: 'dangerContainerDisabled', actif: 'dangerContainerHover' },
};

export const SURVOL_PAR_VARIANT: Record<ButtonVariant, StyleKey> = {
  primary: 'primaryContainerHover',
  secondary: 'secondaryContainerHover',
  tertiary: 'tertiaryContainerHover',
  danger: 'dangerContainerHover',
  link: 'linkContainerHover',
};

export const TEXTE_PAR_VARIANT: Record<ButtonVariant, EtatVisuel> = {
  primary: { repos: 'primaryTitle', desactive: 'primaryTitleDisabled', actif: 'primaryTitleHover' },
  secondary: { repos: 'secondaryTitle', desactive: 'secondaryTitleDisabled', actif: 'secondaryTitleHover' },
  tertiary: { repos: 'tertiaryTitle', desactive: 'tertiaryTitleDisabled', actif: 'tertiaryTitleHover' },
  danger: { repos: 'dangerTitle', desactive: 'dangerTitleDisabled', actif: 'dangerTitleHover' },
  link: { repos: 'linkTitle', desactive: 'tertiaryTitleDisabled', actif: 'linkTitleHover' },
};

export const ICONE_PAR_VARIANT: Record<ButtonVariant, EtatCouleur> = {
  primary: { repos: 'primaryIcon', desactive: 'primaryIconDisabled', actif: 'primaryIconHover' },
  secondary: { repos: 'secondaryIcon', desactive: 'secondaryIconDisabled', actif: 'secondaryIconHover' },
  tertiary: { repos: 'tertiaryIcon', desactive: 'tertiaryIconDisabled', actif: 'tertiaryIconHover' },
  danger: { repos: 'dangerIcon', desactive: 'dangerIconDisabled', actif: 'dangerIconHover' },
  link: { repos: 'linkIcon', desactive: 'linkIconDisabled', actif: 'linkTitleHover' },
};
