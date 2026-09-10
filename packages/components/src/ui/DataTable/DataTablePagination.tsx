import { makeStyles } from '@alveole/theme';
import { Box, Typography } from '../../core';
import { LucideIcon } from '../LucideIcon';

const useStyles = makeStyles(({ color, text, radius, spacing }) => ({
  pagination: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing('1W'),
  },
  navButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing('1W'),
    paddingLeft: spacing('3V'),
    paddingRight: spacing('3V'),
    paddingTop: spacing('1,5V'),
    paddingBottom: spacing('1,5V'),
    borderRadius: radius('sm'),
    cursor: 'pointer',
  },
  navButtonDisabled: {
    opacity: 0.4,
    cursor: 'default',
  },
  navLabel: {
    ...text['Corps de texte'].SM.Medium,
    color: color.light.text['default-grey'],
  },
  pages: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing('1,5V'),
  },
  pageButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 32,
    paddingTop: spacing('1,5V'),
    paddingBottom: spacing('1,5V'),
    borderRadius: radius('sm'),
    cursor: 'pointer',
  },
  pageButtonActive: {
    backgroundColor: color.light.background['active-primary'],
  },
  pageLabel: {
    ...text['Corps de texte'].SM.Regular,
    color: color.light.text['default-grey'],
  },
  pageLabelActive: {
    color: color.light.text['inverted-grey'],
  },
}));

export type DataTablePaginationProps = {
  /** Page courante, 1-indexée. */
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  previousLabel?: string;
  nextLabel?: string;
  /** Nombre maximum de numéros de page affichés simultanément. */
  maxVisiblePages?: number;
};

const getVisiblePages = (page: number, pageCount: number, maxVisiblePages: number) => {
  if (pageCount <= maxVisiblePages) return Array.from({ length: pageCount }, (_, index) => index + 1);

  const half = Math.floor(maxVisiblePages / 2);
  let start = Math.max(1, page - half);
  const end = Math.min(pageCount, start + maxVisiblePages - 1);
  start = Math.max(1, end - maxVisiblePages + 1);

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
};

export const DataTablePagination = (props: DataTablePaginationProps) => {
  const {
    page,
    pageCount,
    onPageChange,
    previousLabel = 'Précédent',
    nextLabel = 'Suivant',
    maxVisiblePages = 10,
  } = props;
  const styles = useStyles();

  const canGoPrevious = page > 1;
  const canGoNext = page < pageCount;
  const visiblePages = getVisiblePages(page, pageCount, maxVisiblePages);

  return (
    <Box tag="data-table-pagination" style={styles.pagination}>
      <Box
        onPress={canGoPrevious ? () => onPageChange(page - 1) : undefined}
        style={[styles.navButton, !canGoPrevious ? styles.navButtonDisabled : {}]}
      >
        <LucideIcon name="ChevronLeft" size="sm" color={styles.navLabel.color} />
        <Typography style={styles.navLabel}>{previousLabel}</Typography>
      </Box>

      <Box style={styles.pages}>
        {visiblePages.map(pageNumber => {
          const isActive = pageNumber === page;
          return (
            <Box
              key={pageNumber}
              onPress={() => onPageChange(pageNumber)}
              style={[styles.pageButton, isActive ? styles.pageButtonActive : {}]}
            >
              <Typography style={[styles.pageLabel, isActive ? styles.pageLabelActive : {}]}>{pageNumber}</Typography>
            </Box>
          );
        })}
      </Box>

      <Box
        onPress={canGoNext ? () => onPageChange(page + 1) : undefined}
        style={[styles.navButton, !canGoNext ? styles.navButtonDisabled : {}]}
      >
        <Typography style={styles.navLabel}>{nextLabel}</Typography>
        <LucideIcon name="ChevronRight" size="sm" color={styles.navLabel.color} />
      </Box>
    </Box>
  );
};
