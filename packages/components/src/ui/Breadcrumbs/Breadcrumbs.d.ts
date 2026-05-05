import React from 'react';
export type BreadcrumbItem = {
  label: string;
  href: string;
  isCurrent: boolean;
};
export type BreadcrumbsProps = React.PropsWithChildren<{
  /** Label du premier élément (lien vers la racine). Défaut : "Accueil" */
  rootLabel?: string;
  /**
   * Segments à ne pas afficher dans le fil d'Ariane (ex. ["admin"] pour avoir Accueil > Missions au lieu de Accueil > Admin > Missions).
   */
  segmentsToSkip?: string[];
  /**
   * Personnalisation du libellé pour un segment.
   * Par défaut : capitalisation + remplacement des - et _ par des espaces.
   */
  getLabel?: (segment: string, index: number, path: string) => string;
}>;
/**
 * Fil d'Ariane construit à partir de la navigation Expo Router.
 * Tous les éléments sauf le dernier (page en cours) sont cliquables.
 *
 * @example
 * Accueil > Admin > Missions > Détail
 */
export declare const Breadcrumbs: (props: BreadcrumbsProps) => import('react/jsx-runtime').JSX.Element;
//# sourceMappingURL=Breadcrumbs.d.ts.map
