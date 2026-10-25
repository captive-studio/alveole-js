import { Spacings } from '@alveole/theme';
import type { Components } from 'react-markdown';
import { Linking } from 'react-native';
import { Box } from '../Box';
import { Typography } from '../Typography';
import { createMarkdownComponents, MarkdownComponentsStyles } from './markdownComponents';

type Noeud = {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, string | number | boolean>;
  children?: Noeud[];
};
const CONTENEURS = new Set(['ul', 'ol', 'li', 'blockquote', 'table', 'thead', 'tbody', 'tr', 'section']);
const BLOCS = new Set(['p', 'ul', 'ol', 'blockquote', 'pre']);

// Les listes compactes de Markdown ont du texte directement sous `li`. En natif,
// chaque suite de texte doit être dans un paragraphe, même avant une sous-liste.
const paragraphesDeListe = (children: Noeud[]): Noeud[] => {
  const resultat: Noeud[] = [];
  let inline: Noeud[] = [];
  const terminer = () => {
    if (inline.length) resultat.push({ type: 'element', tagName: 'p', properties: {}, children: inline });
    inline = [];
  };
  for (const enfant of children) {
    if (BLOCS.has(enfant.tagName ?? '')) {
      terminer();
      resultat.push(enfant);
    } else inline.push(enfant);
  }
  terminer();
  return resultat;
};

const preparer = (noeud: Noeud): void => {
  if (!noeud.children) return;
  // Les retours entre blocs HTML sont décoratifs. Une View native ne peut pas
  // recevoir ces chaînes de texte, contrairement à un élément DOM.
  if (noeud.type === 'root' || CONTENEURS.has(noeud.tagName ?? '')) {
    noeud.children = noeud.children.filter(enfant => enfant.type !== 'text' || !!enfant.value?.trim());
  }
  if (noeud.tagName === 'li') noeud.children = paragraphesDeListe(noeud.children);
  if (noeud.tagName === 'ol') {
    const debut = Number(noeud.properties?.start ?? 1);
    noeud.children.forEach((enfant, index) => {
      enfant.properties = { ...enfant.properties, 'data-marker': `${debut + index}.` };
    });
  }
  noeud.children.forEach(preparer);
};

export const preparerMarkdownNatif = () => preparer;

const tableauxNatifs = ({ bodyStyle, boldStyle, borderColor, headerBg }: MarkdownComponentsStyles): Components => ({
  table: ({ children }) => (
    <Box borderWidth={1} borderColor={borderColor}>
      {children}
    </Box>
  ),
  thead: ({ children }) => <Box style={{ backgroundColor: headerBg }}>{children}</Box>,
  tbody: ({ children }) => <Box>{children}</Box>,
  tr: ({ children }) => <Box style={{ flexDirection: 'row' }}>{children}</Box>,
  th: ({ children }) => (
    <Box p="1W" borderWidth={1} borderColor={borderColor} style={{ flex: 1, minWidth: 0 }}>
      <Typography style={boldStyle}>{children}</Typography>
    </Box>
  ),
  td: ({ children }) => (
    <Box p="1W" borderWidth={1} borderColor={borderColor} style={{ flex: 1, minWidth: 0 }}>
      <Typography style={bodyStyle}>{children}</Typography>
    </Box>
  ),
});

export const createNativeMarkdownComponents = (styles: MarkdownComponentsStyles): Components => ({
  ...createMarkdownComponents(styles),
  ...tableauxNatifs(styles),
  section: ({ children }) => <Box style={{ gap: Spacings['1W'] }}>{children}</Box>,
  sup: ({ children }) => <Typography style={styles.bodyStyle}>{children}</Typography>,
  h5: ({ children }) => (
    <Typography style={styles.titres['H6 - XXS']} color={styles.titleColor}>
      {children}
    </Typography>
  ),
  h6: ({ children }) => (
    <Typography style={styles.titres['H6 - XXS']} color={styles.titleColor}>
      {children}
    </Typography>
  ),
  a: ({ href, children }) => (
    <Typography
      style={styles.bodyStyle}
      color={styles.linkColor}
      textDecorationLine="underline"
      accessibilityRole="link"
      onPress={href ? () => void Linking.openURL(href) : undefined}
    >
      {children}
    </Typography>
  ),
  li: ({ children, node }) => {
    const marque = node?.properties?.['data-marker'];
    return (
      <Box style={{ flexDirection: 'row', gap: Spacings['1W'], alignItems: 'flex-start' }}>
        <Typography style={styles.bodyStyle}>{typeof marque === 'string' ? marque : '•'}</Typography>
        <Box style={{ flex: 1, gap: Spacings['1V'] }}>{children}</Box>
      </Box>
    );
  },
  br: () => <Typography>{'\n'}</Typography>,
  hr: () => <Box style={{ borderTopWidth: 1, borderColor: styles.borderColor }} />,
  del: ({ children }) => <Typography style={{ textDecorationLine: 'line-through' }}>{children}</Typography>,
  input: ({ checked }) => <Typography>{checked ? '☑ ' : '☐ '}</Typography>,
  img: ({ alt }) => <Typography style={styles.bodyStyle}>{alt}</Typography>,
});
