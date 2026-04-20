import { Box, type BoxProps } from '@alveole/components';
import React from 'react';
import { DocumentViewerRotation } from './DocumentViewer';
import { useStyles } from './DocumentViewer.styles';

type PDFDocumentProxyLike = {
  destroy?: () => void | Promise<void>;
  getPage: (page: number) => Promise<{
    getViewport: (options: { scale: number; rotation: DocumentViewerRotation }) => { width: number; height: number };
    render: (options: {
      canvasContext: CanvasRenderingContext2D;
      viewport: { width: number; height: number };
      transform?: [number, number, number, number, number, number];
    }) => { promise: Promise<void>; cancel?: () => void } | null;
    cleanup?: () => void;
  }>;
  numPages: number;
};

type PdfJsModule = {
  GlobalWorkerOptions: { workerSrc: string };
  getDocument: (source: string) => {
    promise: Promise<PDFDocumentProxyLike>;
    destroy: () => void;
  };
};

export type DocumentViewerPDFProps = {
  source: string;
  page: number;
  height?: BoxProps['height'];
  rotation: DocumentViewerRotation;
  scale?: number;
  onReady?: (state: PDFDocumentProxyLike) => void;
};

const isPdfCancellationError = (error: unknown) => {
  if (!(error instanceof Error)) return false;

  return (
    ['RenderingCancelledException', 'AbortException', 'UnknownErrorException'].includes(error.name) ||
    error.message.includes('Worker was terminated')
  );
};

const loadPdfJs = (() => {
  let promise: Promise<PdfJsModule> | null = null;

  return () => {
    if (typeof window === 'undefined') {
      return Promise.reject(new Error('PDF.js is only available in the browser.'));
    }

    if (promise) return promise;

    const dynamicImport = new Function('url', 'return import(url);') as (
      url: string,
    ) => Promise<{ default?: PdfJsModule }>;

    promise = dynamicImport('/pdf.min.mjs').then(module => {
      const pdfjs = (module.default ?? module) as PdfJsModule;
      pdfjs.GlobalWorkerOptions.workerSrc = `${window.location.origin}/pdf.worker.min.mjs`;
      return pdfjs;
    });

    return promise;
  };
})();

export const DocumentViewerPDF = (props: DocumentViewerPDFProps) => {
  const { source, page, rotation, height = '100%', scale = 1, onReady } = props;

  const styles = useStyles();

  const [pdf, setPdf] = React.useState<PDFDocumentProxyLike | null>(null);
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

  const onPdfLoadedSuccess = React.useCallback((documentPdf: PDFDocumentProxyLike, active: boolean) => {
    if (!active) return void documentPdf.destroy?.();
    setPdf(currentPdf => {
      void currentPdf?.destroy?.();
      return documentPdf;
    });
    onReadyRef.current?.(documentPdf);
  }, []);

  const onPdfLoadedError = React.useCallback((active: boolean) => {
    if (!active) return;
    setPdf(null);
  }, []);

  const onPageLoadedSuccess = React.useCallback(
    async (pagePdf: Awaited<ReturnType<PDFDocumentProxyLike['getPage']>>, active: boolean) => {
      if (!active || !canvasRef.current) return null;

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
    let loadingTask: ReturnType<PdfJsModule['getDocument']> | null = null;

    loadPdfJs()
      .then(pdfjs => {
        if (!isActive) return;

        loadingTask = pdfjs.getDocument(source);

        return loadingTask.promise
          .then(nextPdf => onPdfLoadedSuccess(nextPdf, isActive))
          .catch(error => {
            if (!isActive || isPdfCancellationError(error)) return;
            onPdfLoadedError(true);
          });
      })
      .catch(error => {
        if (!isActive || isPdfCancellationError(error)) return;
        onPdfLoadedError(true);
      });

    return () => {
      isActive = false;
      loadingTask?.destroy();
    };
  }, [source, onPdfLoadedError, onPdfLoadedSuccess]);

  React.useEffect(() => {
    if (!pdf || !canvasRef.current || viewerSize.width <= 0 || viewerSize.height <= 0) return;

    let isActive = true;
    let renderTask: Awaited<ReturnType<typeof onPageLoadedSuccess>> = null;

    pdf
      .getPage(page)
      .then(async pdfPage => {
        renderTask = await onPageLoadedSuccess(pdfPage, isActive);
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
  }, [pdf, page, rotation, scale, viewerSize, onPageLoadedSuccess, onPdfLoadedError]);

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
      </Box>
    </Box>
  );
};
