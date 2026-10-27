import React from 'react';
import { Box, type BoxProps } from '../../core/Box';
import { Typography } from '../../core/Typography';
import type { PDFDocumentProxyLike } from './chargementDePdfJs';
import { useStyles } from './DocumentViewer.styles';
import { DocumentViewerRotation } from './DocumentViewer.types';
import { useDocumentPdfCharge } from './useDocumentPdfCharge';
import { useEtatReinitialiseParCle } from './useEtatReinitialiseParCle';
import { useRenduDePage } from './useRenduDePage';
import { useTailleParResizeObserver } from './useTailleParResizeObserver';
import { useZoomMolette } from './useZoomMolette';

export type DocumentViewerPDFProps = {
  source: string;
  page: number;
  height?: BoxProps['height'];
  rotation: DocumentViewerRotation;
  scale?: number;
  onReady?: (state: PDFDocumentProxyLike) => void;
  errorLabel?: string;
};

type ZonePdfProps = {
  mesureRef: React.RefObject<HTMLDivElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  tailleRendue: { width: number; height: number };
  poserLeCadre: ReturnType<typeof useZoomMolette>['poserLeCadre'];
  zoom: Omit<ReturnType<typeof useZoomMolette>, 'poserLeCadre'>;
  hasError: boolean;
  errorLabel: string;
  height: BoxProps['height'];
};

/** Le cadre du visualiseur : la mesure invisible, le canvas a l'echelle du zoom, et
 *  l'incrustation d'erreur quand le document ou la page n'a pas pu se rendre. */
const ZonePdf = ({
  mesureRef,
  canvasRef,
  tailleRendue,
  poserLeCadre,
  zoom,
  hasError,
  errorLabel,
  height,
}: ZonePdfProps) => {
  const styles = useStyles();

  return (
    <Box
      tag="document-viewer-pdf"
      width={'100%'}
      height={height}
      ref={poserLeCadre}
      onPointerMove={zoom.onDeplacement}
      style={[styles.viewerPdfContent, { position: 'relative' }]}
    >
      {/* React Native for Web ne declenche pas `onLayout` sur cette balise personnalisee :
          ce calque invisible est mesure par `ResizeObserver` a sa place. */}
      <div ref={mesureRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
      <Box width={'100%'} height={'100%'} p={'1V'} style={styles.viewerPdfStage}>
        <Box
          style={[
            styles.viewerPdfCanvasWrapper,
            {
              width: tailleRendue.width,
              height: tailleRendue.height,
              transformOrigin: zoom.origine,
              transform: [{ scale: zoom.echelle }],
            },
          ]}
        >
          <canvas ref={canvasRef} style={styles.viewerPdfCanvas} />
        </Box>
        {hasError && (
          <Box style={styles.viewerPdfOverlay}>
            <Typography style={styles.viewerPdfErrorLabel}>{errorLabel}</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export const DocumentViewerPDF = (props: DocumentViewerPDFProps) => {
  const {
    source,
    page,
    rotation,
    height = '100%',
    scale = 1,
    onReady,
    errorLabel = 'Le PDF ne peut pas être affiché',
  } = props;

  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  const { pdf, hasError: erreurDeChargement } = useDocumentPdfCharge(source, onReady);
  const { mesureRef, taille: cadre } = useTailleParResizeObserver();
  // L'erreur de rendu se remet a zero des le changement de source, avant meme qu'un nouveau
  // rendu ne commence : sinon l'erreur de l'ancienne source resterait un instant affichee
  // sur la nouvelle.
  const [erreurDeRendu, setErreurDeRendu] = useEtatReinitialiseParCle(source);
  const onErreurDeRendu = React.useCallback(() => setErreurDeRendu(true), [setErreurDeRendu]);
  const tailleRendue = useRenduDePage({ pdf, page, rotation, scale, cadre, canvasRef, onErreur: onErreurDeRendu });
  const { poserLeCadre, ...zoom } = useZoomMolette();

  return (
    <ZonePdf
      mesureRef={mesureRef}
      canvasRef={canvasRef}
      tailleRendue={tailleRendue}
      poserLeCadre={poserLeCadre}
      zoom={zoom}
      hasError={erreurDeChargement || erreurDeRendu}
      errorLabel={errorLabel}
      height={height}
    />
  );
};
