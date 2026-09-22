import { FOCUS_ATTRIBUTE, Theme } from '@alveole/theme';
import React from 'react';
import type { Components } from 'react-markdown';
import { TextStyle as RNTextStyle, Text } from 'react-native';
import { Box } from '../Box';
import { Code } from '../Code';
import { Highlight, HighlightProps } from '../Highlight';
import { Typography } from '../Typography';

const HIGHLIGHT_LANGUAGES: HighlightProps['language'][] = [
  'json',
  'typescript',
  'tsx',
  'ruby',
  'bash',
  'html',
  'plaintext',
];

export const extractLanguage = (className?: string): HighlightProps['language'] => {
  const match = /language-(\w+)/.exec(className ?? '');
  return HIGHLIGHT_LANGUAGES.find(l => l === match?.[1]) ?? 'plaintext';
};

type AvecEnfants = { children?: React.ReactNode };
type TextStyle = Pick<RNTextStyle, 'fontSize' | 'lineHeight' | 'fontWeight' | 'fontFamily' | 'letterSpacing'>;

type MarkdownComponentsStyles = {
  bodyStyle: TextStyle;
  boldStyle: TextStyle;
  /** Couleur du texte courant, hors titres et liens. Vide garde le gris par defaut. */
  textColor?: string;
  titres: Theme['text']['Titres'];
  borderColor: string;
  headerBg: string;
  linkColor: string;
  linkStyle: { textDecoration: 'underline' };
  linkHoverStyle: { textDecoration: 'none' };
};

type TextComponentStyles = Pick<MarkdownComponentsStyles, 'bodyStyle' | 'boldStyle' | 'textColor'>;

const createTextComponents = ({ bodyStyle, boldStyle, textColor }: TextComponentStyles) => ({
  p: ({ children: c }: AvecEnfants) => (
    <Typography style={bodyStyle} color={textColor}>
      {c}
    </Typography>
  ),
  strong: ({ children: c }: AvecEnfants) => <Text style={boldStyle}>{c}</Text>,
  em: ({ children: c }: AvecEnfants) => <Text style={[bodyStyle, { fontStyle: 'italic' as const }]}>{c}</Text>,
});

const createHeadingComponents = (titres: Theme['text']['Titres']): Components => ({
  h1: ({ children: c }: AvecEnfants) => <Typography style={titres['H3 - MD']}>{c}</Typography>,
  h2: ({ children: c }: AvecEnfants) => <Typography style={titres['H4 - SM']}>{c}</Typography>,
  h3: ({ children: c }: AvecEnfants) => <Typography style={titres['H5 - XS']}>{c}</Typography>,
  h4: ({ children: c }: AvecEnfants) => <Typography style={titres['H6 - XXS']}>{c}</Typography>,
});

const createListComponents = (bodyStyle: TextStyle): Components => ({
  ul: ({ children: c }: AvecEnfants) => (
    <Box display="flex" gap={4}>
      {c}
    </Box>
  ),
  ol: ({ children: c }: AvecEnfants) => (
    <Box display="flex" gap={4}>
      {c}
    </Box>
  ),
  li: ({ children: c }: AvecEnfants) => (
    <Box display="flex" flexDirection="row" gap={8} style={{ alignItems: 'flex-start' }}>
      <Typography style={bodyStyle}>{'•'}</Typography>
      <Typography style={[bodyStyle, { flex: 1 }]}>{c}</Typography>
    </Box>
  ),
});

type LinkComponentStyles = Pick<MarkdownComponentsStyles, 'linkColor' | 'linkStyle' | 'linkHoverStyle'>;

const createLinkComponents = ({ linkColor, linkStyle, linkHoverStyle }: LinkComponentStyles): Components => ({
  a: ({ href, children: c }: AvecEnfants & { href?: string }) => (
    <Typography
      tag="a"
      href={href}
      color={linkColor}
      style={linkStyle}
      hoverStyle={linkHoverStyle}
      {...{ [FOCUS_ATTRIBUTE]: 'ring' }}
    >
      {c}
    </Typography>
  ),
});

const createBlockComponents = (borderColor: string): Components => ({
  pre: ({ children: c }: AvecEnfants) => <Box display="flex">{c}</Box>,
  // `tag="blockquote"` pose un vrai `<blockquote>` DOM, qui garde la marge par
  // défaut du user-agent (`margin: 1em 40px`) tant qu'on ne la remet pas à zéro.
  blockquote: ({ children: c }: AvecEnfants) => (
    <Box
      tag="blockquote"
      display="flex"
      pl={12}
      style={{ margin: 0, borderLeftWidth: 2, borderLeftColor: borderColor }}
    >
      {c}
    </Box>
  ),
});

const createCodeComponents = (): Components => ({
  // react-markdown ne passe plus de prop `inline` depuis la v9, et un bloc sans
  // langage ne porte pas non plus de classe `language-*` : la classe seule ne
  // départage donc pas un bloc de code inline. mdast-util-to-hast, lui, ajoute
  // toujours un `\n` de fin à un bloc (avec ou sans langage) et n'en met jamais à
  // de l'inline, où les retours à la ligne sont remplacés par des espaces : c'est
  // cette marque qui distingue fiablement les deux.
  code: ({ className, children: c }: AvecEnfants & { className?: string }) => {
    if (!String(c).endsWith('\n')) return <Code>{c}</Code>;

    return <Highlight language={extractLanguage(className)}>{String(c).replace(/\n$/, '')}</Highlight>;
  },
});

type TableComponentStyles = Pick<MarkdownComponentsStyles, 'bodyStyle' | 'boldStyle' | 'borderColor' | 'headerBg'>;

const createTableComponents = ({ bodyStyle, boldStyle, borderColor, headerBg }: TableComponentStyles) => ({
  table: ({ children: c }: AvecEnfants) => (
    <Box tag="div" borderWidth={1} borderColor={borderColor} borderRadius={8} overflow="hidden">
      <Box tag="table" style={{ display: 'table', borderCollapse: 'collapse', width: '100%' }}>
        {c}
      </Box>
    </Box>
  ),
  thead: ({ children: c }: AvecEnfants) => (
    <Box tag="thead" style={{ display: 'table-header-group' }}>
      {c}
    </Box>
  ),
  tbody: ({ children: c }: AvecEnfants) => (
    <Box tag="tbody" style={{ display: 'table-row-group' }}>
      {c}
    </Box>
  ),
  tr: ({ children: c }: AvecEnfants) => (
    <Box tag="tr" style={{ display: 'table-row' }}>
      {c}
    </Box>
  ),
  // Le contenu d'une cellule passe par `Typography` et jamais en enfant direct de
  // `Box` : une vue Tamagui refuse un nœud de texte nu, et son message d'erreur
  // sérialise les props de la vue, dont le contexte du thème, circulaire, ce qui
  // remplace l'avertissement par un « Converting circular structure to JSON » qui
  // fait planter le rendu.
  th: ({ children: c }: AvecEnfants) => (
    <Box
      tag="th"
      borderWidth={1}
      borderColor={borderColor}
      pt={8}
      pb={8}
      pl={12}
      pr={12}
      style={{ display: 'table-cell', textAlign: 'left', backgroundColor: headerBg }}
    >
      <Typography style={boldStyle}>{c}</Typography>
    </Box>
  ),
  td: ({ children: c }: AvecEnfants) => (
    <Box
      tag="td"
      borderWidth={1}
      borderColor={borderColor}
      pt={8}
      pb={8}
      pl={12}
      pr={12}
      style={{ display: 'table-cell' }}
    >
      <Typography style={bodyStyle}>{c}</Typography>
    </Box>
  ),
});

export const createMarkdownComponents = (styles: MarkdownComponentsStyles): Components => ({
  ...createTextComponents(styles),
  ...createHeadingComponents(styles.titres),
  ...createListComponents(styles.bodyStyle),
  ...createLinkComponents(styles),
  ...createBlockComponents(styles.borderColor),
  ...createCodeComponents(),
  ...createTableComponents(styles),
});
