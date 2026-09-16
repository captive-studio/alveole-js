import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { useStyles } from './DocumentViewer.styles';
import { DocumentViewerProps } from './DocumentViewer.types';
import { ToolbarButton } from './DocumentViewerToolbarButton';

export type DocumentViewerToolbarState = {
  fileType: DocumentViewerProps['type'];
  rotation: 0 | 90 | 180 | 270;
  page?: number;
  totalPages?: number;
};

export type DocumentViewerToolbarProps = {
  title: string;
  state: DocumentViewerToolbarState;
  withChildren: boolean;
  onRotateLeft: () => void;
  onRotateRight: () => void;
  onPreviousPage?: () => void;
  onNextPage?: () => void;
};

export const DocumentViewerToolbar = (props: DocumentViewerToolbarProps) => {
  const { title, state, withChildren, onRotateLeft, onRotateRight, onNextPage, onPreviousPage } = props;

  const styles = useStyles();

  const isPdf = state.fileType === 'pdf';
  const isFirstPage = state.page === 1;
  const isLastPage = state.page === state.totalPages;
  const hasPagination = isPdf && typeof state.page === 'number' && typeof state.totalPages === 'number';

  return (
    <Box
      tag="document-viewer-toolbar"
      style={{
        ...styles.toolbar,
        ...(withChildren ? { borderTopRightRadius: 0 } : {}),
      }}
    >
      <Box>
        <Typography style={styles.toolbarTitle}>{title}</Typography>
      </Box>

      <Box tag="document-viewer-toolbar-actions" style={styles.toolbarAction}>
        <Box display="flex" flexDirection="row" gap="1,5V">
          <ToolbarButton onPress={onRotateLeft} icon="RotateCcwSquare" accessibilityLabel="Pivoter vers la gauche" />
          <ToolbarButton onPress={onRotateRight} icon="RotateCwSquare" accessibilityLabel="Pivoter vers la droite" />
        </Box>

        <Box style={styles.toolbarDivider} />

        <Box display="flex" flexDirection="row" gap="1,5V">
          <ToolbarButton
            onPress={onPreviousPage}
            disabled={isFirstPage || !hasPagination}
            icon="SquareChevronLeft"
            accessibilityLabel="Page precedente"
          />

          <Box mt={'auto'} mb={'auto'}>
            <Typography style={styles.toolbarState}>
              {hasPagination ? state.page : 1} / {hasPagination ? state.totalPages : 1}
            </Typography>
          </Box>

          <ToolbarButton
            onPress={onNextPage}
            disabled={isLastPage || !hasPagination}
            icon="SquareChevronRight"
            accessibilityLabel="Page suivante"
          />
        </Box>
      </Box>
    </Box>
  );
};
