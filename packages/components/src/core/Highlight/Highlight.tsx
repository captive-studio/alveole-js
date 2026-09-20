import React, { CSSProperties, ReactNode } from 'react';
import { ScrollView, StyleSheet, Text, TextStyle, View } from 'react-native';
// Le type est importé en `import type` : il est effacé à l'exécution, donc l'index du
// paquet, qui charge aussi toute la moitié highlight.js, n'est jamais évalué.
import { CustomPalette, focusRingProps, MonospaceFont, withMinimumContrast } from '@alveole/theme';
import type { SyntaxHighlighterProps } from 'react-syntax-highlighter';
import { ghcolors } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useStyles } from './Highlight.styles';
import Prism from './Highlight.syntax';

export type HighlightProps = Pick<SyntaxHighlighterProps, 'children'> & {
  language: 'json' | 'typescript' | 'tsx' | 'ruby' | 'bash' | 'plaintext' | 'html';
  style?: CSSProperties;
  /**
   * `standalone` : le bloc se délimite lui-même, quelle que soit la surface derrière lui.
   * `embedded` : il est composé dans un cadre qui le délimite déjà, et renonce au sien pour
   * ne pas emboîter deux bordures. Voir docs/adr/0011.
   */
  variant?: 'standalone' | 'embedded';
};

type RendererProps = Parameters<NonNullable<SyntaxHighlighterProps['renderer']>>[0];
type RendererNode = RendererProps['rows'][number];
type NativeSyntaxStyle = Record<string, TextStyle>;

const BASE_STYLE_KEY = 'base';

const getNativeStyle = (style: CSSProperties = {}): TextStyle => {
  const nativeStyle: TextStyle = {};

  if (typeof style.color === 'string') nativeStyle.color = style.color;
  if (typeof style.background === 'string') nativeStyle.backgroundColor = style.background;
  if (typeof style.backgroundColor === 'string') nativeStyle.backgroundColor = style.backgroundColor;
  if (style.fontWeight != null) nativeStyle.fontWeight = style.fontWeight as TextStyle['fontWeight'];
  if (style.fontStyle != null) nativeStyle.fontStyle = style.fontStyle as TextStyle['fontStyle'];

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
  const { backgroundColor: _surfaceDuTheme, ...textStyle } = getNativeStyle(tokenStyle);

  return textStyle;
};

/** Le seuil WCAG AA pour du texte de taille courante. */
const SEUIL_DE_CONTRASTE = 4.5;

// Les palettes de coloration sont écrites pour des éditeurs, pas pour WCAG : celle retenue
// descendait à 2,56 sur les noms de propriétés, contre 4,5 exigés. Chaque teinte est ramenée
// au seuil sur la surface du bloc, ce qui reste vrai si l'on change de thème un jour.
const getNativeSyntaxStyle = (syntaxStyle: Record<string, CSSProperties>, fond: string): NativeSyntaxStyle => {
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

const trimEdgeNewlines = (value: string) => value.replace(/^\n+|\n+$/g, '');

export const Highlight = ({ children, language, style, variant = 'standalone' }: HighlightProps) => {
  const styles = useStyles();
  const surface = variant === 'embedded' ? styles.highlightEmbedded : styles.highlight;

  // La valeur, pas la variable CSS que le thème rend sur le web : le calcul de contraste a
  // besoin d'une couleur lisible, et `useTheme` renvoie ici `var(--background-alt-grey)`.
  const fondDuBloc = CustomPalette.light.background['alt-grey'];
  const stylesheet = React.useMemo(() => getNativeSyntaxStyle(ghcolors, fondDuBloc), [fondDuBloc]);
  const customStyle = React.useMemo(() => getNativeStyle(style), [style]);
  const baseTextStyle = StyleSheet.flatten([
    { color: stylesheet[BASE_STYLE_KEY]?.color },
    stylesheet[BASE_STYLE_KEY],
    MonospaceFont,
  ]);

  const getStylesForNode = (node: RendererNode): TextStyle[] => {
    const classes = node.properties?.className ?? [];

    return classes.map(className => stylesheet[String(className)]).filter(Boolean);
  };

  const renderNode = (nodes: RendererNode[], keyPrefix = 'row'): ReactNode[] =>
    nodes.reduce<ReactNode[]>((acc, node, index) => {
      const keyPrefixWithIndex = `${keyPrefix}_${index}`;

      if (node.children) {
        const textStyle = StyleSheet.flatten([baseTextStyle, getStylesForNode(node)]);

        acc.push(
          <Text key={keyPrefixWithIndex} style={textStyle}>
            {renderNode(node.children, `${keyPrefixWithIndex}_child`)}
          </Text>,
        );
      }

      if (node.value) {
        acc.push(trimEdgeNewlines(String(node.value)));
      }

      return acc;
    }, []);

  const renderer = ({ rows }: RendererProps) => (
    // Un extrait plus large que sa colonne défile horizontalement. Sans point d'arrêt au
    // clavier, la fin de la ligne n'est atteignable qu'à la souris : c'est la règle
    // `scrollable-region-focusable` d'axe. Le cas s'est révélé quand la colonne de navigation
    // du catalogue a rétréci la zone de contenu, mais le défaut lui préexistait.
    <ScrollView
      horizontal
      focusable
      // La zone est focalisable exprès (cf. ci-dessus) : elle doit donc montrer la bague du
      // kit, et non le contour par defaut du navigateur.
      {...focusRingProps()}
      // `styles.highlight` pose `overflow: scroll`, ce qui ferait défiler le conteneur de
      // contenu en doublon du `ScrollView` qui l'entoure. C'est ce doublon intérieur qu'axe
      // signalait : il défile sans pouvoir recevoir le focus, que porte l'extérieur.
      // Le thème de coloration ne fournit que les couleurs de jetons : la surface vient du
      // design system, donc `styles.highlight` est posé après la base du thème.
      contentContainerStyle={[stylesheet[BASE_STYLE_KEY], surface, { overflow: 'visible' }, customStyle]}
    >
      <View onStartShouldSetResponder={() => true}>{renderNode(rows)}</View>
    </ScrollView>
  );

  return (
    <Prism
      CodeTag={View}
      PreTag={View}
      customStyle={{}}
      language={language}
      renderer={renderer}
      style={{}}
      wrapLongLines
    >
      {children}
    </Prism>
  );
};
