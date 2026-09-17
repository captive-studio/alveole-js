import React from 'react';
import { loadPdfJs, PDFDocumentProxyLike } from './chargementDePdfJs';
import { estUneErreurDAnnulationPdf } from './documentViewerPdfCalculs';
import { useEtatReinitialiseParCle } from './useEtatReinitialiseParCle';

/**
 * Le document PDF charge depuis sa source. La page precedente est detruite des qu'une
 * nouvelle se substitue a elle avec succes : le document est lourd, et le garder en memoire
 * une fois remplace fuirait a chaque navigation.
 *
 * `hasError` se remet a zero des le changement de source, avant meme que le chargement ne
 * commence : sans cela, l'erreur de la source precedente resterait affichee un instant sur
 * la nouvelle.
 */
export const useDocumentPdfCharge = (source: string, onLoaded?: (document: PDFDocumentProxyLike) => void) => {
  const [pdf, setPdf] = React.useState<PDFDocumentProxyLike | null>(null);
  const [hasError, setHasError] = useEtatReinitialiseParCle(source);
  const onLoadedRef = React.useRef(onLoaded);

  React.useEffect(() => {
    onLoadedRef.current = onLoaded;
  }, [onLoaded]);

  React.useEffect(() => {
    let active = true;
    let tache: ReturnType<Awaited<ReturnType<typeof loadPdfJs>>['getDocument']> | null = null;

    loadPdfJs()
      .then(pdfjs => {
        if (!active) return;

        tache = pdfjs.getDocument({ url: source });

        return tache.promise
          .then(documentPdf => {
            if (!active) return void documentPdf.destroy?.();
            setPdf(precedent => {
              void precedent?.destroy?.();
              return documentPdf;
            });
            onLoadedRef.current?.(documentPdf);
          })
          .catch(erreur => {
            if (!active || estUneErreurDAnnulationPdf(erreur)) return;
            setPdf(null);
            setHasError(true);
          });
      })
      .catch(erreur => {
        if (!active || estUneErreurDAnnulationPdf(erreur)) return;
        setHasError(true);
      });

    return () => {
      active = false;
      tache?.destroy();
    };
  }, [source, setHasError]);

  React.useEffect(() => () => void pdf?.destroy?.(), [pdf]);

  return { pdf, hasError };
};
