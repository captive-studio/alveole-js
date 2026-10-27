import React from 'react';

/**
 * Le plein ecran du visualiseur, par la Fullscreen API du navigateur. Indisponible hors du web
 * ou quand le navigateur le refuse (`document.fullscreenEnabled`). La sortie par Echap passe par
 * le navigateur : l'etat suit donc `fullscreenchange` plutot que les appuis sur le bouton.
 */
export const usePleinEcran = () => {
  const [cadre, poserLeCadre] = React.useState<unknown>(null);
  const [pleinEcran, setPleinEcran] = React.useState(false);
  const disponible = typeof document !== 'undefined' && document.fullscreenEnabled === true;

  React.useEffect(() => {
    if (!disponible) return;

    const onChangement = () => setPleinEcran(document.fullscreenElement === cadre);
    document.addEventListener('fullscreenchange', onChangement);
    return () => document.removeEventListener('fullscreenchange', onChangement);
  }, [cadre, disponible]);

  const basculer = React.useCallback(() => {
    if (!(cadre instanceof Element)) return;

    if (document.fullscreenElement === cadre) void document.exitFullscreen();
    else void cadre.requestFullscreen();
  }, [cadre]);

  return { poserLeCadre, disponible, pleinEcran, basculer };
};
