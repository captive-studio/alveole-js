import { Box, Typography } from '@alveole/components';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useStyles } from './DocumentViewer.styles';
import { ToolbarButton } from './DocumentViewerToolbarButton';
export const DocumentViewerToolbar = props => {
  const { title, state, withChildren, onRotateLeft, onRotateRight, onNextPage, onPreviousPage } = props;
  const styles = useStyles();
  const isPdf = state.fileType === 'pdf';
  const isFirstPage = state.page === 1;
  const isLastPage = state.page === state.totalPages;
  const hasPagination = isPdf && typeof state.page === 'number' && typeof state.totalPages === 'number';
  return _jsxs(Box, {
    tag: 'document-viewer-toolbar',
    style: {
      ...styles.toolbar,
      ...(withChildren ? { borderTopRightRadius: 0 } : {}),
    },
    children: [
      _jsx(Box, { children: _jsx(Typography, { style: styles.toolbarTitle, children: title }) }),
      _jsxs(Box, {
        tag: 'document-viewer-toolbar-actions',
        style: styles.toolbarAction,
        children: [
          _jsxs(Box, {
            display: 'flex',
            flexDirection: 'row',
            gap: '1,5V',
            children: [
              _jsx(ToolbarButton, { onPress: onRotateLeft, icon: 'RotateCcwSquare' }),
              _jsx(ToolbarButton, { onPress: onRotateRight, icon: 'RotateCwSquare' }),
            ],
          }),
          _jsx(Box, { style: styles.toolbarDivider }),
          _jsxs(Box, {
            display: 'flex',
            flexDirection: 'row',
            gap: '1,5V',
            children: [
              _jsx(ToolbarButton, {
                onPress: onPreviousPage,
                disabled: isFirstPage || !hasPagination,
                icon: 'SquareChevronLeft',
              }),
              _jsx(Box, {
                mt: 'auto',
                mb: 'auto',
                children: _jsxs(Typography, {
                  style: styles.toolbarState,
                  children: [hasPagination ? state.page : 1, ' / ', hasPagination ? state.totalPages : 1],
                }),
              }),
              _jsx(ToolbarButton, {
                onPress: onNextPage,
                disabled: isLastPage || !hasPagination,
                icon: 'SquareChevronRight',
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
