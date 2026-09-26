import { MonospaceFont, withMinimumContrast } from '@alveole/theme';
import { CSSProperties } from 'react';
import { StyleSheet, TextStyle } from 'react-native';
import { useStyles } from './Highlight.styles';

type Styles = ReturnType<typeof useStyles>;

export type NativeSyntaxStyle = Record<string, TextStyle>;

export const BASE_STYLE_KEY = 'base';

// Le CSS du theme de coloration admet des valeurs que React Native refuse (`oblique`,
// `bolder`...) : seules les valeurs que le natif connait lui sont transmises.
const accepteSeulement =
  <Natif>(valeursNatives: readonly Natif[]) =>
  (valeur: unknown): valeur is Natif =>
    valeursNatives.some(valeurNative => valeurNative === valeur);

const estStyleDePoliceNatif = accepteSeulement<TextStyle['fontStyle']>(['normal', 'italic']);

const estGraisseNative = accepteSeulement<TextStyle['fontWeight']>([
  'normal',
  'bold',
  100,
  200,
  300,
  400,
  500,
  600,
  700,
  800,
  900,
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
]);

export const styleNatif = (style: CSSProperties = {}): TextStyle => {
  const nativeStyle: TextStyle = {};

  if (typeof style.color === 'string') nativeStyle.color = style.color;
  if (typeof style.background === 'string') nativeStyle.backgroundColor = style.background;
  if (typeof style.backgroundColor === 'string') nativeStyle.backgroundColor = style.backgroundColor;
  if (estGraisseNative(style.fontWeight)) nativeStyle.fontWeight = style.fontWeight;
  if (estStyleDePoliceNatif(style.fontStyle)) nativeStyle.fontStyle = style.fontStyle;

  return nativeStyle;
};

const getSyntaxStyleKeys = (selector: string): string[] => {
  if (selector.includes('pre[') || selector.includes('code[')) {
    return [BASE_STYLE_KEY];
  }

  return selector
    .split(/[\s>,]+/)
    .flatMap(part =>
      part
        .replace(/^\.token\./, '')
        .replace(/^\./, '')
        .split('.'),
    )
    .map(part => part.replace(/^token-/, ''))
    .filter(Boolean);
};

// Le thème de coloration ne fournit que des couleurs de texte : les surfaces qu'il déclare
// sur ses jetons sont écartées ici. Sans ça, chaque thème impose ses propres surlignages,
// qui varient d'un thème à l'autre et recouvrent le fond posé par le design system.
const getSyntaxTextStyle = (tokenStyle: CSSProperties): TextStyle => {
  const { backgroundColor: _surfaceDuTheme, ...textStyle } = styleNatif(tokenStyle);

  return textStyle;
};

/** Le seuil WCAG AA pour du texte de taille courante. */
const SEUIL_DE_CONTRASTE = 4.5;

// Les palettes de coloration sont écrites pour des éditeurs, pas pour WCAG : celle retenue
// descendait à 2,56 sur les noms de propriétés, contre 4,5 exigés. Chaque teinte est ramenée
// au seuil sur la surface du bloc, ce qui reste vrai si l'on change de thème un jour.
export const feuilleDeColoration = (syntaxStyle: Record<string, CSSProperties>, fond: string): NativeSyntaxStyle => {
  return Object.entries(syntaxStyle).reduce<NativeSyntaxStyle>((acc, [selector, tokenStyle]) => {
    const style = getSyntaxTextStyle(tokenStyle);
    // `getSyntaxTextStyle` ne retient une couleur que si le thème l'a donnée en chaîne : le
    // type large de React Native ne le sait pas, d'où la vérification.
    const lisible =
      typeof style.color === 'string'
        ? { ...style, color: withMinimumContrast(style.color, fond, SEUIL_DE_CONTRASTE) }
        : style;

    for (const key of getSyntaxStyleKeys(selector)) {
      acc[key] = { ...acc[key], ...lisible };
    }

    return acc;
  }, {});
};

/** Le texte de base : la couleur du theme, puis la chasse fixe. */
export const styleDuTexteDeBase = (feuille: NativeSyntaxStyle) =>
  StyleSheet.flatten([{ color: feuille[BASE_STYLE_KEY]?.color }, feuille[BASE_STYLE_KEY], MonospaceFont]);

/**
 * La surface du bloc. Le theme de coloration ne fournit que les couleurs de jetons : la surface
 * vient du design system, posee apres la base du theme, et le style de l'appelant en dernier.
 * `styles.highlight` pose `overflow: scroll`, que le `ScrollView` qui l'entoure rend inutile :
 * ce doublon interieur defilait sans pouvoir recevoir le focus (regle axe).
 */
export const styleDeLaSurface = (
  styles: Styles,
  feuille: NativeSyntaxStyle,
  { variant, styleFourni }: { variant: 'standalone' | 'embedded'; styleFourni: TextStyle },
) =>
  StyleSheet.flatten<TextStyle>([
    feuille[BASE_STYLE_KEY],
    variant === 'embedded' ? styles.highlightEmbedded : styles.highlight,
    { overflow: 'visible' as const },
    styleFourni,
  ]);
