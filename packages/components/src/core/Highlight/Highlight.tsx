// La déclaration du thème importé par fichier est portée par une référence explicite, et
// non par le `include` du tsconfig : `@alveole/storybook` et `@alveole/docs` compilent ces
// sources depuis leur propre projet, où ce `include` ne s'applique pas.
/// <reference path="./a11y-one-light.d.ts" />
import React, { CSSProperties, ReactNode } from 'react';
import { ScrollView, StyleSheet, Text, TextStyle, View } from 'react-native';
import type { SyntaxHighlighterProps } from 'react-syntax-highlighter';
// Importé par son fichier : l'index des thèmes Prism ne ré-exporte que `a11yDark`.
import a11yOneLight from 'react-syntax-highlighter/dist/esm/styles/prism/a11y-one-light.js';
import { useStyles } from './Highlight.styles';
import Prism from './Highlight.syntax';

export type HighlightProps = Pick<SyntaxHighlighterProps, 'children'> & {
  language: 'json' | 'typescript' | 'tsx' | 'ruby' | 'bash' | 'plaintext' | 'html';
  style?: CSSProperties;
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

const getNativeSyntaxStyle = (syntaxStyle: Record<string, CSSProperties>): NativeSyntaxStyle => {
  return Object.entries(syntaxStyle).reduce<NativeSyntaxStyle>((acc, [selector, tokenStyle]) => {
    for (const key of getSyntaxStyleKeys(selector)) {
      acc[key] = { ...acc[key], ...getSyntaxTextStyle(tokenStyle) };
    }

    return acc;
  }, {});
};

const trimEdgeNewlines = (value: string) => value.replace(/^\n+|\n+$/g, '');

export const Highlight = ({ children, language, style }: HighlightProps) => {
  const styles = useStyles();
  const stylesheet = React.useMemo(() => getNativeSyntaxStyle(a11yOneLight), []);
  const customStyle = React.useMemo(() => getNativeStyle(style), [style]);
  const baseTextStyle = StyleSheet.flatten([{ color: stylesheet[BASE_STYLE_KEY]?.color }, stylesheet[BASE_STYLE_KEY]]);

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
      // `styles.highlight` pose `overflow: scroll`, ce qui ferait défiler le conteneur de
      // contenu en doublon du `ScrollView` qui l'entoure. C'est ce doublon intérieur qu'axe
      // signalait : il défile sans pouvoir recevoir le focus, que porte l'extérieur.
      // Le thème de coloration ne fournit que les couleurs de jetons : la surface vient du
      // design system, donc `styles.highlight` est posé après la base du thème.
      contentContainerStyle={[stylesheet[BASE_STYLE_KEY], styles.highlight, { overflow: 'visible' }, customStyle]}
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
