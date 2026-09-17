import React from 'react';
import { tailleValidee } from './documentViewerPdfCalculs';

/**
 * La taille d'un cadre, mesuree par `ResizeObserver` plutot que par `onLayout` : `onLayout`
 * de React Native for Web ne se declenche pas sur une balise HTML personnalisee comme
 * `document-viewer-pdf`. Le cadre est mesure des le montage, puis a chaque redimensionnement.
 */
export const useTailleParResizeObserver = () => {
  const mesureRef = React.useRef<HTMLDivElement | null>(null);
  const [taille, setTaille] = React.useState<{ width: number; height: number } | null>(null);

  React.useEffect(() => {
    const element = mesureRef.current;
    if (!element) return;

    const mettreAJour = (width: number, height: number) => {
      const valide = tailleValidee({ width, height });
      if (valide) setTaille(valide);
    };

    const observer = new ResizeObserver(entries => {
      const entree = entries[0];
      if (entree) mettreAJour(entree.contentRect.width, entree.contentRect.height);
    });

    observer.observe(element);

    const rect = element.getBoundingClientRect();
    mettreAJour(rect.width, rect.height);

    return () => observer.disconnect();
  }, []);

  return { mesureRef, taille };
};
