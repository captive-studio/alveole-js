import { Box, Breadcrumbs, Typography } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import React from 'react';

export type PageTitleProps = {
  /** Titre de la page du catalogue. */
  title: string;
  /** Props passées au Breadcrumbs (rootLabel, getLabel, getHref). */
  breadcrumbsProps?: React.ComponentProps<typeof Breadcrumbs>;
};

/**
 * Le titre d'une page du catalogue, fil d'Ariane compris.
 *
 * Le catalogue est un site de documentation : il ne titre pas ses pages avec `PageHeader`, qui
 * est l'en-tête des écrans d'une application cliente et se lit dans le registre applicatif.
 * Primer sert sa documentation avec un paquet à part, Atlassian avec un style hors de son
 * échelle, Uber avec son échelle mais sans passer par un en-tête d'application. Ici le titre
 * prend le cran le plus haut de notre échelle, celui que les deux premiers emploient : 40.
 */
export const PageTitle = ({ title, breadcrumbsProps }: PageTitleProps) => {
  const { spacingValue, text, color } = useTheme();

  return (
    <Box display="flex" gap={spacingValue('1V')}>
      <Breadcrumbs {...breadcrumbsProps} />
      <Typography tag="h1" style={{ ...text.Titres['H1 - XL'], color: color.light.text['title-grey'] }}>
        {title}
      </Typography>
    </Box>
  );
};
