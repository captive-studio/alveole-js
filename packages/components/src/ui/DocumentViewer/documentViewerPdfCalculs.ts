/**
 * Ce que pdfjs rejette quand une page ou un document se voit remplace en cours de rendu :
 * un changement rapide de page ou de source annule le rendu precedent, et cette annulation
 * n'est pas une erreur a montrer. Le rejet n'est pas toujours une instance d'`Error`.
 */
export const estUneErreurDAnnulationPdf = (erreur: unknown): boolean => {
  if (!(erreur instanceof Error)) return false;

  return (
    ['RenderingCancelledException', 'AbortException'].includes(erreur.name) ||
    erreur.message.includes('Worker was terminated') ||
    erreur.message.includes("Cannot read properties of null (reading 'sendWithPromise')")
  );
};

export type DimensionsDePage = {
  pageWidth: number;
  pageHeight: number;
  viewerWidth: number;
  viewerHeight: number;
  /** Le zoom demande par l'appelant, applique par-dessus l'ajustement au cadre. */
  zoom?: number;
};

/**
 * L'echelle qui fait tenir une page dans son cadre. Les deux dimensions contraignent
 * l'echelle independamment ; la plus stricte des deux decide, sans quoi la page deborderait
 * du cote que l'autre laisse passer.
 */
export const echelleAjustee = ({ pageWidth, pageHeight, viewerWidth, viewerHeight, zoom = 1 }: DimensionsDePage) =>
  Math.min(viewerWidth / pageWidth, viewerHeight / pageHeight) * zoom;

export type PositionDePointeur = {
  clientX: number;
  clientY: number;
  rect: { left: number; top: number; width: number; height: number };
};

/**
 * La position du pointeur dans son cadre, en pourcentage. Bornee au cadre : pendant un
 * glisser, le pointeur peut en sortir, et l'origine d'un zoom n'a pas de sens hors de la
 * surface qu'elle decrit.
 */
export const positionEnPourcentage = ({ clientX, clientY, rect }: PositionDePointeur) => {
  const x = ((clientX - rect.left) / rect.width) * 100;
  const y = ((clientY - rect.top) / rect.height) * 100;

  return { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) };
};

/**
 * Une taille mesuree, ou `null` quand elle n'est pas encore exploitable : au premier rendu,
 * avant que la mise en page ou le `ResizeObserver` n'ait rapporte quoi que ce soit, les
 * dimensions sont nulles ou absentes.
 */
export const tailleValidee = ({ width, height }: { width: number | undefined; height: number | undefined }) =>
  typeof width === 'number' && width > 0 && typeof height === 'number' && height > 0 ? { width, height } : null;
