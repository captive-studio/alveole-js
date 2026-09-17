import React from 'react';

/** Délai de stabilisation de la saisie de recherche, commun aux deux plateformes. */
export const SEARCH_DEBOUNCE_MS = 300;

/**
 * Diffère l'appel tant que la saisie change. Le rappel n'est jamais émis au
 * montage, contrairement à un `useEffect` sur la valeur : seule une invocation
 * explicite arme le minuteur.
 */
export const useDebouncedCallback = <TArgs extends unknown[]>(
  callback: (...args: TArgs) => void,
  delay = SEARCH_DEBOUNCE_MS,
) => {
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // Le rappel est lu au déclenchement, pas capturé à l'armement : la fonction
  // rendue reste stable même quand l'appelant en recrée une à chaque rendu.
  const latest = React.useRef(callback);
  React.useEffect(() => {
    latest.current = callback;
  });

  React.useEffect(() => () => void (timer.current && clearTimeout(timer.current)), []);

  return React.useCallback(
    (...args: TArgs) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => latest.current(...args), delay);
    },
    [delay],
  );
};
