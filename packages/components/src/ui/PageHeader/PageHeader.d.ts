import React from 'react';
import { Breadcrumbs } from '../Breadcrumbs';
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
export declare const PageHeader: (props: PageHeaderProps) => import('react/jsx-runtime').JSX.Element;
//# sourceMappingURL=PageHeader.d.ts.map
