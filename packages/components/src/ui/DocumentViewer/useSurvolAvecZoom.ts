import React from 'react';
import type { PointerEvent } from 'react-native';
import { positionEnPourcentage } from './documentViewerPdfCalculs';
import { lirePointeurWeb } from './pointeurWeb';

/**
 * Le zoom qui suit le pointeur au survol : la page grossit autour du point survole, comme une
 * loupe. L'origine de l'agrandissement est la position du pointeur en pourcentage du cadre,
 * recalculee a chaque deplacement.
 */
export const useSurvolAvecZoom = () => {
  const [survole, setSurvole] = React.useState(false);
  const [origine, setOrigine] = React.useState('50% 50%');

  const onDeplacement = React.useCallback((event: PointerEvent) => {
    const pointeur = lirePointeurWeb(event);
    if (!pointeur) return;

    const { x, y } = positionEnPourcentage(pointeur);
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
