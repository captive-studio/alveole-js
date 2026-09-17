import React from 'react';
import { positionEnPourcentage } from './documentViewerPdfCalculs';

/**
 * Le zoom qui suit le pointeur au survol : la page grossit autour du point survole, comme une
 * loupe. L'origine de l'agrandissement est la position du pointeur en pourcentage du cadre,
 * recalculee a chaque deplacement.
 */
export const useSurvolAvecZoom = () => {
  const [survole, setSurvole] = React.useState(false);
  const [origine, setOrigine] = React.useState('50% 50%');

  // Le type d'evenement RN ne porte pas `clientX`/`clientY`/`getBoundingClientRect` : ce sont
  // ceux du `PointerEvent` du DOM, que react-native-web transmet tel quel sur le web.
  const onDeplacement = React.useCallback((event: any) => {
    const rect = event.currentTarget?.getBoundingClientRect?.();
    if (!rect) return;

    const { x, y } = positionEnPourcentage({ clientX: event.clientX, clientY: event.clientY, rect });
    setOrigine(`${x}% ${y}%`);
  }, []);

  return {
    survole,
    origine,
    echelle: survole ? 2 : 1,
    onEntree: () => setSurvole(true),
    onSortie: () => setSurvole(false),
    onDeplacement,
  };
};
