import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import CodeHighlighter from 'react-native-code-highlighter';
import { Prism } from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { jsx as _jsx } from 'react/jsx-runtime';
import { useStyles } from './Highlight.styles';
const BASE_STYLE_KEY = 'base';
const getNativeStyle = (style = {}) => {
  const nativeStyle = {};
  if (typeof style.color === 'string') nativeStyle.color = style.color;
  if (typeof style.background === 'string') nativeStyle.backgroundColor = style.background;
  if (typeof style.backgroundColor === 'string') nativeStyle.backgroundColor = style.backgroundColor;
  if (style.fontWeight != null) nativeStyle.fontWeight = style.fontWeight;
  if (style.fontStyle != null) nativeStyle.fontStyle = style.fontStyle;
  return nativeStyle;
};
const getSyntaxStyleKeys = selector => {
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
const getNativeSyntaxStyle = syntaxStyle => {
  return Object.entries(syntaxStyle).reduce((acc, [selector, tokenStyle]) => {
    for (const key of getSyntaxStyleKeys(selector)) {
      acc[key] = { ...acc[key], ...getNativeStyle(tokenStyle) };
    }
    return acc;
  }, {});
};
const trimEdgeNewlines = value => value.replace(/^\n+|\n+$/g, '');
const PrismCodeHighlighter = ({ children, language, style }) => {
  const styles = useStyles();
  const stylesheet = React.useMemo(() => getNativeSyntaxStyle(vscDarkPlus), []);
  const customStyle = React.useMemo(() => getNativeStyle(style), [style]);
  const baseTextStyle = StyleSheet.flatten([{ color: stylesheet[BASE_STYLE_KEY]?.color }, stylesheet[BASE_STYLE_KEY]]);
  const getStylesForNode = node => {
    const classes = node.properties?.className ?? [];
    return classes.map(className => stylesheet[String(className)]).filter(Boolean);
  };
  const renderNode = (nodes, keyPrefix = 'row') =>
    nodes.reduce((acc, node, index) => {
      const keyPrefixWithIndex = `${keyPrefix}_${index}`;
      if (node.children) {
        const textStyle = StyleSheet.flatten([baseTextStyle, getStylesForNode(node)]);
        acc.push(
          _jsx(
            Text,
            { style: textStyle, children: renderNode(node.children, `${keyPrefixWithIndex}_child`) },
            keyPrefixWithIndex,
          ),
        );
      }
      if (node.value) {
        acc.push(trimEdgeNewlines(String(node.value)));
      }
      return acc;
    }, []);
  const renderer = ({ rows }) =>
    _jsx(ScrollView, {
      horizontal: true,
      contentContainerStyle: [styles.highlight, stylesheet[BASE_STYLE_KEY], customStyle],
      children: _jsx(View, { onStartShouldSetResponder: () => true, children: renderNode(rows) }),
    });
  return _jsx(Prism, {
    CodeTag: View,
    PreTag: View,
    customStyle: {},
    language: language,
    renderer: renderer,
    style: {},
    wrapLongLines: true,
    children: children,
  });
};
export const Highlight = props => {
  const { children, language, style } = props;
  const styles = useStyles();
  if (language === 'tsx') {
    return _jsx(PrismCodeHighlighter, { ...props });
  }
  return _jsx(CodeHighlighter, {
    hljsStyle: { ...monokai },
    customStyle: { ...styles.highlight, ...style, width: '100%', padding: 0 },
    containerStyle: { ...styles.highlight },
    language: language,
    wrapLongLines: true,
    children: children,
  });
};
