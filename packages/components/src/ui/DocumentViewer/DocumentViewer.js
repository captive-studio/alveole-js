import { Box } from '@alveole/components';
import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useStyles } from './DocumentViewer.styles';
import { DocumentViewerImage } from './DocumentViewerImage';
import { DocumentViewerPDF } from './DocumentViewerPDF';
import { DocumentViewerToolbar } from './DocumentViewerToolbar';
export const isDocumentViewerRotation = value => [0, 90, 180, 270].includes(value);
export const DocumentViewer = props => {
  const { children, title, source, type, height = '100%', ChildrenProps, ...boxProps } = props;
  const styles = useStyles();
  const [rotation, setRotation] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(type === 'image' ? 1 : 1);
  const state = React.useMemo(() => {
    return {
      fileType: type,
      rotation,
      page,
      totalPages,
    };
  }, [type, rotation, page, totalPages]);
  const handleRotate = React.useCallback(
    direction => {
      let newRotation = direction === 'right' ? rotation + 90 : rotation - 90;
      if (newRotation < 0) newRotation = 270;
      if (newRotation > 270) newRotation = 0;
      if (isDocumentViewerRotation(newRotation)) setRotation(newRotation);
    },
    [rotation],
  );
  const handleNextPage = React.useCallback(() => {
    setPage(currentPage => Math.min(currentPage + 1, totalPages));
  }, [totalPages]);
  const handlePreviousPage = React.useCallback(() => {
    setPage(currentPage => Math.max(currentPage - 1, 1));
  }, []);
  React.useEffect(() => {
    setPage(currentPage => Math.min(currentPage, totalPages));
  }, [totalPages]);
  const handlePdfReady = React.useCallback(proxy => {
    setTotalPages(proxy.numPages);
  }, []);
  return _jsxs(Box, {
    tag: 'document-viewer-wrapper',
    height: height,
    style: styles.viewerWrapper,
    children: [
      _jsxs(Box, {
        tag: 'document-viewer',
        flex: 1,
        height: '100%',
        minW: 0,
        style: { flexBasis: 0 },
        ...boxProps,
        children: [
          _jsx(DocumentViewerToolbar, {
            title: title,
            state: state,
            withChildren: children != null,
            onRotateLeft: () => handleRotate('left'),
            onRotateRight: () => handleRotate('right'),
            onNextPage: handleNextPage,
            onPreviousPage: handlePreviousPage,
          }),
          _jsx(Box, {
            tag: 'document-viewer-container',
            style: {
              ...styles.viewerContainer,
              ...(children ? { borderBottomRightRadius: 0 } : {}),
            },
            children: _jsxs(Box, {
              flex: 1,
              children: [
                type === 'image' && _jsx(DocumentViewerImage, { source: source, rotation: rotation, height: height }),
                type === 'pdf' &&
                  _jsx(DocumentViewerPDF, {
                    source: source,
                    page: page,
                    rotation: rotation,
                    height: height,
                    onReady: handlePdfReady,
                  }),
              ],
            }),
          }),
        ],
      }),
      children &&
        _jsx(Box, {
          tag: 'document-viewer-children',
          ...ChildrenProps,
          style: [styles.children, ChildrenProps?.style],
          children: children,
        }),
    ],
  });
};
