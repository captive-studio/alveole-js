import { useTheme } from '@alveole/theme';
import React from 'react';
import { Platform, Text } from 'react-native';
import { Box } from '../Box';
import { Code } from '../Code';
import { Highlight, HighlightProps } from '../Highlight';
import { Typography } from '../Typography';

export type MarkdownDescriptionProps = {
  children: string;
  /**
   * Le cran de texte du corps. `LG` sert la phrase qui presente une page : elle n'est pas un
   * paragraphe parmi d'autres, et Primer comme Base la posent un cran au-dessus du courant.
   */
  taille?: 'MD' | 'LG';
};

const HIGHLIGHT_LANGUAGES: HighlightProps['language'][] = [
  'json',
  'typescript',
  'tsx',
  'ruby',
  'bash',
  'html',
  'plaintext',
];

const extractLanguage = (className?: string): HighlightProps['language'] => {
  const match = /language-(\w+)/.exec(className ?? '');
  return HIGHLIGHT_LANGUAGES.find(l => l === match?.[1]) ?? 'plaintext';
};

export const MarkdownDescription = ({ children, taille = 'MD' }: MarkdownDescriptionProps) => {
  const { text, color } = useTheme();

  const bodyStyle = text['Corps de texte'][taille].Regular;
  const boldStyle = text['Corps de texte'][taille].Bold;

  if (Platform.OS !== 'web') {
    return <Typography style={bodyStyle}>{children}</Typography>;
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const ReactMarkdown = require('react-markdown').default as React.ComponentType<{
    children: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    remarkPlugins: unknown[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    components: Record<string, React.ComponentType<any>>;
  }>;
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const remarkGfm = require('remark-gfm').default;

  const borderColor = color.light.border['default-grey'];
  const headerBg = color.light.background['alt-grey'];

  return (
    <Box tag="markdown-description" display="flex" gap={8}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children: c }: { children: React.ReactNode }) => <Typography style={bodyStyle}>{c}</Typography>,
          strong: ({ children: c }: { children: React.ReactNode }) => <Text style={boldStyle}>{c}</Text>,
          em: ({ children: c }: { children: React.ReactNode }) => (
            <Text style={[bodyStyle, { fontStyle: 'italic' as const }]}>{c}</Text>
          ),
          h1: ({ children: c }: { children: React.ReactNode }) => (
            <Typography style={text.Titres['H3 - MD']}>{c}</Typography>
          ),
          h2: ({ children: c }: { children: React.ReactNode }) => (
            <Typography style={text.Titres['H4 - SM']}>{c}</Typography>
          ),
          h3: ({ children: c }: { children: React.ReactNode }) => (
            <Typography style={text.Titres['H5 - XS']}>{c}</Typography>
          ),
          h4: ({ children: c }: { children: React.ReactNode }) => (
            <Typography style={text.Titres['H6 - XXS']}>{c}</Typography>
          ),
          ul: ({ children: c }: { children: React.ReactNode }) => (
            <Box display="flex" gap={4}>
              {c}
            </Box>
          ),
          ol: ({ children: c }: { children: React.ReactNode }) => (
            <Box display="flex" gap={4}>
              {c}
            </Box>
          ),
          li: ({ children: c }: { children: React.ReactNode }) => (
            <Box display="flex" flexDirection="row" gap={8} style={{ alignItems: 'flex-start' }}>
              <Typography style={bodyStyle}>{'•'}</Typography>
              <Typography style={[bodyStyle, { flex: 1 }]}>{c}</Typography>
            </Box>
          ),
          pre: ({ children: c }: { children: React.ReactNode }) => <Box display="flex">{c}</Box>,
          // react-markdown ne passe plus de prop `inline` depuis la v9 : seul un bloc
          // porte une classe `language-*`, posée par le parseur d'après la clôture du
          // bloc. Sans ce départage, le code inline était rendu en bloc coloré, et un
          // bloc coloré dans une cellule de tableau faisait échouer le rendu.
          code: ({ className, children: c }: { className?: string; children: React.ReactNode }) => {
            if (!className?.includes('language-')) return <Code>{c}</Code>;

            return <Highlight language={extractLanguage(className)}>{String(c).replace(/\n$/, '')}</Highlight>;
          },
          table: ({ children: c }: { children: React.ReactNode }) => (
            <Box tag="div" borderWidth={1} borderColor={borderColor} borderRadius={8} overflow="hidden">
              <Box tag="table" style={{ display: 'table', borderCollapse: 'collapse', width: '100%' } as any}>
                {c}
              </Box>
            </Box>
          ),
          thead: ({ children: c }: { children: React.ReactNode }) => (
            <Box tag="thead" style={{ display: 'table-header-group' } as any}>
              {c}
            </Box>
          ),
          tbody: ({ children: c }: { children: React.ReactNode }) => (
            <Box tag="tbody" style={{ display: 'table-row-group' } as any}>
              {c}
            </Box>
          ),
          tr: ({ children: c }: { children: React.ReactNode }) => (
            <Box tag="tr" style={{ display: 'table-row' } as any}>
              {c}
            </Box>
          ),
          th: ({ children: c }: { children: React.ReactNode }) => (
            <Box
              tag="th"
              borderWidth={1}
              borderColor={borderColor}
              pt={8}
              pb={8}
              pl={12}
              pr={12}
              style={{ display: 'table-cell', textAlign: 'left', backgroundColor: headerBg, ...boldStyle } as any}
            >
              {c}
            </Box>
          ),
          td: ({ children: c }: { children: React.ReactNode }) => (
            <Box
              tag="td"
              borderWidth={1}
              borderColor={borderColor}
              pt={8}
              pb={8}
              pl={12}
              pr={12}
              style={{ display: 'table-cell', ...bodyStyle } as any}
            >
              {c}
            </Box>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </Box>
  );
};
