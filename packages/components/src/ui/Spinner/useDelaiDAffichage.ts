import React from 'react';
import { DELAY_MS, SpinnerDelay } from './Spinner.shared';

const enMillisecondes = (delay: SpinnerDelay | undefined): number | null => {
  if (delay === undefined || delay === false) return null;
  if (delay === true) return 1000;
  if (typeof delay === 'string') return DELAY_MS[delay] ?? 0;

  return delay;
};

/**
 * Le retard avant qu'un spinner ne se montre : `false` tant qu'il n'est pas ecoule.
 *
 * Il evite un clignotement quand l'operation se termine vite - si le serveur repond en moins
 * d'une seconde, personne ne voit rien. Il vivait a l'identique dans `Spinner.tsx` et
 * `Spinner.web.tsx`, et le bouton en a besoin a son tour : c'est au moment ou le spinner
 * parait, et pas avant, qu'il doit masquer son libelle. Sans cette date partagee, le bouton
 * se viderait une seconde avant que quoi que ce soit ne le remplace.
 */
export const useDelaiDAffichage = (delay: SpinnerDelay | undefined): boolean => {
  const delayMs = React.useMemo(() => enMillisecondes(delay), [delay]);
  const [ecoule, setEcoule] = React.useState(delayMs === null);
  const [delaiPrecedent, setDelaiPrecedent] = React.useState(delayMs);

  // Le retard repart de zero quand il change : sans quoi un bouton qui a deja charge une fois
  // montrerait son spinner sans attendre a la fois suivante. L'ajustement se fait pendant le
  // rendu, et non dans un effet, ou un `setState` synchrone declencherait un rendu en cascade.
  if (delaiPrecedent !== delayMs) {
    setDelaiPrecedent(delayMs);
    setEcoule(delayMs === null);
  }

  React.useEffect(() => {
    if (delayMs === null) return;

    const timer = setTimeout(() => setEcoule(true), delayMs);

    return () => clearTimeout(timer);
  }, [delayMs]);

  return ecoule;
};
