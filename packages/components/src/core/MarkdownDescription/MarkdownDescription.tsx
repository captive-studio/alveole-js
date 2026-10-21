import { useTheme } from '@alveole/theme';
import React from 'react';
import type { Components } from 'react-markdown';
import { Platform } from 'react-native';
import { Box } from '../Box';
import { createMarkdownComponents } from './markdownComponents';
import { createNativeMarkdownComponents, preparerMarkdownNatif } from './markdownNatif';
import { replierLesCoupuresDeLigne } from './replierLesCoupuresDeLigne';

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

export const MarkdownDescription = ({ children, taille = 'MD', color: textColor }: MarkdownDescriptionProps) => {
  const { text, color } = useTheme();

  const bodyStyle = text['Corps de texte'][taille].Regular;
  const boldStyle = text['Corps de texte'][taille].Bold;

  const ReactMarkdown: React.ComponentType<{
    children: string;
    remarkPlugins: unknown[];
    components: Components;
    rehypePlugins: unknown[];
    skipHtml: boolean;
  }> = require('react-markdown').default;
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

  const styles = {
    bodyStyle,
    boldStyle,
    textColor,
    titres: text.Titres,
    titleColor: textColor ?? color.light.text['title-grey'],
    borderColor,
    headerBg,
    linkColor,
  };
  const components = Platform.OS === 'web' ? createMarkdownComponents(styles) : createNativeMarkdownComponents(styles);

  return (
    <Box tag="markdown-description" display="flex" gap={8} style={{ alignSelf: 'stretch' }}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, replierLesCoupuresDeLigne]}
        rehypePlugins={Platform.OS === 'web' ? [] : [preparerMarkdownNatif]}
        skipHtml={Platform.OS !== 'web'}
        components={components}
      >
        {children}
      </ReactMarkdown>
    </Box>
  );
};
