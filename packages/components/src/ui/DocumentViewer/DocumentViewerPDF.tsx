import { Box, BoxProps } from '@alveole/components';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import * as pdfjs from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker.entry';
import React from 'react';
import { Platform } from 'react-native';
import { DocumentViewerRotation } from './DocumentViewer';
import { useStyles } from './DocumentViewer.styles';

export type DocumentViewerPDFProps = {
  source: string;
  page: number;
  height?: BoxProps['height'];
  rotation: DocumentViewerRotation;
  scale?: number;
  onReady?: (state: PDFDocumentProxy) => void;
};

const isPdfCancellationError = (error: unknown) => {
  if (!(error instanceof Error)) return false;

  return (
    ['RenderingCancelledException', 'AbortException', 'UnknownErrorException'].includes(error.name) ||
    error.message.includes('Worker was terminated')
  );
};

export const DocumentViewerPDF = (props: DocumentViewerPDFProps) => {
  const { source, page, rotation, height = '100%', scale = 1, onReady } = props;

  const styles = useStyles();

  const [pdf, setPdf] = React.useState<PDFDocumentProxy | null>(null);
  const [viewerSize, setViewerSize] = React.useState({ width: 0, height: 0 });
  const [isHovered, setIsHovered] = React.useState(false);
  const [transformOrigin, setTransformOrigin] = React.useState('50% 50%');
  const [renderedPageSize, setRenderedPageSize] = React.useState({ width: 0, height: 0 });
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const onReadyRef = React.useRef(onReady);
  const hoveredScale = isHovered ? 2 : 1;

  React.useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  const onPdfLoadedSuccess = React.useCallback((documentPdf: PDFDocumentProxy, active: boolean) => {
    if (!active) return void documentPdf.destroy?.();
    setPdf(currentPdf => {
      void currentPdf?.destroy?.();
      return documentPdf;
    });
    onReadyRef.current?.(documentPdf);
  }, []);

  const onPdfLoadedError = (active: boolean) => {
    if (!active) return;
    setPdf(null);
  };

  const onPageLoadedSuccess = React.useCallback(
    (pagePdf: pdfjs.PDFPageProxy, active: boolean) => {
      if (!active || !canvasRef.current) return;

      const baseViewport = pagePdf.getViewport({ scale: 1, rotation });
      const fittedScale = Math.min(viewerSize.width / baseViewport.width, viewerSize.height / baseViewport.height);
      const viewport = pagePdf.getViewport({ scale: fittedScale * scale, rotation });

      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (context == null) return null;

      const pixelRatio = window.devicePixelRatio || 1;
      canvas.width = Math.floor(viewport.width * pixelRatio);
      canvas.height = Math.floor(viewport.height * pixelRatio);
      canvas.style.width = `${viewport.width}px`;
      canvas.style.height = `${viewport.height}px`;
      setRenderedPageSize({ width: viewport.width, height: viewport.height });
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, canvas.width, canvas.height);

      return pagePdf.render({
        canvasContext: context,
        viewport,
        transform: pixelRatio === 1 ? undefined : [pixelRatio, 0, 0, pixelRatio, 0, 0],
      });
    },
    [rotation, scale, viewerSize.height, viewerSize.width],
  );

  React.useEffect(() => {
    let isActive = true;
    const loadingTask = pdfjs.getDocument(source);

    loadingTask.promise
      .then(nextPdf => onPdfLoadedSuccess(nextPdf, isActive))
      .catch(error => {
        if (!isActive || isPdfCancellationError(error)) return;
        onPdfLoadedError(true);
      });

    return () => {
      isActive = false;
      loadingTask.destroy();
    };
  }, [source, onPdfLoadedSuccess]);

  React.useEffect(() => {
    if (!pdf || !canvasRef.current || viewerSize.width <= 0 || viewerSize.height <= 0) return;

    let isActive = true;
    let renderTask: ReturnType<typeof onPageLoadedSuccess> = null;

    pdf
      .getPage(page)
      .then(pdfPage => {
        renderTask = onPageLoadedSuccess(pdfPage, isActive);
        return renderTask?.promise.then(() => {
          if (!isActive) return;
          pdfPage.cleanup?.();
        });
      })
      .catch(error => {
        if (!isActive || isPdfCancellationError(error)) return;
        onPdfLoadedError(true);
      });

    return () => {
      isActive = false;
      renderTask?.cancel?.();
    };
  }, [pdf, page, rotation, scale, viewerSize, onPageLoadedSuccess]);

  const handleLayout = React.useCallback((event: any) => {
    const nextWidth = event?.nativeEvent?.layout?.width;
    const nextHeight = event?.nativeEvent?.layout?.height;
    if (typeof nextWidth === 'number' && nextWidth > 0 && typeof nextHeight === 'number' && nextHeight > 0) {
      setViewerSize({ width: nextWidth, height: nextHeight });
    }
  }, []);

  const handlePointerMove = React.useCallback((event: any) => {
    const rect = event.currentTarget?.getBoundingClientRect?.();
    if (!rect) return;

    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setTransformOrigin(`${Math.max(0, Math.min(100, x))}% ${Math.max(0, Math.min(100, y))}%`);
  }, []);

  React.useEffect(() => () => void pdf?.destroy?.(), [pdf]);

  return (
    <Box
      tag="document-viewer-pdf"
      width={'100%'}
      height={height}
      onLayout={handleLayout}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      onPointerMove={handlePointerMove}
      style={styles.viewerPdfContent}
    >
      <Box width={'100%'} height={'100%'} p={'1V'} style={styles.viewerPdfStage}>
        {Platform.OS === 'web' && (
          <Box
            style={[
              styles.viewerPdfCanvasWrapper,
              {
                width: renderedPageSize.width,
                height: renderedPageSize.height,
                transformOrigin,
                transform: [{ scale: hoveredScale }],
              },
            ]}
          >
            <canvas ref={canvasRef} style={styles.viewerPdfCanvas} />
          </Box>
        )}
      </Box>
    </Box>
  );
};
