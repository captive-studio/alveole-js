import React from 'react';
import type { DocumentViewerRotation } from './DocumentViewer.types';
import type { DocumentViewerToolbarState } from './DocumentViewerToolbar';

/**
 * Le quart de tour suivant, dans un sens ou dans l'autre. Tourner a gauche, c'est avancer de
 * trois quarts : le modulo rend le retour a zero sans avoir a rattraper les debordements.
 */
export const rotationSuivante = (
  rotation: DocumentViewerRotation,
  direction: 'right' | 'left',
): DocumentViewerRotation => ((rotation + (direction === 'right' ? 90 : 270)) % 360) as DocumentViewerRotation;

/**
 * Ce que la barre d'outils pilote : l'orientation et la page courante. C'est le seul etat du
 * visualiseur, et il vivait dans le composant, ou il se melait au rendu au point de lui faire
 * passer les soixante lignes.
 */
export const usePilotageDeDocument = (type: DocumentViewerToolbarState['fileType']) => {
  const [rotation, setRotation] = React.useState<DocumentViewerRotation>(0);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);

  const state = React.useMemo<DocumentViewerToolbarState>(
    () => ({ fileType: type, rotation, page, totalPages }),
    [type, rotation, page, totalPages],
  );

  const onRotateRight = React.useCallback(() => setRotation(courante => rotationSuivante(courante, 'right')), []);
  const onRotateLeft = React.useCallback(() => setRotation(courante => rotationSuivante(courante, 'left')), []);

  const onNextPage = React.useCallback(() => {
    setPage(courante => Math.min(courante + 1, totalPages));
  }, [totalPages]);

  const onPreviousPage = React.useCallback(() => {
    setPage(courante => Math.max(courante - 1, 1));
  }, []);

  // Le PDF n'annonce son nombre de pages qu'une fois charge : la page courante peut deja etre
  // au-dela si le document precedent en avait davantage.
  const onPdfReady = React.useCallback((proxy: { numPages: number }) => {
    setTotalPages(proxy.numPages);
    setPage(courante => Math.min(courante, proxy.numPages));
  }, []);

  return { rotation, page, state, onRotateRight, onRotateLeft, onNextPage, onPreviousPage, onPdfReady };
};
