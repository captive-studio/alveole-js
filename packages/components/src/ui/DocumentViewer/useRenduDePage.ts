import React from 'react';
import type { PDFDocumentProxyLike } from './chargementDePdfJs';
import { DocumentViewerRotation } from './DocumentViewer.types';
import { echelleAjustee, estUneErreurDAnnulationPdf } from './documentViewerPdfCalculs';

type TailleDeCadre = { width: number; height: number };
type PagePdf = Awaited<ReturnType<PDFDocumentProxyLike['getPage']>>;

type ParametresDeDessin = {
  pagePdf: PagePdf;
  canvas: HTMLCanvasElement;
  cadre: TailleDeCadre;
  rotation: DocumentViewerRotation;
  scale: number;
};

/** Dessine une page sur le canvas fourni, a l'echelle qui la fait tenir dans le cadre. */
const dessinerLaPage = ({ pagePdf, canvas, cadre, rotation, scale }: ParametresDeDessin) => {
  const contexte = canvas.getContext('2d');
  if (contexte == null) return null;

  const cadrage = pagePdf.getViewport({ scale: 1, rotation });
  const echelle = echelleAjustee({
    pageWidth: cadrage.width,
    pageHeight: cadrage.height,
    viewerWidth: cadre.width,
    viewerHeight: cadre.height,
    zoom: scale,
  });
  const viewport = pagePdf.getViewport({ scale: echelle, rotation });

  const pixelRatio = window.devicePixelRatio || 1;
  canvas.width = Math.floor(viewport.width * pixelRatio);
  canvas.height = Math.floor(viewport.height * pixelRatio);
  canvas.style.width = `${viewport.width}px`;
  canvas.style.height = `${viewport.height}px`;
  contexte.setTransform(1, 0, 0, 1, 0, 0);
  contexte.clearRect(0, 0, canvas.width, canvas.height);

  return {
    taille: { width: viewport.width, height: viewport.height },
    tache: pagePdf.render({
      canvasContext: contexte,
      viewport,
      transform: pixelRatio === 1 ? undefined : [pixelRatio, 0, 0, pixelRatio, 0, 0],
    }),
  };
};

/**
 * Le rendu d'une page du document sur un canvas, refait a chaque changement de page, de
 * rotation, de zoom ou de taille du cadre. Un rendu en cours est annule des que ses parametres
 * changent : sinon deux rendus concurrents dessineraient sur le meme canvas.
 */
export const useRenduDePage = (params: {
  pdf: PDFDocumentProxyLike | null;
  page: number;
  rotation: DocumentViewerRotation;
  scale: number;
  cadre: TailleDeCadre | null;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  onErreur: () => void;
}) => {
  const { pdf, page, rotation, scale, cadre, canvasRef, onErreur } = params;
  const [tailleRendue, setTailleRendue] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    if (!pdf || !canvasRef.current || !cadre) return;

    let active = true;
    let tacheEnCours: ReturnType<PagePdf['render']> | null = null;

    pdf
      .getPage(page)
      .then(pagePdf => {
        if (!active || !canvasRef.current) return;

        const rendu = dessinerLaPage({ pagePdf, canvas: canvasRef.current, cadre, rotation, scale });
        if (!rendu) return;

        setTailleRendue(rendu.taille);
        tacheEnCours = rendu.tache;

        return rendu.tache?.promise.then(() => {
          if (active) pagePdf.cleanup?.();
        });
      })
      .catch(erreur => {
        if (!active || estUneErreurDAnnulationPdf(erreur)) return;
        onErreur();
      });

    return () => {
      active = false;
      tacheEnCours?.cancel?.();
    };
  }, [pdf, page, rotation, scale, cadre, canvasRef, onErreur]);

  return tailleRendue;
};
