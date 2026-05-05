import { usePathname } from 'expo-router';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { A, Box, Typography } from '../../core';
import { useStyles } from './Breadcrumbs.styles';
function humanizeSegment(segment) {
  return segment.replace(/[-_]/g, ' ').replace(/^\w/, c => c.toUpperCase());
}
/**
 * Fil d'Ariane construit à partir de la navigation Expo Router.
 * Tous les éléments sauf le dernier (page en cours) sont cliquables.
 *
 * @example
 * Accueil > Admin > Missions > Détail
 */
export const Breadcrumbs = props => {
  const { rootLabel = 'Accueil', segmentsToSkip, getLabel = segment => humanizeSegment(segment) } = props;
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
  const items = [
    {
      label: rootLabel,
      href: '/',
      isCurrent: segments.length === 0,
    },
    ...segmentItems.map(({ segment, index, path }) => ({
      label: getLabel(segment, index, path),
      href: path,
      isCurrent: index === segments.length - 1,
    })),
  ];
  return _jsx(Box, {
    style: styles.container,
    children: items.map((item, index) =>
      _jsxs(
        Box,
        {
          style: { flexDirection: 'row', alignItems: 'center' },
          children: [
            index > 0 && _jsx(Typography, { style: styles.separator, children: ' > ' }),
            item.isCurrent
              ? _jsx(Typography, { style: styles.current, children: item.label })
              : _jsx(A, {
                  href: item.href,
                  style: styles.link,
                  hoverStyle: styles.linkHover,
                  children: _jsx(Typography, {
                    style: styles.link,
                    hoverStyle: styles.linkHover,
                    children: item.label,
                  }),
                }),
          ],
        },
        `${item.href}-${index}`,
      ),
    ),
  });
};
