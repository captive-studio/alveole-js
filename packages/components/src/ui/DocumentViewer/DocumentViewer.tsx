import type React from 'react';
import { Box } from '../../core/Box';
import { useStyles } from './DocumentViewer.styles';
import { type DocumentViewerProps, type DocumentViewerRotation } from './DocumentViewer.types';
import { DocumentViewerImage } from './DocumentViewerImage';
import { DocumentViewerPDF } from './DocumentViewerPDF';
import { DocumentViewerToolbar } from './DocumentViewerToolbar';
import { usePilotageDeDocument } from './usePilotageDeDocument';
import { usePleinEcran } from './usePleinEcran';

export const DocumentViewer = (props: DocumentViewerProps) => {
  const {
    children,
    title,
    source,
    type,
    height = '100%',
    ChildrenProps,
    pdfErrorLabel,
    allowFullscreen = false,
    ...boxProps
  } = props;

  const styles = useStyles();
  const { rotation, page, state, onPdfReady, onRotateLeft, onRotateRight, onNextPage, onPreviousPage } =
    usePilotageDeDocument(type);
  const { poserLeCadre, ...pleinEcran } = usePleinEcran(allowFullscreen);

  return (
    <Box tag="document-viewer-wrapper" height={height} style={styles.viewerWrapper}>
      <Box
        tag="document-viewer"
        ref={poserLeCadre}
        flex={1}
        height={'100%'}
        minW={0}
        style={{ flexBasis: 0 }}
        {...boxProps}
      >
        <DocumentViewerToolbar
          title={title}
          state={state}
          withChildren={children != null}
          onRotateLeft={onRotateLeft}
          onRotateRight={onRotateRight}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
          pleinEcran={pleinEcran.disponible ? pleinEcran.pleinEcran : undefined}
          onTogglePleinEcran={pleinEcran.basculer}
        />

        <ContenuDuDocument
          type={type}
          source={source}
          page={page}
          rotation={rotation}
          height={height}
          onPdfReady={onPdfReady}
          pdfErrorLabel={pdfErrorLabel}
          withChildren={children != null}
        />
      </Box>

      {children && (
        <Box tag="document-viewer-children" {...ChildrenProps} style={[styles.children, ChildrenProps?.style]}>
          {children}
        </Box>
      )}
    </Box>
  );
};

type ContenuDuDocumentProps = Pick<DocumentViewerProps, 'type' | 'source' | 'height' | 'pdfErrorLabel'> & {
  page: number;
  rotation: DocumentViewerRotation;
  onPdfReady: React.ComponentProps<typeof DocumentViewerPDF>['onReady'];
  withChildren: boolean;
};

/** Le cadre du document, image ou PDF, sous la barre d'outils. */
const ContenuDuDocument = (props: ContenuDuDocumentProps) => {
  const { type, source, page, rotation, height, onPdfReady, pdfErrorLabel, withChildren } = props;
  const styles = useStyles();

  return (
    <Box
      tag="document-viewer-container"
      style={{
        ...styles.viewerContainer,
        ...(withChildren ? { borderBottomRightRadius: 0 } : {}),
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
  );
};
