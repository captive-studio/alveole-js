import { useTheme } from '@alveole/theme';
import React from 'react';
import { Platform } from 'react-native';
import { Box } from '../Box';
import { Typography } from '../Typography';
import { createMarkdownComponents } from './markdownComponents';

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

  if (Platform.OS !== 'web') {
    return (
      <Typography style={bodyStyle} color={textColor}>
        {children}
      </Typography>
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

  const components = createMarkdownComponents({
    bodyStyle,
    boldStyle,
    textColor,
    titres: text.Titres,
    borderColor,
    headerBg,
    linkColor,
    linkStyle,
    linkHoverStyle,
  });

  return (
    <Box tag="markdown-description" display="flex" gap={8}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </Box>
  );
};
