import React, { CSSProperties, ReactNode } from 'react';
import { ScrollView, StyleSheet, Text, TextStyle, View } from 'react-native';
import CodeHighlighter from 'react-native-code-highlighter';
import { Prism, SyntaxHighlighterProps } from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useStyles } from './Highlight.styles';

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

const getNativeSyntaxStyle = (syntaxStyle: Record<string, CSSProperties>): NativeSyntaxStyle => {
  return Object.entries(syntaxStyle).reduce<NativeSyntaxStyle>((acc, [selector, tokenStyle]) => {
    for (const key of getSyntaxStyleKeys(selector)) {
      acc[key] = { ...acc[key], ...getNativeStyle(tokenStyle) };
    }

    return acc;
  }, {});
};

const trimEdgeNewlines = (value: string) => value.replace(/^\n+|\n+$/g, '');

const PrismCodeHighlighter = ({ children, language, style }: HighlightProps) => {
  const styles = useStyles();
  const stylesheet = React.useMemo(() => getNativeSyntaxStyle(vscDarkPlus), []);
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
    <ScrollView horizontal contentContainerStyle={[styles.highlight, stylesheet[BASE_STYLE_KEY], customStyle]}>
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

export const Highlight = (props: HighlightProps) => {
  const { children, language, style } = props;

  const styles = useStyles();

  if (language === 'tsx') {
    return <PrismCodeHighlighter {...props} />;
  }

  return (
    <CodeHighlighter
      hljsStyle={{ ...monokai }}
      customStyle={{ ...styles.highlight, ...style, width: '100%', padding: 0 }}
      containerStyle={{ ...styles.highlight }}
      language={language}
      wrapLongLines
    >
      {children}
    </CodeHighlighter>
  );
};
