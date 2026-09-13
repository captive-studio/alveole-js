import React from 'react';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { Breadcrumbs } from '../Breadcrumbs';
import { useStyles } from './PageHeader.styles';

export type PageHeaderProps = React.PropsWithChildren<{
  /** Titre de la page (à gauche). Peut être une chaîne ou un contenu personnalisé. */
  title: string;
  /** Contenu affiché à droite (boutons, liens, etc.). */
  actions?: React.ReactNode;
  /** Props passées au Breadcrumbs (rootLabel, getLabel). */
  breadcrumbsProps?: React.ComponentProps<typeof Breadcrumbs>;
}>;

/**
 * En-tête de page : fil d'Ariane, puis une ligne avec le titre à gauche et des actions à droite.
 */
export const PageHeader = (props: PageHeaderProps) => {
  const { title, actions, breadcrumbsProps } = props;
  const styles = useStyles();

  return (
    <Box tag="page-header" style={styles.container}>
      <Breadcrumbs {...breadcrumbsProps} />
      <Box tag="page-header-contenu" style={styles.row}>
        <Typography tag="h1" style={styles.title}>
          {title}
        </Typography>
        {actions && (
          <Box tag="page-header-actions" style={styles.actions}>
            {actions}
          </Box>
        )}
      </Box>
    </Box>
  );
};
