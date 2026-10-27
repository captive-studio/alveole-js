import React from 'react';
import { positionEnPourcentage } from './documentViewerPdfCalculs';
import { type EvenementPointeur, lirePointeurWeb } from './pointeurWeb';

export const ZOOM_MIN = 1;
export const ZOOM_MAX = 4;
const PAS_DE_ZOOM = 1.25;

/** Le zoom suivant d'un cran de molette, borne entre `ZOOM_MIN` et `ZOOM_MAX`. */
export const zoomSuivant = (zoom: number, deltaY: number) =>
  Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, deltaY < 0 ? zoom * PAS_DE_ZOOM : zoom / PAS_DE_ZOOM));

/**
 * Le zoom a Ctrl (ou Cmd) + molette, centre sous le pointeur ; la molette seule laisse defiler
 * la page. Un double-clic revient a 100 %. Une fois zoome, l'origine suit le pointeur pour
 * parcourir la page. Le listener `wheel` est pose a la main, non passif : `onWheel` de React
 * est passif et ne peut pas empecher le zoom du navigateur. Hors du DOM (natif), rien n'est pose.
 */
export const useZoomMolette = () => {
  // Un ref par callback : le cadre est un etat, pose une fois monte, que l'effet suit.
  const [cadre, poserLeCadre] = React.useState<unknown>(null);
  const [echelle, setEchelle] = React.useState(1);
  const [position, setPosition] = React.useState({ x: 50, y: 50 });

  const suivrePointeur = React.useCallback((event: EvenementPointeur) => {
    const pointeur = lirePointeurWeb(event);
    if (!pointeur) return;

    setPosition(positionEnPourcentage(pointeur));
  }, []);

  React.useEffect(() => {
    if (typeof Element === 'undefined' || !(cadre instanceof Element)) return;

    const onWheel = (event: Event) => {
      if (!(event instanceof WheelEvent) || !(event.ctrlKey || event.metaKey)) return;

      event.preventDefault();
      suivrePointeur({ currentTarget: cadre, nativeEvent: event });
      setEchelle(zoom => zoomSuivant(zoom, event.deltaY));
    };
    const onDoubleClic = () => setEchelle(1);

    cadre.addEventListener('wheel', onWheel, { passive: false });
    cadre.addEventListener('dblclick', onDoubleClic);
    return () => {
      cadre.removeEventListener('wheel', onWheel);
      cadre.removeEventListener('dblclick', onDoubleClic);
    };
  }, [cadre, suivrePointeur]);

  return {
    poserLeCadre,
    echelle,
    /** La position du pointeur, en pourcentage du cadre. */
    position,
    origine: `${position.x}% ${position.y}%`,
    onDeplacement: (event: EvenementPointeur) => {
      if (echelle > 1) suivrePointeur(event);
    },
  };
};
