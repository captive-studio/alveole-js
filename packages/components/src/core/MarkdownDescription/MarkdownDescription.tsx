import { useTheme } from '@alveole/theme';
import React from 'react';
import { Platform, Text } from 'react-native';
import { Box } from '../Box';
import { Code } from '../Code';
import { Highlight, HighlightProps } from '../Highlight';
import { Typography, TypographyProps } from '../Typography';

export type MarkdownDescriptionProps = {
  children: string;
  /**
   * Le cran de texte du corps. `LG` sert la phrase qui presente une page : elle n'est pas un
   * paragraphe parmi d'autres, et Primer comme Base la posent un cran au-dessus du courant.
   */
  taille?: 'MD' | 'LG';
  /** Couleur du texte courant. Laisser vide garde le gris par defaut de `Typography`. */
  color?: string;
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

// Le texte courant, hors titres et liens : `p` et la variante native partagent tous les deux
// la couleur passee par l'appelant, seule voie pour un sous-titre en gris mention.
const Body = ({ style, color, children }: Pick<TypographyProps, 'style' | 'color' | 'children'>) => (
  <Typography style={style} color={color}>
    {children}
  </Typography>
);

export const MarkdownDescription = ({ children, taille = 'MD', color: textColor }: MarkdownDescriptionProps) => {
  const { text, color } = useTheme();

  const bodyStyle = text['Corps de texte'][taille].Regular;
  const boldStyle = text['Corps de texte'][taille].Bold;

  if (Platform.OS !== 'web') {
    return (
      <Body style={bodyStyle} color={textColor}>
        {children}
      </Body>
    );
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
  // Même bleu que le lien du fil d'Ariane (`Breadcrumbs.styles.ts`), pour que les liens de
  // contenu Markdown se fondent dans le reste du catalogue. La couleur passe par la prop
  // dédiée de Typography, pas par `style` : c'est elle qui a le dernier mot sur `color`.
  // Le soulignement, lui, reste permanent : contrairement au fil d'Ariane, ce lien est noyé
  // dans un paragraphe, et la règle d'accessibilité `link-in-text-block` (WCAG 1.4.1, usage
  // de la couleur) exige qu'un lien au milieu d'un bloc de texte se distingue de son
  // entourage par autre chose que sa seule couleur.
  const linkColor = color.light.text['default-info'];
  const linkStyle = { textDecoration: 'underline' as const };
  const linkHoverStyle = { textDecoration: 'none' as const };

  return (
    <Box tag="markdown-description" display="flex" gap={8}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children: c }: { children: React.ReactNode }) => (
            <Body style={bodyStyle} color={textColor}>
              {c}
            </Body>
          ),
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
          a: ({ href, children: c }: { href?: string; children: React.ReactNode }) => (
            <Typography tag="a" href={href} color={linkColor} style={linkStyle} hoverStyle={linkHoverStyle}>
              {c}
            </Typography>
          ),
          // `tag="blockquote"` pose un vrai `<blockquote>` DOM, qui garde la marge par
          // défaut du user-agent (`margin: 1em 40px`) tant qu'on ne la remet pas à zéro.
          blockquote: ({ children: c }: { children: React.ReactNode }) => (
            <Box
              tag="blockquote"
              display="flex"
              pl={12}
              style={{ margin: 0, borderLeftWidth: 2, borderLeftColor: borderColor } as any}
            >
              {c}
            </Box>
          ),
          // react-markdown ne passe plus de prop `inline` depuis la v9, et un bloc sans
          // langage ne porte pas non plus de classe `language-*` : la classe seule ne
          // départage donc pas un bloc de code inline. mdast-util-to-hast, lui, ajoute
          // toujours un `\n` de fin à un bloc (avec ou sans langage) et n'en met jamais à
          // de l'inline, où les retours à la ligne sont remplacés par des espaces : c'est
          // cette marque qui distingue fiablement les deux.
          code: ({ className, children: c }: { className?: string; children: React.ReactNode }) => {
            if (!String(c).endsWith('\n')) return <Code>{c}</Code>;

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
          // Le contenu d'une cellule passe par `Typography` et jamais en enfant direct de
          // `Box` : une vue Tamagui refuse un nœud de texte nu, et son message d'erreur
          // sérialise les props de la vue — dont le contexte du thème, circulaire — ce qui
          // remplace l'avertissement par un « Converting circular structure to JSON » qui
          // fait planter le rendu.
          th: ({ children: c }: { children: React.ReactNode }) => (
            <Box
              tag="th"
              borderWidth={1}
              borderColor={borderColor}
              pt={8}
              pb={8}
              pl={12}
              pr={12}
              style={{ display: 'table-cell', textAlign: 'left', backgroundColor: headerBg } as any}
            >
              <Typography style={boldStyle}>{c}</Typography>
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
              style={{ display: 'table-cell' } as any}
            >
              <Typography style={bodyStyle}>{c}</Typography>
            </Box>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </Box>
  );
};
