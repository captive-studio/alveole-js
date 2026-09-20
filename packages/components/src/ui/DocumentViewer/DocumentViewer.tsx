import { Box } from '../../core/Box';
import { useStyles } from './DocumentViewer.styles';
import { type DocumentViewerProps } from './DocumentViewer.types';
import { DocumentViewerImage } from './DocumentViewerImage';
import { DocumentViewerPDF } from './DocumentViewerPDF';
import { DocumentViewerToolbar } from './DocumentViewerToolbar';
import { usePilotageDeDocument } from './usePilotageDeDocument';

export const DocumentViewer = (props: DocumentViewerProps) => {
  const { children, title, source, type, height = '100%', ChildrenProps, pdfErrorLabel, ...boxProps } = props;

  const styles = useStyles();
  const { rotation, page, state, onPdfReady, onRotateLeft, onRotateRight, onNextPage, onPreviousPage } =
    usePilotageDeDocument(type);

  return (
    <Box tag="document-viewer-wrapper" height={height} style={styles.viewerWrapper}>
      <Box tag="document-viewer" flex={1} height={'100%'} minW={0} style={{ flexBasis: 0 }} {...boxProps}>
        <DocumentViewerToolbar
          title={title}
          state={state}
          withChildren={children != null}
          onRotateLeft={onRotateLeft}
          onRotateRight={onRotateRight}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
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
                onReady={onPdfReady}
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
