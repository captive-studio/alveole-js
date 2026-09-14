import { type Href, usePathname } from 'expo-router';
import React from 'react';
import { A } from '../../core/A';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { useStyles } from './Breadcrumbs.styles';

export type BreadcrumbItem = {
  label: string;
  href: string | null;
  isCurrent: boolean;
};

function humanizeSegment(segment: string): string {
  return segment.replace(/[-_]/g, ' ').replace(/^\w/, c => c.toUpperCase());
}

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
  /**
   * Personnalisation du lien pour un segment.
   * Retourner null pour afficher le segment sans lien.
   * Par défaut : chemin reconstruit depuis l'URL courante.
   */
  getHref?: (segment: string, index: number, path: string) => string | null;
}>;

/**
 * Fil d'Ariane construit à partir de la navigation Expo Router.
 * Tous les éléments sauf le dernier (page en cours) sont cliquables.
 *
 * @example
 * Accueil > Admin > Missions > Détail
 */
export const Breadcrumbs = (props: BreadcrumbsProps) => {
  const { rootLabel = 'Accueil', segmentsToSkip, getLabel = segment => humanizeSegment(segment), getHref } = props;

  const pathname = usePathname();
  const styles = useStyles();

  const segments = pathname.split('/').filter(Boolean);

  const segmentItems = segments
    .map((segment, index) => ({
      segment,
      index,
      path: '/' + segments.slice(0, index + 1).join('/'),
    }))
    .filter(({ segment }) => !segmentsToSkip?.includes(segment));

  const items: BreadcrumbItem[] = [
    {
      label: rootLabel,
      href: '/',
      isCurrent: segments.length === 0,
    },
    ...segmentItems.map(({ segment, index, path }) => ({
      label: getLabel(segment, index, path),
      href: getHref ? getHref(segment, index, path) : path,
      isCurrent: index === segments.length - 1,
    })),
  ];

  return (
    <Box tag="breadcrumbs" style={styles.container}>
      {items.map((item, index) => (
        <Box
          tag="breadcrumbs-item"
          key={`${item.href}-${index}`}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          {index > 0 && <Box tag="breadcrumbs-separator" aria-hidden style={styles.separator} />}
          {item.isCurrent || item.href === null ? (
            <Typography style={styles.current}>{item.label}</Typography>
          ) : (
            <A href={item.href as Href & string} style={styles.link} hoverStyle={styles.linkHover}>
              <Typography style={styles.link} hoverStyle={styles.linkHover}>
                {item.label}
              </Typography>
            </A>
          )}
        </Box>
      ))}
    </Box>
  );
};
