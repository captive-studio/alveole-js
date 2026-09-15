import React from 'react';
import { Box } from '../../core/Box';
import { useStyles } from './DocumentViewer.styles';
import {
  isDocumentViewerRotation,
  type DocumentViewerProps,
  type DocumentViewerRotation,
} from './DocumentViewer.types';
import { DocumentViewerImage } from './DocumentViewerImage';
import { DocumentViewerPDF } from './DocumentViewerPDF';
import { DocumentViewerToolbar, DocumentViewerToolbarState } from './DocumentViewerToolbar';

export const DocumentViewer = (props: DocumentViewerProps) => {
  const { children, title, source, type, height = '100%', ChildrenProps, pdfErrorLabel, ...boxProps } = props;

  const styles = useStyles();

  const [rotation, setRotation] = React.useState<DocumentViewerRotation>(0);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);

  const state = React.useMemo<DocumentViewerToolbarState>(() => {
    return {
      fileType: type,
      rotation,
      page,
      totalPages,
    };
  }, [type, rotation, page, totalPages]);

  const handleRotate = React.useCallback(
    (direction: 'right' | 'left') => {
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

  const handlePdfReady = React.useCallback((proxy: { numPages: number }) => {
    setTotalPages(proxy.numPages);
    setPage(currentPage => Math.min(currentPage, proxy.numPages));
  }, []);

  return (
    <Box tag="document-viewer-wrapper" height={height} style={styles.viewerWrapper}>
      <Box tag="document-viewer" flex={1} height={'100%'} minW={0} style={{ flexBasis: 0 }} {...boxProps}>
        <DocumentViewerToolbar
          title={title}
          state={state}
          withChildren={children != null}
          onRotateLeft={() => handleRotate('left')}
          onRotateRight={() => handleRotate('right')}
          onNextPage={handleNextPage}
          onPreviousPage={handlePreviousPage}
        />

        <Box
          tag="document-viewer-container"
          style={{
            ...styles.viewerContainer,
            ...(children ? { borderBottomRightRadius: 0 } : {}),
          }}
        >
          <Box flex={1}>
            {type === 'image' && <DocumentViewerImage source={source} rotation={rotation} height={height} />}
            {type === 'pdf' && (
              <DocumentViewerPDF
                source={source}
                page={page}
                rotation={rotation}
                height={height}
                onReady={handlePdfReady}
                errorLabel={pdfErrorLabel}
              />
            )}
          </Box>
        </Box>
      </Box>

      {children && (
        <Box tag="document-viewer-children" {...ChildrenProps} style={[styles.children, ChildrenProps?.style]}>
          {children}
        </Box>
      )}
    </Box>
  );
};
